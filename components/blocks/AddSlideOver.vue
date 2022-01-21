<template>
    <EditorSlideOver
        :open="open"
        @update:open="$emit('update:open', $event)"
        @save="
            () => {
                blocks.add(addBlockData);
                resetState();
            }
        "
    >
        <template #header>Create a new block</template>
        <template #subheader>Create a new block for this regatta.</template>

        <!-- Block number -->
        <div class="col-span-6">
            <label for="knrb" class="form-label required">Block number</label>
            <input
                id="knrb"
                type="number"
                inputmode="numeric"
                v-model="addBlockData.block"
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
                v-model="addBlockData.start_time"
                autocomplete="off"
                class="form-text"
                required
            />
        </div>
    </EditorSlideOver>
</template>

<script lang="ts" setup>
import { useBlockStore } from '~~/stores/block';

import { NewBlock } from '~~/types/block.model';

const blocks = useBlockStore();

const initialState = {
    regatta_id: '',
    block: null,
    start_time: new Date()
};

const addBlockData: NewBlock = reactive({
    ...initialState
});

const resetState = () => {
    Object.assign(addBlockData, initialState);
};

interface Props {
    open: boolean;
    regatta: string | null;
}

const props = withDefaults(defineProps<Props>(), {
    open: false
});

const emits = defineEmits<{
    (e: 'update:open', open: boolean): void;
    (e: 'save'): void;
}>();

watchEffect(() => {
    if (!props.open) return;

    if (props.regatta) addBlockData.regatta_id = props.regatta;
});
</script>
