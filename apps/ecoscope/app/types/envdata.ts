export interface City {
  name: string
  country: string
  latitude: number
  longitude: number
  continent: string
}

export interface AirQualityReading {
  id: number
  city: string
  country: string
  continent: string
  latitude: number
  longitude: number
  timestamp: string
  pm25: number
  pm10: number
  no2: number
  so2: number
  o3: number
  co: number
  aqi: number
  aqiStatus: AqiStatus
  temperature: number
  humidity: number
  windSpeed: number
  isEdited: boolean
}

export type AqiStatus =
  | 'Good'
  | 'Moderate'
  | 'Unhealthy for Sensitive Groups'
  | 'Unhealthy'
  | 'Very Unhealthy'
  | 'Hazardous'

export interface ChartDataPoint {
  time: string
  pm25: number
  pm10: number
  no2: number
  o3: number
  aqi: number
}

export interface CityComparison {
  city: string
  aqi: number
  pm25: number
}

export interface AqiDistributionEntry {
  status: string
  count: number
}

// --- Open-Meteo API Response Types ---

export interface OpenMeteoCurrentAirQuality {
  time: string
  pm2_5: number | null
  pm10: number | null
  nitrogen_dioxide: number | null
  sulphur_dioxide: number | null
  ozone: number | null
  carbon_monoxide: number | null
  european_aqi: number | null
}

export interface OpenMeteoHourlyAirQuality {
  time: string[]
  pm2_5: (number | null)[]
  pm10: (number | null)[]
  nitrogen_dioxide: (number | null)[]
  ozone: (number | null)[]
  european_aqi: (number | null)[]
}

export interface OpenMeteoAirQualityResponse {
  latitude: number
  longitude: number
  current: OpenMeteoCurrentAirQuality
  hourly: OpenMeteoHourlyAirQuality
}

export interface OpenMeteoWeatherResponse {
  current: {
    time: string
    temperature_2m: number | null
    relative_humidity_2m: number | null
    wind_speed_10m: number | null
  }
}

// --- Server API Response ---

export interface AirQualityApiResponse {
  readings: AirQualityReading[]
  hourlyData: ChartDataPoint[]
  fetchedAt: string
}
