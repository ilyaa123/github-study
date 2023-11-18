type Prop = {
	mode: number;
}[];

const sortFiles = <T extends Prop>(files: T): T => {
	return files.sort((a, b) => {
		return a.mode - b.mode;
	});
};

export default sortFiles;
