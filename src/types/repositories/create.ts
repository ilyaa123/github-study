export type createRepository = {
	name: string;
	description?: string;
	visibility?: 'PRIVATE' | 'PUBLIC';
	template: boolean;
	homepageUrl?: URL | string;
	hasWikiEnabled: boolean;
	hasIssuesEnabled: boolean;
};
