<template>
    <div class="panel">
        <div class="panel-header">
            <h2>
                <slot name="header" />
            </h2>
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
