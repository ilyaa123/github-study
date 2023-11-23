export type StatusState =
	| 'EXPECTED'
	| 'ERROR'
	| 'FAILURE'
	| 'PENDING'
	| 'SUCCESS';

export type Commit = {
	oid: string;
	message: string;
	committedDate: string;
	history: {
		totalCount: number;
	};
	status: {
		state: StatusState;
	} | null;
};
