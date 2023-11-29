const useDrawers = () => {
	const drawerState = useState('drawers', () => ({
		profileAsideOpen: false,
		searchModalOpen: false
	}));

	const setProfileAsideOpen = (value: boolean) => {
		drawerState.value = {
			...drawerState.value,
			profileAsideOpen: value
		};
	};

	const setSearchModalOpen = (value: boolean) => {
		drawerState.value = {
			...drawerState.value,
			searchModalOpen: value
		};
	};

	return {
		drawerState,
		setProfileAsideOpen,
		setSearchModalOpen
	};
};

export default useDrawers;
