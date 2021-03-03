const { readInput, inquirerMenu, pause } = require('./helpers/inquirer')
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

				console.log(cities)

				break
		}

		console.log(option)

		await pause()
	} while (option != 0)
}

main()
