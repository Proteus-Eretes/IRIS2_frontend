<template>
    <div class="panel">
        <div class="panel-header">
            <h2>
                <slot name="header" />
            </h2>

            <span>
                <span
                    v-show="$slots['header-status']"
                    class="pill bg-white text-secondary-500"
                >
                    <slot name="header-status" />
                </span>
                <span v-show="$slots['header-button']">
                    <slot name="header-button" />
                </span>
            </span>
        </div>

        <div :class="['grow overflow-y-scroll', hasPadding ? 'p-2' : '']">
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    hasPadding?: boolean; // Switch on the padding of the body of the Panel
}

const props = withDefaults(defineProps<Props>(), {
    hasPadding: false
});
</script>
