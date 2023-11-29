export type RepoResult = {
	id: string;
	name: string;
	description?: string;
	owner: {
		login: string;
	};
};

export type UserResult = {
	id: string;
	avatarUrl: string;
	name: string;
	login: string;
};

export type IssueResult = {
	id: string;
	title: string;
	author: {
		login: string;
		avatarUrl: string;
	};
};

export interface SearchRepoResult {
	pageInfo: {
		hasNextPage: boolean;
	};
	repos: { repo: RepoResult }[];
	users: { user: UserResult }[];
	issues: { issue: IssueResult }[];
}
