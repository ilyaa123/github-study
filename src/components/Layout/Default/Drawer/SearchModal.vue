<script setup lang="ts">
const { drawerState, setSearchModalOpen } = useDrawers();
</script>
<template>
	<el-dialog
		:model-value="drawerState.searchModalOpen"
		title="Search"
		destroy-on-close
		@close="setSearchModalOpen(false)"
	>
		<Search />
	</el-dialog>
</template>
