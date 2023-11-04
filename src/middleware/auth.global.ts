/* eslint no-useless-return: 0 */

export default defineNuxtRouteMiddleware((to, _) => {
	const token = useCookie('gitToken');

	const { getUser } = useUser();

	const authPage =
		typeof to.meta.authGuard !== 'undefined' ? to.meta.authGuard : true;

	if (!authPage && !!token.value) {
		return navigateTo('/');
	} else if (authPage && !token.value && !!token.value) {
		getUser();
		return navigateTo('/');
	} else if (!token.value && !!authPage) {
		return navigateTo('/blank');
	}

	return;
});
