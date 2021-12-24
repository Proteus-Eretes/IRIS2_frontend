<template>
	<div class="shrink-0">
		<div
			v-if="type === ToastType.SUCCESS"
			class="border-2 border-success-200 rounded-full p-0.5"
		>
			<CheckIcon class="w-4 h-4 text-success-400" />
		</div>
		<div
			v-if="type === ToastType.INFO"
			class="border-2 border-secondary-200 rounded-full p-0.5"
		>
			<!-- <InformationCircleIcon
                class="w-4 h-4 text-secondary-400"
            /> -->
			<div
				class="
					w-4
					h-4
					text-secondary-400 text-center text-sm
					font-semibold
					items-center
					leading-4
				"
			>
				i
			</div>
		</div>
		<div
			v-if="type === ToastType.WARNING"
			class="border-2 border-warning-200 rounded-full p-0.5"
		>
			<!-- <ExclamationIcon class="w-4 h-4 text-warning-400" /> -->
			<div
				class="
					w-4
					h-4
					text-warning-400 text-center text-sm
					font-semibold
					items-center
					leading-4
				"
			>
				!
			</div>
		</div>
		<div
			v-if="type === ToastType.DANGER"
			class="border-2 border-danger-200 rounded-full p-0.5"
		>
			<!-- <ExclamationIcon class="w-4 h-4 text-danger-400" /> -->
			<div
				class="
					w-4
					h-4
					text-danger-400 text-center text-sm
					font-semibold
					items-center
					leading-4
				"
			>
				!
			</div>
		</div>
		<div
			v-if="type === ToastType.DENIED"
			class="border-2 border-danger-200 rounded-full p-0.5"
		>
			<XIcon class="w-4 h-4 text-danger-100" />
		</div>
		<!-- <div v-if="icon">
			<component
				:is="icon"
				:primary="iconPrimary"
				:secondary="iconSecondary"
				class="w-6 h-6"
			></component>
		</div> -->
	</div>
</template>

<script lang="ts" setup>
import {
	CheckIcon,
	InformationCircleIcon,
	ExclamationIcon,
	XIcon,
} from '@heroicons/vue/outline';
import { ToastType } from '~~/types/toast';

interface Props {
	type: ToastType;
}

const props = defineProps<Props>();
</script>
