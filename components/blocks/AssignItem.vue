<template>
    <div
        class="group flex cursor-move items-center gap-2 rounded-md border border-gray-200 bg-white py-2 pr-3 text-primary-900 hover:bg-secondary-50"
    >
        <Icon
            name="ph:dots-six-vertical"
            class="mx-1 text-white group-hover:text-primary-400"
            aria-hidden="true"
        />

        <slot />

        <Icon name="ph:users-three" class="text-primary-400" aria-hidden="true" />

        <span class="text-xs font-medium">
            <slot name="number-crews" />
        </span>
    </div>
</template>
