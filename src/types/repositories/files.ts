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
