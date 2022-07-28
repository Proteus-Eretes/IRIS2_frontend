<template>
    <TransitionRoot as="template" :show="open">
        <Dialog
            as="div"
            class="fixed inset-0 z-40 overflow-hidden"
            @close="cancel"
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
                        class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    />
                </TransitionChild>
                <div class="fixed inset-y-0 right-0 flex max-w-full pl-10">
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
                                @submit.prevent=save_function
                                class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
                            >
                                <div
                                    class="h-24 border-b border-gray-200 py-6 px-4 sm:px-6"
                                >
                                    <DialogTitle
                                        class="flex h-full flex-row items-center justify-between"
                                    >
                                        <div>
                                            <h5
                                                class="text-lg font-semibold leading-7 text-gray-900"
                                            >
                                                <slot name="header" />
                                            </h5>

                                            <h6
                                                v-if="$slots['subheader']"
                                                class="text-sm text-gray-500"
                                            >
                                                <slot name="subheader" />
                                            </h6>
                                        </div>

                                        <button
                                            type="button"
                                            class="rounded-md text-gray-400 hover:text-danger-600 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:hover:ring-danger-200"
                                            @click="cancel"
                                            title="Close panel"
                                        >
                                            <span class="sr-only">
                                                Close panel
                                            </span>
                                            <ph-x
                                                class="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </DialogTitle>
                                </div>

                                <div
                                    class="relative grow space-y-6 overflow-y-scroll px-4 py-5 sm:px-6"
                                >
                                    <div class="grid grid-cols-6 gap-6">
                                        <slot />
                                    </div>
                                </div>

                                <div
                                    class="space-x-2 border-t border-gray-200 px-6 py-4 text-right"
                                >
                                    <button
                                        type="reset"
                                        class="button button-secondary w-auto"
                                        @click="cancel"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        class="button button-primary w-auto"
                                    >
                                        <slot name="save-action">Save</slot>
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
    TransitionRoot
} from '@headlessui/vue';
import { PhX } from 'phosphor-vue';

interface Props {
    open: boolean; // Say if the SlideOver should be shown
}

const props = withDefaults(defineProps<Props>(), {
    open: false
});
const emits = defineEmits<{
    (e: 'update:open', open: boolean): void;
    (e: 'save', event: any): void;
    (e: 'cancel'): void;
}>();

const cancel = () => {
    emits('update:open', false);
    emits('cancel');
};

const save_function = () => {
    emits('save', null);
    emits('update:open', false);
}
</script>
