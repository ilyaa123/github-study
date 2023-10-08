export default defineNuxtRouteMiddleware(async (to) => {
	const code = to.query?.code;

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
				const cookie = useCookie('token');
				cookie.value = result.access_token;
				return navigateTo('/');
			} else {
				return navigateTo('/login');
			}
		} catch (error) {
			return navigateTo('/login');
		}
	}
});
