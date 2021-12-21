<template>
	<TransitionRoot as="template" :show="open">
		<Dialog
			as="div"
			class="fixed inset-0 overflow-hidden z-50"
			@close="$emit('update:open', false)"
		>
			<div class="absolute inset-0 overflow-hidden">
				<TransitionChild
					as="template"
					enter="ease-in-out duration-300"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="ease-in-out duration-300"
					leave-from="opacity-100"
					leave-to="opacity-0"
				>
					<DialogOverlay
						class="
							absolute
							inset-0
							bg-gray-500 bg-opacity-75
							transition-opacity
						"
					/>
				</TransitionChild>
				<div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
					<TransitionChild
						as="template"
						enter="transition ease-in-out duration-300 sm:duration-500"
						enter-from="translate-x-full"
						enter-to="translate-x-0"
						leave="transition ease-in-out duration-300 sm:duration-500"
						leave-from="translate-x-0"
						leave-to="translate-x-full"
					>
						<div class="relative w-screen max-w-md">
							<form
								@submit.prevent="
									$emit('save');
									$emit('update:open', false);
								"
								class="
									h-full
									flex flex-col
									bg-white
									shadow-xl
									overflow-y-scroll
								"
							>
								<div class="py-6 px-4 sm:px-6 h-24
										border-b border-gray-200">
									<DialogTitle
										class="
											flex flex-row
											items-center
											justify-between
										"
									>
										<div>
											<h5
												class="
													text-lg
													font-semibold
													leading-7
													text-gray-900
												"
											>
												<slot name="header" />
											</h5>

											<h6 class="text-sm text-gray-500">
											<slot name="subheader" />
											</h6>
										</div>

										<button
											type="button"
											class="
												rounded-md
												text-gray-400
												hover:text-danger-600
												focus:outline-none
												focus:ring-2
												focus:ring-gray-200
												focus:hover:ring-danger-200
											"
											@click="$emit('update:open', false)"
										>
											<span class="sr-only">
												Close panel
											</span>
											<XIcon
												class="h-6 w-6"
												aria-hidden="true"
											/>
										</button>
									</DialogTitle>
								</div>

								<div
									class="
										relative
										grow
										overflow-y-scroll
										px-4
										sm:px-6
									"
								>
									<slot />
								</div>

								<div
									class="
										px-6
										py-4
										border-t border-gray-200
										text-right
										space-x-2
									"
								>
									<button
										type="reset"
										class="button button-secondary"
										@click="$emit('update:open', false)"
									>
										Cancel
									</button>

									<button
										type="submit"
										class="button button-primary"
									>
										Save
									</button>
								</div>
							</form>
						</div>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
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
import { XIcon } from '@heroicons/vue/outline';

interface Props {
	open: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	open: false,
});

const emits = defineEmits<{
	(e: 'save'): void;
	(e: 'update:open', open: boolean): void;
	(e: 'close'): void;
}>();
</script>
