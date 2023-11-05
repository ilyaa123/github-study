export type FileType = 'blob' | 'tree';

export type File = {
	name: string;
	type: FileType;
	mode: number;
	object: {
		byteSize: number;
		isBinary: boolean;
	};
};

export type RepoFiles = File[];
