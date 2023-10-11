interface mainNavigationItem {
	text: string;
	path?: string;
	icon?: string;
}

const mainNavigation = (): mainNavigationItem[] => {
	return [
		{
			text: 'Repositories',
			path: '/repositories',
			icon: 'mdi:database'
		},
		{
			text: 'Projects',
			icon: 'tabler:bookmarks-filled'
		},
		{
			text: 'Packages',
			icon: 'material-symbols:package-2-sharp'
		},
		{
			text: 'Stars',
			icon: 'material-symbols:stars-outline'
		}
	];
};

export default mainNavigation;
