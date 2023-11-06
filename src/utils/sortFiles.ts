import { RepoFiles } from '~/types/repositories/files';

const sortFiles = (files: RepoFiles) => {
	return files.sort((a, b) => {
		return a.mode - b.mode;
	});
};

export default sortFiles;
