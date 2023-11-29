/* eslint no-useless-return: 0 */

export default defineNuxtRouteMiddleware(async (to, _) => {
	const nuxtApp = useNuxtApp();

	const token = useCookie('gitToken');

	const { getUser, userState, isAuth } = useUser();

	const authPage =
		typeof to.meta.authGuard !== 'undefined' ? to.meta.authGuard : true;

	if (authPage) {
		if (!token.value) {
			return nuxtApp.runWithContext(() => navigateTo('/blank'));
		}
		if (token.value && !userState.value.user) {
			try {
				await getUser();
				return;
			} catch (error) {
				return nuxtApp.runWithContext(() => navigateTo('/blank'));
			}
		} else {
			return;
		}
	} else {
		if (isAuth.value) {
			return navigateTo('/');
		}
		if (token.value && !userState.value.user) {
			try {
				await getUser();
				return nuxtApp.runWithContext(() => navigateTo('/'));
			} catch (error) {
				return nuxtApp.runWithContext(() => navigateTo('/blank'));
			}
		}
	}

	return;
});
