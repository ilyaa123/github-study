const useDrawers = () => {
	const drawerState = useState('drawers', () => ({
		profileAsideOpen: false
	}));

	const setProfileAsideOpen = (value: boolean) => {
		drawerState.value = {
			...drawerState.value,
			profileAsideOpen: value
		};
	};

	return {
		drawerState,
		setProfileAsideOpen
	};
};

export default useDrawers;
