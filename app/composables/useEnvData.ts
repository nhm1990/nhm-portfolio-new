import type {
  AirQualityReading,
  AqiDistributionEntry,
  AqiStatus,
  ChartDataPoint,
  City,
  CityComparison,
} from '~/types/envdata'

const CITIES: City[] = [
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

interface CityProfile {
  basePM25: number
  basePM10: number
  baseTemp: number
  baseHumidity: number
}

const CITY_PROFILES: Record<string, CityProfile> = {
  'Berlin': { basePM25: 12, basePM10: 22, baseTemp: 10, baseHumidity: 68 },
  'Paris': { basePM25: 15, basePM10: 25, baseTemp: 12, baseHumidity: 72 },
  'London': { basePM25: 11, basePM10: 20, baseTemp: 11, baseHumidity: 75 },
  'Madrid': { basePM25: 10, basePM10: 22, baseTemp: 18, baseHumidity: 45 },
  'Rome': { basePM25: 14, basePM10: 28, baseTemp: 16, baseHumidity: 60 },
  'Stockholm': { basePM25: 6, basePM10: 12, baseTemp: 5, baseHumidity: 72 },
  'Warsaw': { basePM25: 22, basePM10: 38, baseTemp: 8, baseHumidity: 70 },
  'Moscow': { basePM25: 15, basePM10: 30, baseTemp: 5, baseHumidity: 70 },
  'Istanbul': { basePM25: 20, basePM10: 40, baseTemp: 14, baseHumidity: 65 },
  'New York': { basePM25: 10, basePM10: 20, baseTemp: 13, baseHumidity: 63 },
  'Los Angeles': { basePM25: 15, basePM10: 35, baseTemp: 20, baseHumidity: 50 },
  'Mexico City': { basePM25: 25, basePM10: 50, baseTemp: 17, baseHumidity: 55 },
  'São Paulo': { basePM25: 18, basePM10: 35, baseTemp: 22, baseHumidity: 70 },
  'Buenos Aires': { basePM25: 13, basePM10: 28, baseTemp: 18, baseHumidity: 65 },
  'Tokyo': { basePM25: 13, basePM10: 25, baseTemp: 16, baseHumidity: 60 },
  'Beijing': { basePM25: 65, basePM10: 120, baseTemp: 13, baseHumidity: 45 },
  'Mumbai': { basePM25: 80, basePM10: 150, baseTemp: 28, baseHumidity: 75 },
  'Bangkok': { basePM25: 35, basePM10: 60, baseTemp: 30, baseHumidity: 72 },
  'Seoul': { basePM25: 25, basePM10: 45, baseTemp: 12, baseHumidity: 58 },
  'Dubai': { basePM25: 45, basePM10: 100, baseTemp: 35, baseHumidity: 35 },
  'Cairo': { basePM25: 55, basePM10: 130, baseTemp: 25, baseHumidity: 40 },
  'Lagos': { basePM25: 40, basePM10: 85, baseTemp: 28, baseHumidity: 78 },
  'Nairobi': { basePM25: 18, basePM10: 40, baseTemp: 20, baseHumidity: 65 },
  'Sydney': { basePM25: 8, basePM10: 15, baseTemp: 20, baseHumidity: 62 },
  'Auckland': { basePM25: 5, basePM10: 10, baseTemp: 16, baseHumidity: 75 },
}

/**
 * Calculate AQI from PM2.5 concentration using EPA breakpoints
 */
function calculateAqi(pm25: number): number {
  if (pm25 <= 12) return Math.round(pm25 * 4.17)
  if (pm25 <= 35.4) return Math.round(50 + (pm25 - 12) * 2.14)
  if (pm25 <= 55.4) return Math.round(100 + (pm25 - 35.4) * 2.5)
  if (pm25 <= 150.4) return Math.round(150 + (pm25 - 55.4) * 0.53)
  if (pm25 <= 250.4) return Math.round(200 + (pm25 - 150.4) * 1.0)
  return Math.round(300 + (pm25 - 250.4) * 0.5)
}

/**
 * Get AQI status text from numeric AQI value
 */
function getAqiStatus(aqi: number): AqiStatus {
  if (aqi <= 50) return 'Good'
  if (aqi <= 100) return 'Moderate'
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups'
  if (aqi <= 200) return 'Unhealthy'
  if (aqi <= 300) return 'Very Unhealthy'
  return 'Hazardous'
}

function randomVariation(base: number, factor = 0.3): number {
  return Math.max(0, base + (Math.random() * 2 - 1) * base * factor)
}

function round(value: number, decimals = 1): number {
  const multiplier = Math.pow(10, decimals)
  return Math.round(value * multiplier) / multiplier
}

/**
 * Composable for environmental data generation and utilities.
 * Generates realistic mock data for 25 global cities based on known pollution profiles.
 */
export function useEnvData() {
  function generateCityData(): AirQualityReading[] {
    return CITIES.map((city, index) => {
      const profile = CITY_PROFILES[city.name] ?? { basePM25: 15, basePM10: 25, baseTemp: 15, baseHumidity: 60 }
      const pm25 = round(randomVariation(profile.basePM25))
      const pm10 = round(randomVariation(profile.basePM10))
      const no2 = round(randomVariation(profile.basePM25 * 2.5))
      const so2 = round(randomVariation(profile.basePM25 * 0.8))
      const o3 = round(randomVariation(Math.max(20, 80 - profile.basePM25 * 0.5)))
      const co = round(randomVariation(profile.basePM25 * 20 + 200))
      const aqi = calculateAqi(pm25)

      return {
        id: index + 1,
        city: city.name,
        country: city.country,
        continent: city.continent,
        latitude: city.latitude,
        longitude: city.longitude,
        timestamp: new Date().toISOString(),
        pm25,
        pm10,
        no2,
        so2,
        o3,
        co,
        aqi,
        aqiStatus: getAqiStatus(aqi),
        temperature: round(randomVariation(profile.baseTemp, 0.15)),
        humidity: round(Math.min(95, Math.max(20, randomVariation(profile.baseHumidity, 0.1))), 0),
        windSpeed: round(Math.random() * 28 + 2),
        isEdited: false,
      }
    })
  }

  function generateHourlyData(hours = 24): ChartDataPoint[] {
    const data: ChartDataPoint[] = []
    const now = new Date()
    const profile = CITY_PROFILES['Berlin'] ?? { basePM25: 12, basePM10: 22, baseTemp: 10, baseHumidity: 68 }

    for (let i = hours - 1; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000)
      const hourFactor = 1 + Math.sin((time.getHours() / 24) * Math.PI * 2 - Math.PI / 2) * 0.3
      const pm25 = round(randomVariation(profile.basePM25 * hourFactor, 0.15))

      data.push({
        time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
        pm25,
        pm10: round(randomVariation(profile.basePM10 * hourFactor, 0.15)),
        no2: round(randomVariation(30 * hourFactor, 0.12)),
        o3: round(randomVariation(50 * (2 - hourFactor), 0.12)),
        aqi: calculateAqi(pm25),
      })
    }

    return data
  }

  function generateCityComparison(): CityComparison[] {
    const selectedCities = ['Stockholm', 'Auckland', 'Sydney', 'London', 'Berlin', 'Seoul', 'Istanbul', 'Cairo', 'Beijing', 'Mumbai']
    return selectedCities
      .map((cityName) => {
        const profile = CITY_PROFILES[cityName] ?? { basePM25: 15, basePM10: 25, baseTemp: 15, baseHumidity: 60 }
        const pm25 = round(randomVariation(profile.basePM25))
        return { city: cityName, aqi: calculateAqi(pm25), pm25 }
      })
      .sort((a, b) => a.aqi - b.aqi)
  }

  function getAqiDistribution(data: AirQualityReading[]): AqiDistributionEntry[] {
    const distribution = new Map<string, number>()
    data.forEach((reading) => {
      const count = distribution.get(reading.aqiStatus) ?? 0
      distribution.set(reading.aqiStatus, count + 1)
    })
    return Array.from(distribution.entries()).map(([status, count]) => ({ status, count }))
  }

  function recalculateAqi(pm25: number): { aqi: number; aqiStatus: AqiStatus } {
    const aqi = calculateAqi(pm25)
    return { aqi, aqiStatus: getAqiStatus(aqi) }
  }

  return {
    cities: CITIES,
    generateCityData,
    generateHourlyData,
    generateCityComparison,
    getAqiDistribution,
    recalculateAqi,
    calculateAqi,
    getAqiStatus,
  }
}
