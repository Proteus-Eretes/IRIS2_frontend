<template>
	<Transition
		ref="element"
		enter-active-class="transform ease-out duration-300 transition"
		enter-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
		enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
		leave-active-class="transform ease-in duration-100"
		leave-class="opacity-100 sm:translate-x-0 translate-y-0"
		leave-to-class="opacity-0 sm:translate-x-1 translate-y-1 sm:translate-y-0"
	>
		<template>
			<div
				v-if="open && !primary"
				:class="classToastAll"
				class="
					max-w-sm
					w-full
					shadow-lg
					rounded-lg
					pointer-events-auto
					relative
					mb-4
					overflow-hidden
				"
			>
				<div
					v-if="progress && timeout"
					:class="classTimeout"
					class="absolute left-0 bottom-0 right-0 h-1 rounded"
					:style="progressStyle"
				></div>
				<div
					:class="classToastAll"
					class="rounded-lg shadow-xs overflow-hidden z-100"
				>
					<div class="p-4">
						<div class="flex items-start">
							<div class="flex-shrink-0">
								<div
									v-if="type === PropType.SUCCES"
									class="
										border-2 border-green-200
										rounded-full
										p-1
									"
								>
									<IconCheck
										class="w-3 h-3"
										primary="text-green-400"
										secondary="text-green-300"
									></IconCheck>
								</div>
								<div
									v-if="type === PropType.INFO"
									class="
										border-2 border-blue-200
										rounded-full
										p-1
									"
								>
									<IconInfo
										class="w-3 h-3"
										primary="text-blue-400"
										secondary="text-blue-300"
									></IconInfo>
								</div>
								<div
									v-if="type === PropType.WARNING"
									class="
										border-2 border-yellow-200
										rounded-full
										p-1
									"
								>
									<IconBang
										class="w-3 h-3"
										primary="text-yellow-400"
										secondary="text-yellow-300"
									></IconBang>
								</div>
								<div
									v-if="type === PropType.DANGER"
									class="
										border-2 border-red-200
										rounded-full
										p-1
									"
								>
									<IconBang
										class="w-3 h-3"
										primary="text-red-400"
										secondary="text-red-300"
									></IconBang>
								</div>
								<div
									v-if="type === PropType.DENIED"
									class="rounded-full"
								>
									<IconDenied
										class="w-5 h-5"
										primary="text-red-400"
										secondary="text-red-300"
									></IconDenied>
								</div>
								<div v-if="icon">
									<component
										:is="icon"
										:primary="iconPrimary"
										:secondary="iconSecondary"
										class="w-6 h-6"
									></component>
								</div>
							</div>
							<div class="ml-3 w-0 flex-1 pt-0.5">
								<p
									v-if="title"
									:class="classTitle"
									class="text-sm leading-5 font-medium"
								>
									{{ title }}
								</p>
								<p
									:class="[classMessage, { 'mt-1': title }]"
									class="text-sm leading-5"
									v-html="message"
								></p>
							</div>
							<div class="ml-4 flex-shrink-0 flex">
								<button
									class="
										inline-flex
										text-gray-400
										transition
										ease-in-out
										duration-150
										focus:outline-none focus:text-gray-500
									"
									@click="destroy"
								>
									<IconTimes
										class="h-4 w-4"
										:primary="classClose"
										:secondary="classClose"
									></IconTimes>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				v-if="open && primary && secondary"
				:class="classToastAll"
				class="
					max-w-md
					w-full
					shadow-lg
					rounded-lg
					pointer-events-auto
					mb-4
				"
			>
				<div
					v-if="progress && timeout"
					class="
						absolute
						left-0
						bottom-0
						right-0
						h-1
						rounded
						bg-gray-100
						dark:bg-gray-900
					"
					:style="progressStyle"
				></div>
				<div class="flex rounded-lg shadow-xs">
					<div class="w-0 flex-1 flex items-center p-4">
						<div class="flex-shrink-0 mr-4">
							<div
								v-if="type === PropType.SUCCES"
								class="
									border-2 border-green-200
									rounded-full
									p-1
								"
							>
								<IconCheck
									class="w-3 h-3"
									primary="text-green-400"
									secondary="text-green-300"
								></IconCheck>
							</div>
							<div
								v-if="type === PropType.INFO"
								class="
									border-2 border-blue-200
									rounded-full
									p-1
								"
							>
								<IconInfo
									class="w-3 h-3"
									primary="text-blue-400"
									secondary="text-blue-300"
								></IconInfo>
							</div>
							<div
								v-if="type === PropType.WARNING"
								class="
									border-2 border-yellow-200
									rounded-full
									p-1
								"
							>
								<IconBang
									class="w-3 h-3"
									primary="text-yellow-400"
									secondary="text-yellow-300"
								></IconBang>
							</div>
							<div
								v-if="type === PropType.DANGER"
								class="border-2 border-red-200 rounded-full p-1"
							>
								<IconBang
									class="w-3 h-3"
									primary="text-red-400"
									secondary="text-red-300"
								></IconBang>
							</div>
							<div
								v-if="type === PropType.DENIED"
								class="rounded-full"
							>
								<IconDenied
									class="w-5 h-5"
									primary="text-red-400"
									secondary="text-red-300"
								></IconDenied>
							</div>
							<div v-if="icon">
								<component
									:is="icon"
									:primary="iconPrimary"
									:secondary="iconSecondary"
									class="w-6 h-6"
								></component>
							</div>
						</div>
						<div class="w-full">
							<p
								v-if="title"
								:class="classTitle"
								class="text-sm leading-5 font-medium"
							>
								{{ title }}
							</p>
							<p
								:class="[classMessage, { 'mt-1': title }]"
								class="text-sm leading-5"
								v-html="message"
							></p>
						</div>
					</div>
					<div class="flex border-l border-gray-200">
						<div class="-ml-px flex flex-col">
							<div
								class="h-0 flex-1 flex border-b border-gray-200"
							>
								<button
									class="
										-mb-px
										flex
										items-center
										justify-center
										w-full
										rounded-tr-lg
										border border-transparent
										px-4
										py-3
										text-sm
										leading-5
										font-medium
										transition
										ease-in-out
										duration-150
										focus:outline-none
									"
									:class="classPrimary"
									@click="primaryAction"
								>
									{{ primary.label }}
								</button>
							</div>
							<div class="-mt-px h-0 flex-1 flex">
								<button
									class="
										flex
										items-center
										justify-center
										w-full
										rounded-br-lg
										border border-transparent
										px-4
										py-3
										text-sm
										leading-5
										font-medium
										transition
										ease-in-out
										duration-150
										focus:outline-none
									"
									:class="classSecondary"
									@click="secondaryAction"
								>
									{{ secondary.label }}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				v-if="open && primary && !secondary"
				:class="classToastAll"
				class="
					max-w-md
					w-full
					shadow-lg
					rounded-lg
					pointer-events-auto
					mb-4
				"
			>
				<div
					v-if="progress && timeout"
					class="
						absolute
						left-0
						bottom-0
						right-0
						h-1
						rounded
						bg-gray-100
						dark:bg-gray-900
					"
					:style="progressStyle"
				></div>
				<div class="rounded-lg shadow-xs overflow-hidden">
					<div class="p-4">
						<div class="flex items-center">
							<div class="flex-shrink-0 mr-4">
								<div
									v-if="type === PropType.SUCCES"
									class="
										border-2 border-green-200
										rounded-full
										p-1
									"
								>
									<IconCheck
										class="w-3 h-3"
										primary="text-green-400"
										secondary="text-green-300"
									></IconCheck>
								</div>
								<div
									v-if="type === PropType.INFO"
									class="
										border-2 border-blue-200
										rounded-full
										p-1
									"
								>
									<IconInfo
										class="w-3 h-3"
										primary="text-blue-400"
										secondary="text-blue-300"
									></IconInfo>
								</div>
								<div
									v-if="type === PropType.WARNING"
									class="
										border-2 border-yellow-200
										rounded-full
										p-1
									"
								>
									<IconBang
										class="w-3 h-3"
										primary="text-yellow-400"
										secondary="text-yellow-300"
									></IconBang>
								</div>
								<div
									v-if="type === PropType.DANGER"
									class="
										border-2 border-red-200
										rounded-full
										p-1
									"
								>
									<IconBang
										class="w-3 h-3"
										primary="text-red-400"
										secondary="text-red-300"
									></IconBang>
								</div>
								<div
									v-if="type === PropType.DENIED"
									class="rounded-full"
								>
									<IconDenied
										class="w-5 h-5"
										primary="text-red-400"
										secondary="text-red-300"
									></IconDenied>
								</div>
								<div v-if="icon">
									<component
										:is="icon"
										:primary="iconPrimary"
										:secondary="iconSecondary"
										class="w-6 h-6"
									></component>
								</div>
							</div>
							<div class="w-0 flex-1 flex justify-between">
								<p
									class="w-0 flex-1 text-sm leading-5"
									v-html="message"
								></p>
								<button
									class="
										ml-3
										flex-shrink-0
										text-sm
										leading-5
										font-medium
										transition
										ease-in-out
										duration-150
										focus:outline-none focus:underline'
									"
									:class="classSingle"
									@click="primaryAction"
								>
									{{ primary.label }}
								</button>
							</div>
							<div class="ml-4 flex-shrink-0 flex">
								<button
									class="
										inline-flex
										text-gray-400
										focus:outline-none focus:text-gray-500
										transition
										ease-in-out
										duration-150
									"
									@click="destroy"
								>
									<IconTimes
										class="h-4 w-4"
										:primary="classClose"
										:secondary="classClose"
									></IconTimes>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>
	</Transition>
