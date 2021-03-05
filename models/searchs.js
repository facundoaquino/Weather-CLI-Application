const axios = require('axios')
require('dotenv').config()
const fs = require('fs')

class Searchs {
	constructor() {
		this.readDb()
	}

	history = []
	pathDb = './db/history.json'
	get paramasMapbox() {
		return {
			access_token: process.env.MAPBOX_KEY,
			limit: 5,
			language: 'es',
		}
	}

	async city(place = '') {
		// console.log(place);
		try {
			const instance = axios.create({
				baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
				params: this.paramasMapbox,
			})

			const response = await instance.get()
			const cities = response.data.features.map((city) => ({
				id: city.id,
				name: city.place_name,
				lng: city.center[0],
				lat: city.center[1],
			}))

			return cities
		} catch (err) {
			console.log(err)
			return []
		}
	}

	get paramsOpenWeather() {
		return {
			appid: process.env.OPENWEATHER_KEY,
			units: 'metric',
			lang: 'es',
		}
	}

	async weatherPlace(lat, lon) {
		const instance = axios.create({
			baseURL: `https://api.openweathermap.org/data/2.5/weather`,
			params: { ...this.paramsOpenWeather, lat, lon },
		})
		const response = await instance.get()

		const { weather, main } = await response.data
		// console.log(weather[0].description, main)

		return {
			desc: weather[0].description,
			min: main.temp_min,
			max: main.temp_max,
			temp: main.temp,
		}
	}

	pushHistory(place = '') {
		if (!this.history.includes(place)) {
			this.history.unshift(place)
			
		}

		this.saveDb()
	}

	saveDb() {
		fs.writeFileSync(this.pathDb, JSON.stringify(this.history, null, 5))
	}

	readDb() {
		const readHistory = JSON.parse(fs.readFileSync(this.pathDb, { encoding: 'utf-8' }))

		this.history = readHistory
	}
}

module.exports = Searchs
