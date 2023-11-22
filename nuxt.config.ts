// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	srcDir: 'src',
	router: {
		options: {
			hashMode: false
		}
	},
	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			title: 'GitHub Study'
		},
		pageTransition: {
			name: 'page',
			mode: 'out-in'
		},
		layoutTransition: {
			name: 'layout',
			mode: 'out-in'
		}
	},
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
		'@unocss/nuxt',
		'nuxt-electron',
		'nuxt-icon'
	],
	electron: {
		build: [
			{
				entry: 'electron/main.ts'
			},
			{
				entry: 'electron/preload.ts',
				onstart(options) {
					options.reload();
				}
			}
		],
		renderer: {}
	},
	elementPlus: {
		importStyle: 'scss',
		icon: 'ElIcon'
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "@/assets/scss/element/index.scss" as element;`
				}
			}
		}
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
					'https://api.github.com/graphql',
				tokenName: 'gitToken'
			}
		},
		autoImports: true
	},
	build: {
		transpile: ['tslib']
	}
});
