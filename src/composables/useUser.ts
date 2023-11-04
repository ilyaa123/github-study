import repositoriesQuery from '~/graphql/user/get.gql';
import { User } from '~/types/user';

const useUser = () => {
	const token = useCookie('gitToken');
	const user = ref<User | null>(null);

	const getUser = () => {
		const { result } = useQuery<{ viewer: User }>(repositoriesQuery);

		watch(result, () => {
			if (result.value) user.value = result.value?.viewer;
		});
	};

	const isAuth = computed(() => {
		return !!user.value && !!token.value;
	});

	return {
		user,
		isAuth,
		getUser
	};
};

export default useUser;
