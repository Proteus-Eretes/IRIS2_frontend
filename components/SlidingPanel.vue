<template>
	<div
		:class="[
			showPanel ? 'sliding-column' : 'opacity-0',
			activePanel > 0 ? 'min-w-multiple-column' : '',
			isMuted ? 'opacity-50' : '',
			'panel',
		]"
		:style="`--tw-translate-x: -${translate}%;`"
	>
		<a
			:class="[
				isMuted ? '' : 'hidden',
				'block absolute inset-0 rounded-md bg-black opacity-0 hover:opacity-30 transition-opacity',
			]"
			@click="$emit('focus')"
		/>

		<div class="panel-header">
			<h2>
				<slot name="header" />
			</h2>

			<slot name="header-buttons" />

			<a v-if="allowClose" @click="$emit('close')">
				<XIcon class="icon-white" />
			</a>
		</div>

		<div class="p-2 flex-grow overflow-scroll">
			<slot />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { XIcon } from '@heroicons/vue/outline';

interface Props {
	index: number;
	activePanel: number;
}

const props = withDefaults(defineProps<Props>(), {
	index: 0,
	activePanel: 0,
});

const emits = defineEmits<{
	(e: 'focus'): void;
	(e: 'close'): void;
}>();

/*
 * The amount of open panels is the index of
 * the active panel plus one
 */
const amountOpenPanels = computed(() => {
	return props.activePanel + 1;
});

/*
 * The amount the panels should move is equal to the amount
 * of open panels minus 2 (the 2 that will be visible)
 */
const translate = computed(() => {
	return Math.max(amountOpenPanels.value - 2, 0) * 100;
});

/*
 * The panel should be visible only if the index of
 * the active panel is greater or equal to the index of the panel
 */
const showPanel = computed(() => {
	return props.activePanel >= props.index;
});

/*
 * Mute the panel if it is off screen
 */
const isMuted = computed(() => {
	return amountOpenPanels.value > props.index + 2;
});

/*
 * Don't allow the first panel to be closed
 */
const allowClose = computed(() => {
	return props.index != 0;
});
</script>
