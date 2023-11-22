<script lang="ts" setup>
definePageMeta({
	layout: 'session',
	middleware: ['login'],
	authGuard: false
});

const { githubClientID } = useRuntimeConfig().public;

const login = () => {
	const redirectUri = window.location.origin + '/login';

	const loginUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientID}&redirect_uri=${redirectUri}`;

	window.location.href = loginUrl;
};
</script>

<template>
	<el-card class="card">
		<template #header>
			<div class="card-header">
				<h1>
					<el-text type="primary" size="large">GitHub Study</el-text>
				</h1>
			</div>
		</template>
		<div class="button-container">
			<el-button type="primary" size="large" plain @click="login"
				>Login with GitHub</el-button
			>
		</div>
	</el-card>
</template>
<style lang="scss" scoped>
.card {
	max-width: 600px;
	width: 100%;
}
.card-header {
	display: flex;
	justify-content: center;
	align-items: center;
}
.button-container {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
