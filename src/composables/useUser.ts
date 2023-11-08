import repositoriesQuery from '~/graphql/user/get.gql';
import { User } from '~/types/user';

interface GetUserParams {
	onResult?: (res: { viewer: User }) => void;
	onError?: () => void;
}

export const useUser = () => {
	const token = useCookie('gitToken');

	const user = useState<User | null>('user', () => null);

	const isAuth = useState('isAuth', () => false);

	const isAuthLoading = useState('isAuthLoading', () => false);

	const getUser = (params: GetUserParams | void) => {
		isAuthLoading.value = true;

		const { onResult, onError } = useQuery<{ viewer: User }>(
			repositoriesQuery
		);

		onResult((res) => {
			user.value = res.data.viewer;
			isAuth.value = true;
			isAuthLoading.value = false;
			if (params?.onResult) {
				params.onResult(res.data);
			}
		});
		onError(() => {
			isAuthLoading.value = false;
			if (params?.onError) {
				params.onError();
			}
		});
	};

	const logOut = (fn?: () => void) => {
		token.value = null;
		isAuth.value = false;
		user.value = null;
		if (fn) fn();
	};

	// const isAuth = computed(() => {
	// 	return !!user.value && !!token.value;
	// });

	return {
		user,
		isAuth,
		isAuthLoading,
		getUser,
		logOut
	};
};
