import type {
  AirQualityApiResponse,
  AirQualityReading,
  AqiStatus,
  ChartDataPoint,
  City,
  OpenMeteoAirQualityResponse,
  OpenMeteoWeatherResponse,
} from '~/types/envdata'

// ---------------------------------------------------------------------------
// City definitions (same set as the client composable)
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// AQI helpers (server-side, no composable available here)
// ---------------------------------------------------------------------------

function calculateAqi(pm25: number): number {
  if (pm25 <= 12) return Math.round(pm25 * 4.17)
  if (pm25 <= 35.4) return Math.round(50 + (pm25 - 12) * 2.14)
  if (pm25 <= 55.4) return Math.round(100 + (pm25 - 35.4) * 2.5)
  if (pm25 <= 150.4) return Math.round(150 + (pm25 - 55.4) * 0.53)
  if (pm25 <= 250.4) return Math.round(200 + (pm25 - 150.4) * 1.0)
  return Math.round(300 + (pm25 - 250.4) * 0.5)
}

function getAqiStatus(aqi: number): AqiStatus {
  if (aqi <= 50) return 'Good'
  if (aqi <= 100) return 'Moderate'
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups'
  if (aqi <= 200) return 'Unhealthy'
  if (aqi <= 300) return 'Very Unhealthy'
  return 'Hazardous'
}

function round(value: number, decimals = 1): number {
  const mult = Math.pow(10, decimals)
  return Math.round(value * mult) / mult
}

// ---------------------------------------------------------------------------
// Fetch helpers
// ---------------------------------------------------------------------------

const AIR_QUALITY_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality'
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast'

async function fetchAirQuality(city: City): Promise<OpenMeteoAirQualityResponse> {
  return $fetch<OpenMeteoAirQualityResponse>(AIR_QUALITY_URL, {
    params: {
      latitude: city.latitude,
      longitude: city.longitude,
      current: 'pm2_5,pm10,nitrogen_dioxide,sulphur_dioxide,ozone,carbon_monoxide,european_aqi',
      hourly: 'pm2_5,pm10,nitrogen_dioxide,ozone,european_aqi',
      timezone: 'auto',
      past_hours: 23,
      forecast_hours: 1,
    },
    timeout: 8000,
  })
}

async function fetchWeather(city: City): Promise<OpenMeteoWeatherResponse> {
  return $fetch<OpenMeteoWeatherResponse>(WEATHER_URL, {
    params: {
      latitude: city.latitude,
      longitude: city.longitude,
      current: 'temperature_2m,relative_humidity_2m,wind_speed_10m',
      timezone: 'auto',
    },
    timeout: 8000,
  })
}

// ---------------------------------------------------------------------------
// Mapping
// ---------------------------------------------------------------------------

function mapToReading(
  city: City,
  index: number,
  aqData: OpenMeteoAirQualityResponse,
  weather: OpenMeteoWeatherResponse,
): AirQualityReading {
  const c = aqData.current
  const w = weather.current

  const pm25 = round(c.pm2_5 ?? 0)
  const pm10 = round(c.pm10 ?? 0)
  const no2 = round(c.nitrogen_dioxide ?? 0)
  const so2 = round(c.sulphur_dioxide ?? 0)
  const o3 = round(c.ozone ?? 0)
  const co = round(c.carbon_monoxide ?? 0)
  const aqi = calculateAqi(pm25)

  return {
    id: index + 1,
    city: city.name,
    country: city.country,
    continent: city.continent,
    latitude: city.latitude,
    longitude: city.longitude,
    timestamp: c.time,
    pm25,
    pm10,
    no2,
    so2,
    o3,
    co,
    aqi,
    aqiStatus: getAqiStatus(aqi),
    temperature: round(w.temperature_2m ?? 0),
    humidity: round(w.relative_humidity_2m ?? 0, 0),
    windSpeed: round(w.wind_speed_10m ?? 0),
    isEdited: false,
  }
}

function mapHourlyData(aqData: OpenMeteoAirQualityResponse): ChartDataPoint[] {
  const { time, pm2_5, pm10, nitrogen_dioxide, ozone } = aqData.hourly

  // Take up to last 24 entries
  const startIdx = Math.max(0, time.length - 24)
  return time.slice(startIdx).map((isoTime, i) => {
    const idx = startIdx + i
    const pm25Val = round(pm2_5[idx] ?? 0)
    return {
      // Format: "HH:MM"
      time: new Date(isoTime).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      pm25: pm25Val,
      pm10: round(pm10[idx] ?? 0),
      no2: round(nitrogen_dioxide[idx] ?? 0),
      o3: round(ozone[idx] ?? 0),
      aqi: calculateAqi(pm25Val),
    }
  })
}

// ---------------------------------------------------------------------------
// Event handler
// ---------------------------------------------------------------------------

export default defineEventHandler(async (): Promise<AirQualityApiResponse> => {
  // Fetch all 25 cities in parallel — both air quality + weather
  const [aqResults, weatherResults] = await Promise.all([
    Promise.allSettled(CITIES.map(fetchAirQuality)),
    Promise.allSettled(CITIES.map(fetchWeather)),
  ])

  const readings: AirQualityReading[] = CITIES.map((city, i) => {
    const aqResult = aqResults[i]
    const wResult = weatherResults[i]

    if (aqResult.status === 'fulfilled' && wResult.status === 'fulfilled') {
      return mapToReading(city, i, aqResult.value, wResult.value)
    }

    // Fallback: use European AQI from air quality if weather failed
    if (aqResult.status === 'fulfilled') {
      const c = aqResult.value.current
      const pm25 = round(c.pm2_5 ?? 0)
      const aqi = calculateAqi(pm25)
      return {
        id: i + 1,
        city: city.name,
        country: city.country,
        continent: city.continent,
        latitude: city.latitude,
        longitude: city.longitude,
        timestamp: c.time,
        pm25,
        pm10: round(c.pm10 ?? 0),
        no2: round(c.nitrogen_dioxide ?? 0),
        so2: round(c.sulphur_dioxide ?? 0),
        o3: round(c.ozone ?? 0),
        co: round(c.carbon_monoxide ?? 0),
        aqi,
        aqiStatus: getAqiStatus(aqi),
        temperature: 0,
        humidity: 0,
        windSpeed: 0,
        isEdited: false,
      }
    }

    // Full fallback — API completely unavailable
    console.warn(`[air-quality] Failed to fetch data for ${city.name}:`, aqResult.reason)
    return {
      id: i + 1,
      city: city.name,
      country: city.country,
      continent: city.continent,
      latitude: city.latitude,
      longitude: city.longitude,
      timestamp: new Date().toISOString(),
      pm25: 0,
      pm10: 0,
      no2: 0,
      so2: 0,
      o3: 0,
      co: 0,
      aqi: 0,
      aqiStatus: 'Good',
      temperature: 0,
      humidity: 0,
      windSpeed: 0,
      isEdited: false,
    }
  })

  // Use Berlin hourly data for charts (first city in list)
  const berlinAq = aqResults[0]
  const hourlyData: ChartDataPoint[] = berlinAq.status === 'fulfilled'
    ? mapHourlyData(berlinAq.value)
    : []

  return {
    readings,
    hourlyData,
    fetchedAt: new Date().toISOString(),
  }
})
