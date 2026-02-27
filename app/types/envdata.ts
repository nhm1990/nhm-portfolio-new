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
