import { get } from '../../request'

export const fetchWeather = (params: IExampleWeatherNowParams) => get<IExampleWeatherResponse>('/weather/now1', params)
