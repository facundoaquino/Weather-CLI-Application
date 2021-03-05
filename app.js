const { readInput, inquirerMenu, pause, listPlaces } = require('./helpers/inquirer')
const Searchs = require('./models/searchs')

const main = async () => {
	let option

	const searchs = new Searchs()

	do {
		option = await inquirerMenu()

		switch (option) {
			case '1':
				const place = await readInput('City: ')

				const cities = await searchs.city(place)

				const idSelected = await listPlaces(cities)
				if (idSelected == '0') continue

				
				const { lng, lat, name } = cities.find((citi) => citi.id == idSelected)
				searchs.pushHistory(name) 

				const weather = await searchs.weatherPlace(lat, lng)

				console.log(`Lugar: ${name.blue}`)

				console.log(`Minima: ${weather.min.toString().blue}`)

				console.log(`Maxima: ${weather.max.toString().blue}`)

				console.log(`Como esta el clima: ${weather.desc.blue}`)

				break

			case '2':

				searchs.history.forEach((place,inx) =>{


					const index = `${inx+1}. `.blue
					console.log(`${index}  ${place}`);
				})


				break
		}

		// console.log(option)
		if (option != 0) {
			await pause()
		}
	} while (option != 0)
}

main()
