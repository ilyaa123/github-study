declare module '#app' {
	interface PageMeta {
		authGuard?: boolean;
		backtop?: boolean;
	}
}

declare module '*.gql' {
	import { DocumentNode } from 'graphql';
	const Schema: DocumentNode;
	export = Schema;
}

export {};
