export type createRepository = {
	name: string;
	description?: string;
	visibility?: 'PRIVATE' | 'PUBLIC';
	template: boolean;
	homepageUrl?: string;
	hasWikiEnabled: boolean;
	hasIssuesEnabled: boolean;
};
