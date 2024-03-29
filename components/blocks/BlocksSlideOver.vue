<template>
    <SlideOver
        :open="open"
        @update:open="$emit('update:open', $event)"
        @save="$emit('save', editorData)"
        @cancel="$emit('cancel')"
    >
        <template #header>
            <span v-if="state == SlideOverState.ADD">Create a new block</span>
            <span v-else>Edit this block</span>
        </template>
        <template #subheader>
            <span v-if="state == SlideOverState.ADD">
                Create a new block for this regatta.
            </span>
        </template>

        <!-- Block number -->
        <div class="col-span-6">
            <label for="knrb" class="form-label required">Block number</label>
            <input
                id="knrb"
                type="number"
                inputmode="numeric"
                v-model="editorData.block"
                autocomplete="off"
                class="form-text"
                required
            />
        </div>

        <!-- Start date + time -->
        <div class="col-span-6">
            <label for="knrb" class="form-label required">Start time</label>
            <input
                id="knrb"
                type="datetime-local"
                v-model="start_time"
                autocomplete="off"
                class="form-text"
                required
            />
        </div>
    </SlideOver>
</template>

<script lang="ts" setup>
import { NewBlock } from '~~/models/block';
import { SlideOverState } from '~~/models/slide-over-state';

import { useDateFormatter } from '~~/composables/useDateFormatter';
const { formatInputTime, getInputTime } = useDateFormatter();

interface Props {
    open: boolean;
    state: SlideOverState;
    data: NewBlock;
}

const props = withDefaults(defineProps<Props>(), {
    open: false
});

const emits = defineEmits<{
    (e: 'update:open', open: boolean): void;
    (e: 'save', data: NewBlock): void;
    (e: 'cancel'): void;
}>();

const editorData: NewBlock = reactive({
    ...props.data
});

const setData = (data: NewBlock) => {
    Object.assign(editorData, data);
};

watch(
    () => props.open,
    (open, _) => {
        if (!open) return;

        setData(props.data);
    }
);

const start_time = computed({
    get() {
        return formatInputTime(editorData.start_time);
    },
    set(value: string) {
        editorData.start_time = getInputTime(value);
    }
});
</script>
