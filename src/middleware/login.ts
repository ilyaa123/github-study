export default defineNuxtRouteMiddleware(async (to) => {
	const code = to.query?.code;
	const { getUser } = useUser();

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
				const { onLogin } = useApollo();
				onLogin(result.access_token).then(async () => {
					await getUser({
						onResult() {
							return navigateTo('/');
						},
						onError() {
							return navigateTo('/login');
						}
					});
					return navigateTo('/');
				});
			} else {
				return navigateTo('/login');
			}
		} catch (error) {
			return navigateTo('/login');
		}
	}
});