</template>

<script lang="ts" setup>
interface Props {
	open: boolean;
	title: string;
	message: string;
	type: PropType;
	progress: boolean;
	icon: string;
	iconPrimary: string;
	iconSecondary: string;
	timeout: number;
	primary: Button;
	secondary: Button;
	classToast: string;
	classTitle: string;
	classMessage: string;
	classPrimary: string;
	classSecondary: string;
	classSingle: string;
	classClose: string;
	classTimeout: string;
	defaults: Object;
}

interface Button {
	label: string;
	action: Function;
}

enum PropType {
	SUCCES = 'success',
	INFO = 'info',
	DANGER = 'danger',
	WARNING = 'warning',
	DENIED = 'denied',
}

const props = withDefaults(defineProps<Props>(), {
	open: false,
	title: '',
	message: 'Please specify a <b>message</b>',
	type: PropType.INFO,
	progress: false,
	timeout: 2,
	classToast: 'bg-white dark:bg-gray-800',
	classTitle: 'text-gray-900 dark:text-gray-100',
	classMessage: 'text-gray-500 dark:text-gray-400',
	classPrimary:
		'text-secondary-600 hover:text-secondary-500 focus:shadow-outline-blue focus:border-primary-300 active:text-secondary-700 active:bg-gray-50',
	classSecondary:
		'text-gray-700 hover:text-gray-500 focus:shadow-outline-blue focus:border-primary-300 active:text-gray-800 active:bg-gray-50',
	classSingle: 'text-secondary-600 hover:text-secondary-500',
	classClose: 'text-gray-400 dark:text-gray-600',
	classTimeout: 'bg-gray-200 dark:bg-gray-700',
	defaults: () => ({}),
});

