<template>
	<div class="p-2 flex items-center justify-between">
		<div class="flex-1 flex justify-between sm:hidden">
			<a
				class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 disabled:text-gray-300 bg-white hover:bg-gray-50"
				@click="$emit('update:index', index - 1)"
				:disabled="index == min"
			>
				Previous
			</a>
			<a
				class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 disabled:text-gray-300 bg-white hover:bg-gray-50"
				@click="$emit('update:index', index + 1)"
				:disabled="index == max"
			>
				Next
			</a>
		</div>
		<div
			:class="[
				showText ? 'sm:justify-between' : 'sm:justify-center',
				'hidden sm:flex-1 sm:flex sm:items-center',
			]"
		>
			<div v-if="showText">
				<p class="text-sm text-gray-700">
					Showing
					{{ ' ' }}
					<span class="font-medium">{{
						(index - 1) * spacing + 1
					}}</span>
					{{ ' ' }}
					to
					{{ ' ' }}
					<span class="font-medium">{{
						Math.min(index * spacing, amount)
					}}</span>
					{{ ' ' }}
					of
					{{ ' ' }}
					<span class="font-medium">{{ amount }}</span>
					{{ ' ' }}
					results
				</p>
			</div>
			<div>
				<nav
					class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
					aria-label="Pagination"
				>
					<button
						class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 disabled:text-gray-300 hover:bg-gray-50"
						@click="$emit('update:index', index - 1)"
						:disabled="index == min"
					>
						<span class="sr-only">Previous</span>
						<ph-caret-left class="icon" aria-hidden="true" />
					</button>
					<span
						v-if="isTooWide && index - 1 > min"
						class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
					>
						...
					</span>
					<button
						v-for="i in safeRange"
						:key="i"
						aria-current="page"
						:class="[
							i == index
								? 'z-10 bg-secondary-50 border-secondary-500 text-secondary-600'
								: 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
							'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
						]"
						@click="$emit('update:index', i)"
					>
						{{ i }}
					</button>
					<span
						v-if="isTooWide && index + 1 < max"
						class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
					>
						...
					</span>
					<button
						class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 disabled:text-gray-300 hover:bg-gray-50"
						@click="$emit('update:index', index + 1)"
						:disabled="index == max"
					>
						<span class="sr-only">Next</span>
						<ph-caret-right class="icon" aria-hidden="true" />
					</button>
				</nav>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { PhCaretLeft, PhCaretRight } from 'phosphor-vue';

interface Props {
	index: number;
	amount: number;
	spacing: number;
	showText?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	index: 1,
	showText: false,
});

const emits = defineEmits<{
	(e: 'update:index', index: number): void;
}>();

const min = 1;
const max = computed(() => {
	return Math.ceil(props.amount / props.spacing);
});

const isTooWide = computed(() => {
	return max.value > 5;
});
const safeRange = computed(() => {
	return max.value > 5
		? range(3, Math.max(1, Math.min(max.value - 2, props.index - 1)))
		: range(max.value, min);
});

const range = (size: number, startAt: number = 0): ReadonlyArray<number> => {
	return [...Array(size).keys()].map((i) => i + startAt);
};
</script>
