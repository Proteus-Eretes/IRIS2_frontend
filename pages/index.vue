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
				@click="counter++"
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
			<span class="mx-2">{{ counter }}</span>
			<button
				@click="counter--"
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
const counter = ref(0);
</script>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	layout: 'main',
});
</script>
