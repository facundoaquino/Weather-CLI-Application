const inquirer = require('inquirer')
require('colors')

const MENU_OPTIONS = [
	{
		type: 'list',
		name: 'option',
		message: 'Select an option',
		choices: [
			{
				value: '1',
				name: `${'1'.blue} Search City`,
			},
			{
				value: '2',
				name: `${'2'.blue} History`,
			},
			{
				value: '0',
				name: `${'0'.blue} Out`,
			},
			 
		],
	},
]

const inquirerMenu = async () => {
	console.clear()
	console.log('======================='.gray)
	console.log('Select an option'.white.bold)
	console.log('======================='.gray)

	const { option } = await inquirer.prompt(MENU_OPTIONS)

	return option
}

const pause = async () => {
	const question = [{ type: 'input', name: 'enter', message: `Press ${'ENTER'.blue.bold} to continue` }]

	console.log('\n')
	await inquirer.prompt(question)
}

const readInput = async (message) => {
	const question = [
		{
			type: 'input',
			name: 'desc',
			message,
			validate(value) {
				if (value.length == 0) {
					return 'Please insert a value'
				}
				return true
			},
		},
	]

	const { desc } = await inquirer.prompt(question)

	return desc
}

const taskToDelete = async (tasks = []) => {
	const choices = tasks.map((task, inxd) => {
		const inx = `${inxd + 1}`.blue
		return {
			value: task.id,
			name: `${inx} ${task.description}`,
		}
	})

	choices.unshift({
		value: '0',
		name: '0.'.blue + ' Cancel',
	})

	const question = [
		{
			type: 'list',
			name: 'id',
			message: 'Delete',
			choices,
		},
	]

	const { id } = await inquirer.prompt(question)

	return id
}

const confirm = async (message) => {
	const question = [
		{
			type: 'confirm',
			name: 'ok',
			message,
		},
	]

	const { ok } = await inquirer.prompt(question)
	return ok
}

const showTasksCheckList = async (tasks = []) => {
	const choices = tasks.map((task, inxd) => {
		const inx = `${inxd + 1}`.blue
		return {
			value: task.id,
			name: `${inx} ${task.description}`,
			checked: !!task.completed,
		}
	})

	const question = [
		{
			type: 'checkbox',
			name: 'ids',
			message: 'Selecteds',
			choices,
		},
	]

	const { ids } = await inquirer.prompt(question)

	return ids
}

module.exports = { inquirerMenu, pause, readInput, taskToDelete, confirm, showTasksCheckList }
