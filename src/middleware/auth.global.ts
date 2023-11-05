/* eslint no-useless-return: 0 */

export default defineNuxtRouteMiddleware((to, _) => {
	const token = useCookie('gitToken');

	const { getUser, user, isAuth } = useUser();

	const authPage =
		typeof to.meta.authGuard !== 'undefined' ? to.meta.authGuard : true;

	if (!authPage && !!isAuth.value) {
		return navigateTo('/');
	} else if (authPage && !!token.value && !user.value) {
		getUser({
			onError() {
				return navigateTo('/blank');
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
		getUser({
			onError() {
				return navigateTo('/blank');
			},
			onResult() {
				return navigateTo('/');
			}
		});
	}

	return;
});
