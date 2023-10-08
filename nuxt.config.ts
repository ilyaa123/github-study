// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	srcDir: 'src',
	runtimeConfig: {
		public: {
			baseGithubApi: process.env.NUXT_BASE_GITHUB_API,
			githubClientID: process.env.NUXT_GITHUB_CLIENT_ID
		}
	},
	css: ['~/assets/scss/index.scss'],
	typescript: {
		strict: true,
		shim: false
	},
	modules: [
		'@nuxtjs/eslint-module',
		'@element-plus/nuxt',
		'@nuxtjs/apollo',
		'@unocss/nuxt'
	],
	elementPlus: {
		importStyle: 'scss',
		icon: 'ElIcon',
		themes: ['dark']
	},
	unocss: {
		uno: true,
		attributify: true,
		icons: {
			scale: 1.2
		}
	},
	apollo: {
		clients: {
			default: {
				httpEndpoint:
					process.env.NUXT_BASE_GITHUB_API + '/graphql' ||
					'https://api.github.com/graphql'
			}
		}
	}
});
