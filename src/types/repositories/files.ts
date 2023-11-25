import { Ref } from '~/types/repositories/refs';

export type FileType = 'blob' | 'tree';

export type RepoFile = {
	name: string;
	type: FileType;
	mode: number;
	language: {
		name: string | null;
	};
};

export type RepoFileTree = {
	name: string;
	type: FileType;
	mode: number;
	path: string;
};

export type RepoFiles = RepoFile[];

export interface RepoFilesQueryResult {
	repository: {
		id: string;
		object: { entries: RepoFiles };
		refs: { nodes: Ref[] };
		defaultBranchRef: {
			name: string;
			target: {
				oid: string;
				message: string;
				committedDate: string;
				history: {
					totalCount: number;
				};
			};
		};
		stargazers: {
			nodes: {
				login: string;
			}[];
		};
	};
}
