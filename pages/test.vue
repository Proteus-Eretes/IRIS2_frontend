<template>
	<div
		class="
			flex flex-col
			items-center
			justify-center
			h-full
			space-y-4
			text-xl
		"
	>
		<p>Here's a counter:</p>
		<div class="flex items-center justify-center">
			<button
				@click="store.counter++"
				class="
					px-4
					py-2
					font-bold
					text-white
					bg-secondary-500
					rounded
					hover:bg-secondary-700
				"
			>
				+
			</button>
			<span class="mx-2">{{ store.counter }}</span>
			<button
				@click="store.counter--"
				class="
					px-4
					py-2
					font-bold
					text-white
					bg-secondary-500
					rounded
					hover:bg-secondary-700
				"
			>
				-
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useStore } from '@/stores/counter';

const store = useStore();
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	layout: 'main',
});
</script>
