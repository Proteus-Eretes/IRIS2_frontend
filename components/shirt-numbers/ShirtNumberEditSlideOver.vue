<template>
    <SlideOver
        :open="open"
        @update:open="$emit('update:open', $event)"
        @save="$emit('save', editorData)"
        @cancel="$emit('cancel')"
    >
        <template #header>
            <span>Edit shirt number</span>
        </template>
        <template #subheader>
            <span>Edit the shirt number of this team.</span>
        </template>

        <!-- Shirt number -->
        <div class="col-span-6">
            <label for="shirt-number" class="form-label required">
                Shirt number
            </label>
            <input
                id="shirt-number"
                type="number"
                inputmode="numeric"
                v-model="editorData.shirt_number"
                autocomplete="off"
                class="form-text"
                required
            />
        </div>
    </SlideOver>
</template>

<script lang="ts" setup>
import { NewShirtNumber } from '~~/models/crew';

interface Props {
    open: boolean;
    data: NewShirtNumber;
}

const props = withDefaults(defineProps<Props>(), {
    open: false
});

const emits = defineEmits<{
    (e: 'update:open', open: boolean): void;
    (e: 'save', data: NewShirtNumber): void;
    (e: 'cancel'): void;
}>();

const editorData: NewShirtNumber = reactive({
    ...props.data
});

const setData = (data: NewShirtNumber) => {
    Object.assign(editorData, data);
};

watch(
    () => props.open,
    (open, _) => {
        if (!open) return;

        setData(props.data);
    }
);
</script>
