export type GetRepositoryItem = {
	id: string;
	name: string;
	updatedAt: Date | string;
	description?: string;
	owner: {
		login: string;
	};
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

export interface RepositoryList {
	viewer: {
		repositories: {
			totalCount: number;
			pageInfo: { hasNextPage: boolean };
			nodes: GetRepositoryItem[];
		};
	};
}
