import { onUnmounted, ref } from 'vue';

const useThrottle = (ms = 500) => {
	const timeoutRef = ref<number | null>(null);

	onUnmounted(() => {
		if (timeoutRef.value) clearTimeout(timeoutRef.value);
	});

	return (fnc: (...params: any) => any) => {
		if (timeoutRef.value) clearTimeout(timeoutRef.value);
		timeoutRef.value = setTimeout(fnc, ms);
	};
};

export default useThrottle;
