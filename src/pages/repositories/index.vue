<script setup lang="ts">
const queryRepositories = gql`
	query {
		viewer {
			repositories(
				first: 100
				orderBy: { field: CREATED_AT, direction: DESC }
			) {
				nodes {
					id
					name
					updatedAt
					description
					primaryLanguage {
						color
						name
					}
					forks {
						totalCount
					}
					stargazers {
						totalCount
					}
				}
			}
		}
	}
`;

const { data, pending } = useAsyncQuery(queryRepositories);
console.log('🚀 ~ file: index.vue:31 ~ data:', data);
</script>

<template>
	<div>
		<h1>Repositories</h1>
		<Repositories
			:isLoading="pending"
			:repositories="data?.viewer.repositories.nodes"
		/>
	</div>
</template>
