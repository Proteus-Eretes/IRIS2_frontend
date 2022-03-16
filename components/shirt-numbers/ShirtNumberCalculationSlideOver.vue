<template>
    <SlideOver
        :open="open"
        @update:open="$emit('update:open', $event)"
        @save="$emit('save', editorData)"
        @cancel="$emit('cancel')"
    >
        <template #header>
            <span>Calculate shirt numbers</span>
        </template>
        <template #subheader>
            <span>
                Define the settings for the range of shirt numbers and calculate
                them.
            </span>
        </template>

        <!-- Blocks -->
        <div class="col-span-6 sm:col-span-5">
            <label for="blocks" class="form-label required">Blocks</label>
            <select
                name="blocks"
                id="blocks"
                v-model="editorData.blocks"
                class="form-select"
                multiple
                required
            >
                <option
                    v-for="block in blocks.allBlocks"
                    :key="block.id"
                    :value="block.id"
                >
                    Block {{ block.block }}
                </option>
            </select>
            <p class="mt-2 text-sm text-gray-500">
                Please select the blocks. You can select multiple.
            </p>
        </div>

        <!-- Minimum number -->
        <div class="col-span-6">
            <label for="min-number" class="form-label required">
                Min. number
            </label>
            <input
                id="min-number"
                type="number"
                inputmode="numeric"
                v-model="editorData.min_number"
                placeholder="1"
                autocomplete="off"
                class="form-text"
                required
            />
            <p class="mt-2 text-sm text-gray-500">
                This is the number to start counting from.
            </p>
        </div>

        <!-- Minimum number -->
        <div class="col-span-6">
            <label for="min-number" class="form-label required">
                Max. number
            </label>
            <input
                id="min-number"
                type="number"
                inputmode="numeric"
                v-model="editorData.max_number"
                placeholder="0"
                autocomplete="off"
                class="form-text"
                required
            />
            <p class="mt-2 text-sm text-gray-500">
                This is the last available number.
            </p>
        </div>

        <!-- Missing numbers -->
        <div class="col-span-6">
            <label for="min-number" class="form-label">Missing numbers</label>
            <input
                id="min-number"
                type="text"
                inputmode="numeric"
                v-model="editorData.missing"
                placeholder="1, 2, 3, 4"
                autocomplete="off"
                class="form-text"
            />
            <p class="mt-2 text-sm text-gray-500">
                Please put the missing numbers in this field with a comma
                separating the values.
            </p>
        </div>

        <!-- Gap -->
        <div class="col-span-6">
            <label for="min-number" class="form-label">Gap</label>
            <input
                id="min-number"
                type="number"
                inputmode="numeric"
                v-model="editorData.gap"
                placeholder="0"
                autocomplete="off"
                class="form-text"
            />
            <p class="mt-2 text-sm text-gray-500">
                How many numbers do you want to have between events to allow for
                extra subscriptions?
            </p>
        </div>
    </SlideOver>
</template>

<script lang="ts" setup>
import { useBlockStore } from '~~/stores/block';

import { ShirtNumberSettings } from '~~/models/crew';

const blocks = useBlockStore();

interface Props {
    open: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    open: false
});

const emits = defineEmits<{
    (e: 'update:open', open: boolean): void;
    (e: 'save', data: ShirtNumberSettings): void;
    (e: 'cancel'): void;
}>();

const editorData: ShirtNumberSettings = reactive({
    blocks: [],
    min_number: null,
    max_number: null,
    missing: '',
    gap: null
});
</script>
