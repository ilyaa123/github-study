declare module '#app' {
	interface PageMeta {
		authGuard?: boolean;
	}
}

declare module '*.gql' {
	import { DocumentNode } from 'graphql';
	const Schema: DocumentNode;
	export = Schema;
}

export {};
