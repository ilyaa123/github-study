<script setup lang="ts">
import mainNavigation from '../../../data/navigation/main';

const navigation = computed(() => mainNavigation());
</script>
<template>
	<el-scrollbar>
		<el-menu router background-color="primary">
			<template v-for="(item, index) in navigation" :key="index">
				<el-menu-item :index="item.path">{{ item.text }}</el-menu-item>
			</template>
		</el-menu>
	</el-scrollbar>
</template>
