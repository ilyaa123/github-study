export type FileType = 'blob' | 'tree';

export type File = {
	name: string;
	type: FileType;
	mode: number;
	language: {
		name: string | null;
	};
};

export type RepoFiles = File[];
