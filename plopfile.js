module.exports = function (plop) {
	plop.setGenerator('init mock packages', {
		description: 'generates an packages for mocking',
		prompts: [],
		actions: [
			{
				type: 'add',
				skipIfExists: true,
				path: '{{rootPath}}/mocks/browser.ts',
				templateFile: 'src/templates/init/browser.ts',
			},
			{
				type: 'add',
				skipIfExists: true,
				path: '{{rootPath}}/mocks/handlers/handlers.ts',
				templateFile: 'src/templates/init/handlers/handlers.ts',
			},
		],
	})
	plop.setGenerator('api + mock', {
		description: 'generates an api and mock',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'entity name (for example "User"):',
				validate(value) {
					return /.+/.test(value) ? true : 'name is required'
				},
			},
			{
				type: 'input',
				name: 'url',
				message: 'controller url please (for example "/users"):',
				validate(value) {
					return /.+/.test(value) ? true : 'url is required'
				},
			},
		],
		actions: [
			{
				type: 'add',
				skipIfExists: true,
				path: '{{rootPath}}/store/api/{{camelCase name}}/{{camelCase name}}Api.ts',
				templateFile: 'src/templates/api/api.ts',
			},
			{
				type: 'add',
				skipIfExists: true,
				path: '{{rootPath}}/store/api/{{camelCase name}}/index.ts',
				templateFile: 'src/templates/api/index.ts',
			},
			{
				type: 'add',
				skipIfExists: true,
				path: '{{rootPath}}/models/{{properCase name}}.ts',
				templateFile: 'src/templates/models/model.ts',
			},
			{
				type: 'modify',
				path: '{{rootPath}}/models/index.ts',
				pattern: /(\/\/ MODEL EXPORTS)/g,
				template: "$1\nexport type { {{properCase name}} } from './{{properCase name}}'",
			},
			{
				type: 'modify',
				path: '{{rootPath}}/store/store.ts',
				pattern: /(\/\/ IMPORT API)/g,
				template: "$1\nimport { {{camelCase name}}Api } from '@store/api/{{camelCase name}}'",
			},
			{
				type: 'modify',
				path: '{{rootPath}}/store/store.ts',
				pattern: /(\/\/ INSERT API)/g,
				template: '$1\n\t{{camelCase name}}Api,',
			},
			{
				type: 'add',
				skipIfExists: true,
				path: '{{rootPath}}/mocks/handlers/mock{{properCase name}}/index.ts',
				templateFile: 'src/templates/mocks/index.ts',
			},
			{
				type: 'add',
				skipIfExists: true,
				path: '{{rootPath}}/mocks/handlers/mock{{properCase name}}/mock.ts',
				templateFile: 'src/templates/mocks/mock.ts',
			},
			{
				type: 'add',
				skipIfExists: true,
				path: '{{rootPath}}/mocks/handlers/mock{{properCase name}}/mockData.ts',
				templateFile: 'src/templates/mocks/mockData.ts',
			},
			{
				type: 'modify',
				path: '{{rootPath}}/mocks/handlers/handlers.ts',
				pattern: /(\/\/ MOCK IMPORTS)/g,
				template: "$1\nimport { mock{{properCase name}} } from './mock{{properCase name}}'",
			},
			{
				type: 'modify',
				path: '{{rootPath}}/mocks/handlers/handlers.ts',
				pattern: /(\/\/ MOCK EXPORTS)/g,
				template: '$1\n\t...mock{{properCase name}},',
			},
		],
	})
}
