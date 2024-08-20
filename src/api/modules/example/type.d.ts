interface IExampleWeatherResponse {
	cloud: string
	dew: string
	feelsLike: string
	humidity: string
	icon: string
	obsTime: string
	precip: string
	pressure: string
	temp: string
	text: string
	vis: string
	wind360: string
	windDir: string
	windScale: string
	windSpeed: string
}

interface IExampleWeatherNowParams {
	lang?: string
	location: string
}
