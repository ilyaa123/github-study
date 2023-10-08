interface mainNavigationItem {
	text: string;
	path?: string;
	icon?: string;
}

const mainNavigation = (): mainNavigationItem[] => {
	return [
		{
			text: 'Home',
			path: '/'
		},
		{
			text: 'Repositories',
			path: '/repositories'
		}
	];
};

export default mainNavigation;
