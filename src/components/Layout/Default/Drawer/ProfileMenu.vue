<script setup lang="ts">
const { drawerState, setProfileAsideOpen } = useDrawers();

const { user, logOut } = useUser();

const router = useRouter();
</script>
<template>
	<el-drawer
		direction="rtl"
		:model-value="drawerState.profileAsideOpen"
		size="300px"
		@close="setProfileAsideOpen(false)"
	>
		<template #header>
			<el-text size="large">Hi, {{ user?.name || user?.login }}!</el-text>
		</template>
		<template #default> </template>
		<template #footer>
			<el-button
				type="danger"
				class="w-100%"
				@click="logOut(() => router.push('/login'))"
			>
				<el-icon size="24" color="var(--el-color-white)" class="mr-2">
					<Icon name="ri:logout-box-r-line" />
				</el-icon>
				Log Out
			</el-button>
		</template>
	</el-drawer>
</template>