const emits = defineEmits<{
	(e: 'close'): void;
}>();

const interval = ref(null);
const timeLeft = ref(0);
const speed = ref(100);
const element: HTMLElement = ref(null);

const classToastAll = computed(() => {
	if (props.classToast) return [props.classToast];
	return [];
});
const timeLeftPercent = computed(() => {
	return Math.round(
		(((timeLeft.value * 100) / (props.timeout * 1000)) * 100) / 100
	);
});
const progressStyle = computed(() => {
	return `width: ${timeLeftPercent}%; transition: width 0.1s linear;`;
});

onMounted(() => {
	active.value = true;
	if (props.timeout > 0) {
		timeLeft.value = props.timeout * 1000;
		interval.value = setInterval(() => updateTime(), speed.value);
	}
});

const updateTime = () => {
	timeLeft.value -= speed.value;
	if (timeLeft.value === 0) destroy();
};
const destroy = () => {
	// active.value = false;
	emits('close');
	clearInterval(interval.value);
	setTimeout(() => {
		removeElement(element);
	}, 1000);
};
const primaryAction = () => {
	props.primary.action();
	destroy();
};
const secondaryAction = () => {
	props.secondary.action();
	destroy();
};

const removeElement = (el: HTMLElement) => {
	if (typeof el.remove !== 'undefined') el.remove();
	else el.parentNode.removeChild(el);
};
</script>
