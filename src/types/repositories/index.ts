export type GetRepositoryItem = {
	id: string;
	name: string;
	updatedAt: Date | string;
	description?: string;
	primaryLanguage: {
		color: string;
		name: string;
	} | null;
	forks: {
		totalCount: number;
	};
	stargazers: {
		totalCount: number;
	};
};
