/* eslint no-useless-return: 0 */

export default defineNuxtRouteMiddleware(async (to, _) => {
	const token = useCookie('gitToken');

	const { getUser, user, isAuth } = useUser();

	const authPage =
		typeof to.meta.authGuard !== 'undefined' ? to.meta.authGuard : true;

	if (!authPage && !!isAuth.value) {
		return navigateTo('/');
	} else if (authPage && !!token.value && !user.value) {
		await getUser({
			onError() {
				token.value = null;
			},
			onResult() {
				if (!authPage) {
					return navigateTo('/');
				}
			}
		});

		return;
	} else if (!token.value && !!authPage) {
		return navigateTo('/blank');
	}

	if (!authPage && !!token.value && !user.value) {
		await getUser({
			onError() {
				token.value = null;
				return navigateTo('/blank');
			},
			onResult() {
				return navigateTo('/');
			}
		});
	}

	return;
});
