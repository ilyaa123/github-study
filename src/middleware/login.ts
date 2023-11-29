export default defineNuxtRouteMiddleware(async (to) => {
	const code = to.query?.code;
	const { getUser } = useUser();
	const { onLogin } = useApollo();
	const nuxtApp = useNuxtApp();
	if (code) {
		try {
			const result = await $fetch<{ access_token: string }>(
				'https://github.com/login/oauth/access_token',
				{
					method: 'POST',
					body: {
						client_id: process.env.NUXT_GITHUB_CLIENT_ID,
						code,
						client_secret: process.env.NUXT_GITHUB_CLIENT_SECRET
					}
				}
			);
			if (result?.access_token) {
				try {
					onLogin(result.access_token).then(async () => {
						await getUser({
							token: result.access_token
							// onResult: () => {
							// 	return nuxtApp.runWithContext(() =>
							// 		navigateTo('/')
							// 	);
							// },
							// onError: () => {
							// 	return nuxtApp.runWithContext(() =>
							// 		navigateTo('/blank')
							// 	);
							// }
						});
					});

					console.log('TRUEEE');

					return nuxtApp.runWithContext(() => navigateTo('/'));
				} catch (error) {
					return nuxtApp.runWithContext(() => navigateTo('/blank'));
				}
			} else {
				return nuxtApp.runWithContext(() => navigateTo('/login'));
			}
		} catch (error) {
			return nuxtApp.runWithContext(() => navigateTo('/login'));
		}
	}
});
