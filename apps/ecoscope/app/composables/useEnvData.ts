import type {
  AirQualityApiResponse,
  AirQualityReading,
  AqiDistributionEntry,
  AqiStatus,
  ChartDataPoint,
  City,
  CityComparison,
} from '~/types/envdata'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const CITIES: City[] = [
  { name: 'Berlin', country: 'Germany', latitude: 52.52, longitude: 13.41, continent: 'Europe' },
  { name: 'Paris', country: 'France', latitude: 48.86, longitude: 2.35, continent: 'Europe' },
  { name: 'London', country: 'United Kingdom', latitude: 51.51, longitude: -0.13, continent: 'Europe' },
  { name: 'Madrid', country: 'Spain', latitude: 40.42, longitude: -3.7, continent: 'Europe' },
  { name: 'Rome', country: 'Italy', latitude: 41.9, longitude: 12.5, continent: 'Europe' },
  { name: 'Stockholm', country: 'Sweden', latitude: 59.33, longitude: 18.07, continent: 'Europe' },
  { name: 'Warsaw', country: 'Poland', latitude: 52.23, longitude: 21.01, continent: 'Europe' },
  { name: 'Moscow', country: 'Russia', latitude: 55.76, longitude: 37.62, continent: 'Europe' },
  { name: 'Istanbul', country: 'Turkey', latitude: 41.01, longitude: 28.98, continent: 'Europe' },
  { name: 'New York', country: 'United States', latitude: 40.71, longitude: -74.01, continent: 'North America' },
  { name: 'Los Angeles', country: 'United States', latitude: 34.05, longitude: -118.24, continent: 'North America' },
  { name: 'Mexico City', country: 'Mexico', latitude: 19.43, longitude: -99.13, continent: 'North America' },
  { name: 'São Paulo', country: 'Brazil', latitude: -23.55, longitude: -46.63, continent: 'South America' },
  { name: 'Buenos Aires', country: 'Argentina', latitude: -34.6, longitude: -58.38, continent: 'South America' },
  { name: 'Tokyo', country: 'Japan', latitude: 35.68, longitude: 139.69, continent: 'Asia' },
  { name: 'Beijing', country: 'China', latitude: 39.9, longitude: 116.4, continent: 'Asia' },
  { name: 'Mumbai', country: 'India', latitude: 19.08, longitude: 72.88, continent: 'Asia' },
  { name: 'Bangkok', country: 'Thailand', latitude: 13.76, longitude: 100.5, continent: 'Asia' },
  { name: 'Seoul', country: 'South Korea', latitude: 37.57, longitude: 126.98, continent: 'Asia' },
  { name: 'Dubai', country: 'UAE', latitude: 25.2, longitude: 55.27, continent: 'Asia' },
  { name: 'Cairo', country: 'Egypt', latitude: 30.04, longitude: 31.24, continent: 'Africa' },
  { name: 'Lagos', country: 'Nigeria', latitude: 6.52, longitude: 3.38, continent: 'Africa' },
  { name: 'Nairobi', country: 'Kenya', latitude: -1.29, longitude: 36.82, continent: 'Africa' },
  { name: 'Sydney', country: 'Australia', latitude: -33.87, longitude: 151.21, continent: 'Oceania' },
  { name: 'Auckland', country: 'New Zealand', latitude: -36.85, longitude: 174.76, continent: 'Oceania' },
]

// Cities shown in the comparison bar chart
const COMPARISON_CITIES = [
  'Stockholm', 'Auckland', 'Sydney', 'London', 'Berlin',
  'Seoul', 'Istanbul', 'Cairo', 'Beijing', 'Mumbai',
]

// ---------------------------------------------------------------------------
// Pure utility functions
// ---------------------------------------------------------------------------

/**
 * Calculate US EPA AQI from PM2.5 concentration (µg/m³)
 */
export function calculateAqi(pm25: number): number {
  if (pm25 <= 12) return Math.round(pm25 * 4.17)
  if (pm25 <= 35.4) return Math.round(50 + (pm25 - 12) * 2.14)
  if (pm25 <= 55.4) return Math.round(100 + (pm25 - 35.4) * 2.5)
  if (pm25 <= 150.4) return Math.round(150 + (pm25 - 55.4) * 0.53)
  if (pm25 <= 250.4) return Math.round(200 + (pm25 - 150.4) * 1.0)
  return Math.round(300 + (pm25 - 250.4) * 0.5)
}

/**
 * Get AQI category label from numeric AQI value
 */
export function getAqiStatus(aqi: number): AqiStatus {
  if (aqi <= 50) return 'Good'
  if (aqi <= 100) return 'Moderate'
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups'
  if (aqi <= 200) return 'Unhealthy'
  if (aqi <= 300) return 'Very Unhealthy'
  return 'Hazardous'
}

// ---------------------------------------------------------------------------
// Composable
// ---------------------------------------------------------------------------

/**
 * Provides live environmental data fetched from the Open-Meteo API via the
 * /api/air-quality server route. Exposes reactive loading state, the full
 * city dataset and hourly chart data, plus pure utility functions.
 */
export function useEnvData() {
  const {
    data,
    pending,
    error,
    refresh,
  } = useLazyFetch<AirQualityApiResponse>('/api/air-quality', {
    key: 'air-quality-data',
  })

  /** All city readings — empty array while loading */
  const cityData = computed<AirQualityReading[]>(() => data.value?.readings ?? [])

  /** Hourly time-series data (Berlin, last 24 h) — empty while loading */
  const hourlyData = computed<ChartDataPoint[]>(() => data.value?.hourlyData ?? [])

  /** True while the initial fetch is in progress */
  const isLoading = computed(() => pending.value)

  /** ISO timestamp of when data was last fetched from Open-Meteo */
  const fetchedAt = computed(() => data.value?.fetchedAt ?? null)

  // --- Derived helpers ---

  function getAqiDistribution(readings: AirQualityReading[]): AqiDistributionEntry[] {
    const distribution = new Map<string, number>()
    readings.forEach((r) => {
      distribution.set(r.aqiStatus, (distribution.get(r.aqiStatus) ?? 0) + 1)
    })
    return Array.from(distribution.entries())
      .map(([status, count]) => ({ status, count }))
      .sort((a, b) => b.count - a.count)
  }

  /** Returns a sorted subset for the comparison bar chart, derived from live data */
  function getCityComparison(): CityComparison[] {
    return cityData.value
      .filter((r) => COMPARISON_CITIES.includes(r.city))
      .map((r) => ({ city: r.city, aqi: r.aqi, pm25: r.pm25 }))
      .sort((a, b) => a.aqi - b.aqi)
  }

  /** Recalculates AQI and status after an inline cell edit */
  function recalculateAqi(pm25: number): { aqi: number; aqiStatus: AqiStatus } {
    const aqi = calculateAqi(pm25)
    return { aqi, aqiStatus: getAqiStatus(aqi) }
  }

  return {
    cityData,
    hourlyData,
    isLoading,
    error,
    fetchedAt,
    refresh,
    cities: CITIES,
    getAqiDistribution,
    getCityComparison,
    recalculateAqi,
    calculateAqi,
    getAqiStatus,
  }
}
