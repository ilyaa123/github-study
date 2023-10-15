<script setup lang="ts">
import mainNavigation from '../../../data/navigation/main';

const navigation = computed(() => mainNavigation());
</script>
<template>
	<el-scrollbar class="scrollbar">
		<el-menu class="menu" router>
			<el-menu-item index="/">
				<template #title>
					<el-text class="mx-1" type="primary"
						><h2>GitHub Lite</h2></el-text
					>
				</template>
			</el-menu-item>
			<template v-for="(item, index) in navigation" :key="index">
				<el-menu-item :index="item.path">
					<el-icon v-if="item?.icon" :size="24"
						><Icon :name="item?.icon" style="color: inherit"
					/></el-icon>
					<template #title>
						{{ item.text }}
					</template>
				</el-menu-item>
			</template>
		</el-menu>
	</el-scrollbar>
</template>
<style lang="scss" scoped>
.scrollbar {
	height: 100%;
}

.menu {
	min-height: 100dvh;
}
</style>
