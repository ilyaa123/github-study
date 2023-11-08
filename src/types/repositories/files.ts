export type FileType = 'blob' | 'tree';

export type File = {
	name: string;
	type: FileType;
	mode: number;
	language: {
		name: string | null;
	};
	object: {
		byteSize: number;
		isBinary: boolean;
	};
};

export type RepoFiles = File[];
