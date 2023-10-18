export type RepositoryPrivacy = 'PUBLIC' | 'PRIVATE';

export type RepositoryOrderField =
	| 'CREATED_AT'
	| 'UPDATED_AT'
	| 'PUSHED_AT'
	| 'NAME'
	| 'STARGAZERS';

export interface Filter {
	type: RepositoryPrivacy;
	sort: RepositoryOrderField;
}
