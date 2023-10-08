<script setup lang="ts">
interface IQueryFewUser {
	viewer: {
		avatarUrl: string;
	};
}

const queryFewUser = gql`
	query {
		viewer {
			avatarUrl
		}
	}
`;

const { data } = await useAsyncQuery<IQueryFewUser>(queryFewUser);
</script>

<template>
	<div class="toolbar">
		<NuxtLink to="/profile/">
			<el-avatar shape="square" :src="data?.viewer?.avatarUrl" />
		</NuxtLink>
	</div>
</template>
<style lang="scss" scoped>
.toolbar {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	right: 20px;
}
</style>
