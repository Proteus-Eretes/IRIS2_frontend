<template>
    <TransitionRoot as="template" :show="active">
        <div class="fixed top-0 right-0 z-50 overflow-hidden">
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
                        'w-screen p-3'
                    ]"
                >
                    <div
                        v-if="active && !toast.primary"
                        :class="[
                            toast.type == ToastType.DENIED
                                ? 'bg-danger-600'
                                : 'bg-white',
                            'relative overflow-hidden rounded-lg p-3 shadow-lg'
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
                                        'text-sm font-medium leading-5'
                                    ]"
                                >
                                    {{ toast.title }}
                                </p>
                                <p
                                    :class="[
                                        toast.type == ToastType.DENIED
                                            ? 'text-danger-200'
                                            : 'text-gray-500',
                                        toast.title ? 'mt-1' : ''
                                    ]"
                                    class="text-sm leading-5"
                                    v-html="toast.message"
                                ></p>
                            </div>
                            <div class="ml-4 shrink-0">
                                <button
                                    class="inline-flex text-gray-400 transition duration-150 ease-in-out focus:text-gray-500 focus:outline-none"
                                    @click="destroy"
                                >
                                    <ph-x
                                        :class="[
                                            toast.type == ToastType.DENIED
                                                ? 'text-danger-300'
                                                : 'text-gray-400',
                                            'h-4 w-4'
                                        ]"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="active && toast.primary && toast.secondary"
                        :class="[
                            toast.type == ToastType.DENIED
                                ? 'bg-danger-600'
                                : 'bg-white',
                            'rounded-lg shadow-lg'
                        ]"
                    >
                        <div class="shadow-xs flex rounded-lg">
                            <div class="flex grow items-center p-3">
                                <ToastIcon class="mr-4" :type="toast.type" />
                                <div class="w-full">
                                    <p
                                        v-if="toast.title"
                                        :class="[
                                            toast.type == ToastType.DENIED
                                                ? 'text-danger-100'
                                                : 'text-gray-900',
                                            'text-sm font-medium leading-5'
                                        ]"
                                    >
                                        {{ toast.title }}
                                    </p>
                                    <p
                                        :class="[
                                            toast.type == ToastType.DENIED
                                                ? 'text-danger-200'
                                                : 'text-gray-500',
                                            toast.title ? 'mt-1' : ''
                                        ]"
                                        class="text-sm leading-5"
                                        v-html="toast.message"
                                    ></p>
                                </div>
                            </div>
                            <div class="flex border-l border-gray-200">
                                <div class="flex flex-col">
                                    <div
                                        class="flex grow border-b border-gray-200"
                                    >
                                        <button
                                            class="flex w-full items-center justify-center rounded-tr-lg border border-transparent px-4 py-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none"
                                            :class="[
                                                toast.type == ToastType.DENIED
                                                    ? 'text-danger-100'
                                                    : 'focus:shadow-outline-blue text-secondary-500 hover:text-secondary-400'
                                            ]"
                                            @click="primaryAction"
                                        >
                                            {{ toast.primary.label }}
                                        </button>
                                    </div>
                                    <div class="flex grow">
                                        <button
                                            class="flex w-full items-center justify-center rounded-br-lg border border-transparent px-4 py-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none"
                                            :class="
                                                toast.type == ToastType.DENIED
                                                    ? ''
                                                    : 'focus:shadow-outline-blue text-gray-700 hover:text-gray-500 active:bg-gray-50 active:text-gray-800'
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
                        v-if="active && toast.primary && !toast.secondary"
                        :class="[
                            toast.type == ToastType.DENIED
                                ? 'bg-danger-600'
                                : 'bg-white',
                            'rounded-lg shadow-lg'
                        ]"
                    >
                        <div class="shadow-xs overflow-hidden rounded-lg p-4">
                            <div class="flex items-center">
                                <ToastIcon class="mr-4" :type="toast.type" />
                                <div class="flex grow justify-between">
                                    <p
                                        class="grow text-sm leading-5"
                                        v-html="toast.message"
                                    ></p>
                                    <button
                                        class="ml-3 shrink-0 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none"
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
                                <div class="ml-4 flex shrink-0">
                                    <button
                                        class="inline-flex text-gray-400 transition duration-150 ease-in-out focus:text-gray-500 focus:outline-none"
                                        @click="destroy"
                                    >
                                        <ph-x
                                            :class="[
                                                toast.type == ToastType.DENIED
                                                    ? 'text-danger-300'
                                                    : 'text-gray-400',
                                                'h-4 w-4'
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
import { TransitionChild, TransitionRoot } from '@headlessui/vue';
import { PhX } from 'phosphor-vue';

import { Toast, ToastType } from '~~/models/toast';

const active = useState<boolean>('showToast', () => false);
const toast = useState<Toast>('toast');

const interval = ref(null);
const timeLeft = ref(0);
const speed = ref(100);

const timeLeftPercent = computed(() => {
    return Math.round(
        (((timeLeft.value * 100) / (toast.value.timeout * 1000)) * 100) / 100
    );
});
const progressStyle = computed(() => {
    return `width: ${timeLeftPercent}%; transition: width 0.1s linear;`;
});

watch(
    () => active.value,
    (isOpen, prevIsOpen) => {
        if (isOpen && toast.value.timeout > 0) {
            timeLeft.value = toast.value.timeout * 1000;
            interval.value = setInterval(() => updateTime(), speed.value);
        }
    }
);

const updateTime = () => {
    timeLeft.value -= speed.value;
    if (timeLeft.value === 0) destroy();
};
const destroy = () => {
    active.value = false;
    // emits('update:open', false);
    clearInterval(interval.value);
};
const primaryAction = () => {
    toast.value.primary.action();
    destroy();
};
const secondaryAction = () => {
    toast.value.secondary.action();
    destroy();
};

const removeElement = (el: HTMLElement) => {
    if (typeof el.remove !== 'undefined') el.remove();
    else el.parentNode.removeChild(el);
};
</script>
