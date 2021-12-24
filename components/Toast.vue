<template>
	<TransitionRoot as="template" :show="open">
		<div class="fixed top-0 right-0 overflow-hidden z-50">
			<TransitionChild
				as="template"
				enter="transform ease-out duration-300 transition"
				enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
				enter-to="translate-y-0 opacity-100 sm:translate-x-0"
				leave="transform ease-in duration-100 transition"
				leave-from="opacity-100 sm:translate-x-0 translate-y-0"
				leave-to="opacity-0 sm:translate-x-1 translate-y-1 sm:translate-y-0"
			>
				<div
					:class="[
						!toast.primary ? 'max-w-sm' : 'max-w-md',
						'p-3 w-screen',
					]"
				>
					<div
						v-if="open && !toast.primary"
						:class="[
							toast.type == ToastType.DENIED
								? 'bg-danger-600'
								: 'bg-white',
							'shadow-lg rounded-lg relative overflow-hidden p-3',
						]"
					>
						<div class="flex items-start">
							<ToastIcon :type="toast.type" />
							<div class="ml-3 grow pt-0.5">
								<p
									v-if="toast.title"
									:class="[
										toast.type == ToastType.DENIED
											? 'text-danger-100'
											: 'text-gray-900',
										'text-sm leading-5 font-medium',
									]"
								>
									{{ toast.title }}
								</p>
								<p
									:class="[
										toast.type == ToastType.DENIED
											? 'text-danger-200'
											: 'text-gray-500',
										toast.title ? 'mt-1' : '',
									]"
									class="text-sm leading-5"
									v-html="toast.message"
								></p>
							</div>
							<div class="ml-4 shrink-0">
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
									<XIcon
										:class="[
											toast.type == ToastType.DENIED
												? 'text-danger-300'
												: 'text-gray-400',
											'h-4 w-4',
										]"
									/>
								</button>
							</div>
						</div>
					</div>
					<div
						v-if="open && toast.primary && toast.secondary"
						:class="[
							toast.type == ToastType.DENIED
								? 'bg-danger-600'
								: 'bg-white',
							'shadow-lg rounded-lg',
						]"
					>
						<div class="flex rounded-lg shadow-xs">
							<div class="grow flex items-center p-3">
								<ToastIcon class="mr-4" :type="toast.type" />
								<div class="w-full">
									<p
										v-if="toast.title"
										:class="[
											toast.type == ToastType.DENIED
												? 'text-danger-100'
												: 'text-gray-900',
											'text-sm leading-5 font-medium',
										]"
									>
										{{ toast.title }}
									</p>
									<p
										:class="[
											toast.type == ToastType.DENIED
												? 'text-danger-200'
												: 'text-gray-500',
											toast.title ? 'mt-1' : '',
										]"
										class="text-sm leading-5"
										v-html="toast.message"
									></p>
								</div>
							</div>
							<div class="flex border-l border-gray-200">
								<div class="flex flex-col">
									<div
										class="
											flex
											grow
											border-b border-gray-200
										"
									>
										<button
											class="
												flex
												items-center
												justify-center
												w-full
												rounded-tr-lg
												border border-transparent
												px-4
												py-1
												text-sm
												leading-5
												font-medium
												transition
												ease-in-out
												duration-150
												focus:outline-none
											"
											:class="[
												toast.type == ToastType.DENIED
													? 'text-danger-100'
													: 'text-secondary-500 hover:text-secondary-400 focus:shadow-outline-blue',
											]"
											@click="primaryAction"
										>
											{{ toast.primary.label }}
										</button>
									</div>
									<div class="grow flex">
										<button
											class="
												flex
												items-center
												justify-center
												w-full
												rounded-br-lg
												border border-transparent
												px-4
												py-1
												text-sm
												leading-5
												font-medium
												transition
												ease-in-out
												duration-150
												focus:outline-none
											"
											:class="
												toast.type == ToastType.DENIED
													? ''
													: 'text-gray-700 hover:text-gray-500 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50'
											"
											@click="secondaryAction"
										>
											{{ toast.secondary.label }}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						v-if="open && toast.primary && !toast.secondary"
						:class="[
							toast.type == ToastType.DENIED
								? 'bg-danger-600'
								: 'bg-white',
							'shadow-lg rounded-lg',
						]"
					>
						<div class="rounded-lg shadow-xs overflow-hidden p-4">
							<div class="flex items-center">
								<ToastIcon class="mr-4" :type="toast.type" />
								<div class="grow flex justify-between">
									<p
										class="grow text-sm leading-5"
										v-html="toast.message"
									></p>
									<button
										class="
											ml-3
											shrink-0
											text-sm
											leading-5
											font-medium
											transition
											ease-in-out
											duration-150
											focus:outline-none
										"
										:class="
											toast.type == ToastType.DENIED
												? ''
												: 'text-secondary-500 hover:text-secondary-400'
										"
										@click="primaryAction"
									>
										{{ toast.primary.label }}
									</button>
								</div>
								<div class="ml-4 shrink-0 flex">
									<button
										class="
											inline-flex
											text-gray-400
											focus:outline-none
											focus:text-gray-500
											transition
											ease-in-out
											duration-150
										"
										@click="destroy"
									>
									<XIcon
										:class="[
											toast.type == ToastType.DENIED
												? 'text-danger-300'
												: 'text-gray-400',
											'h-4 w-4',
										]"
									/>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</TransitionChild>
		</div>
	</TransitionRoot>
</template>

<script lang="ts" setup>
import {
	Dialog,
	DialogOverlay,
	DialogTitle,
	TransitionChild,
	TransitionRoot,
} from '@headlessui/vue';
import {
	CheckIcon,
	LightBulbIcon,
	ExclamationIcon,
	XIcon,
} from '@heroicons/vue/outline';
import { Toast, ToastType } from '~~/types/toast';

interface Props {
	open: boolean;
	toast: Toast;
}

const props = withDefaults(defineProps<Props>(), {
	open: false,
});

const emits = defineEmits<{
	(e: 'update:open', open: boolean): void;
}>();

const interval = ref(null);
const timeLeft = ref(0);
const speed = ref(100);
// const element: HTMLElement = ref(null);

const timeLeftPercent = computed(() => {
	return Math.round(
		(((timeLeft.value * 100) / (props.toast.timeout * 1000)) * 100) / 100
	);
});
const progressStyle = computed(() => {
	return `width: ${timeLeftPercent}%; transition: width 0.1s linear;`;
});

watch(
	() => props.open,
	(isOpen, prevIsOpen) => {
		if (isOpen && props.toast.timeout > 0) {
			timeLeft.value = props.toast.timeout * 1000;
			interval.value = setInterval(() => updateTime(), speed.value);
		}
	}
);

const updateTime = () => {
	timeLeft.value -= speed.value;
	if (timeLeft.value === 0) destroy();
};
const destroy = () => {
	// active.value = false;
	emits('update:open', false);
	clearInterval(interval.value);
};
const primaryAction = () => {
	props.toast.primary.action();
	destroy();
};
const secondaryAction = () => {
	props.toast.secondary.action();
	destroy();
};

const removeElement = (el: HTMLElement) => {
	if (typeof el.remove !== 'undefined') el.remove();
	else el.parentNode.removeChild(el);
};
</script>
