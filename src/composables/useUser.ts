import { User } from '~/types/user';

interface GetUserParams {
	token?: string;
	onResult?: (res: User) => void;
	onError?: () => void;
}

export const useUser = () => {
	const token = useCookie('gitToken');

	const userState = useState<{ user: User | null; isAuthLoading: boolean }>(
		'userState',
		() => ({
			user: null,
			isAuthLoading: false
		})
	);

	const getUser = async (params: GetUserParams | void) => {
		const githubApi = process.server
			? process.env.NUXT_BASE_GITHUB_API
			: useRuntimeConfig().public.baseGithubApi;

		userState.value = {
			user: null,
			isAuthLoading: true
		};

		return await $fetch<User>(githubApi + '/user', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${params?.token || token.value}`
			}
		})
			.then((res) => {
				userState.value = {
					...userState.value,
					user: res
				};

				if (params?.onResult) {
					return params.onResult(res);
				}
			})
			.catch(() => {
				token.value = null;
				userState.value = {
					...userState.value,
					user: null
				};
				if (params?.onError) {
					return params.onError();
				}
			})
			.finally(() => {
				userState.value = {
					...userState.value,
					isAuthLoading: false
				};
			});
	};

	const logOut = (fn?: () => void) => {
		token.value = null;
		userState.value.user = null;
		if (fn) fn();
	};

	const isAuth = computed(() => {
		return !!userState.value.user && !!token.value;
	});

	return {
		userState,
		isAuth,
		getUser,
		logOut
	};
};
