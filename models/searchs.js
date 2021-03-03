const axios = require('axios')
require('dotenv').config()


class Searchs {
	constructor() {}

    get paramasMapbox(){
        return {
            'access_token':process.env.MAPBOX_KEY,
                    'limit':5,
                    'language':'es'
        }
    }

	async city(place = '') {
		// console.log(place);
		try {

            const instance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params:this.paramasMapbox
            })


			const response = await instance.get()
			const cities = response.data.features.map(city=>({
				id:city.id,
				name: city.place_name,
				lng: city.center[0],
				lat: city.center[1]
			}))

			return cities
		} catch (err) {
			console.log(err)
			return []
		}
	}
}

module.exports = Searchs
