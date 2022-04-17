<template>
    <SlideOver :open="open" @update:open="$emit('update:open', $event)">
        <template #header> Draw block </template>
        <template #subheader>Draw the lots for certain blocks.</template>

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
                    :disabled="block.status >= BlockStatus.START_ORDER"
                    :title="
                        block.status >= BlockStatus.START_ORDER ? 'Drawn' : ''
                    "
                >
                    Block {{ block.block }}
                </option>
            </select>
            <p class="mt-2 text-sm text-gray-500">
                Please select the blocks. You can select multiple.
            </p>
        </div>

        <div class="col-span-6 py-3">
            <hr class="border-t border-gray-200" />
        </div>

        <div class="col-span-6 -mb-3 font-semibold">Import</div>

        <div class="col-span-3">
            <!-- TODO: -->
            <button type="button" class="button button-primary">
                Previous regatta
            </button>
        </div>

        <div class="col-span-3">
            <!-- TODO: -->
            <button type="button" class="button button-primary">
                Results previous round
            </button>
        </div>

        <div class="col-span-6 py-3">
            <hr class="border-t border-gray-200" />
        </div>

        <div class="col-span-6 -mb-3 font-semibold">Custom draw</div>

        <div class="col-span-6 mb-3 sm:col-span-4">
            <label for="default" class="form-label">Default settings</label>
            <select name="default" id="default" class="form-select">
                <!-- FIXME: misschien beter als Enum -->
                <option value="random">Random</option>
                <option value="crew last year">
                    Crew results - Previous year
                </option>
                <option value="club last year">
                    Club results - Previous year
                </option>
                <option value="input">Input results</option>
            </select>
        </div>

        <template v-for="field in allFields">
            <div class="col-span-6 sm:col-span-4">
                <label :for="field.id" class="form-label">
                    {{ events.getEventById(field.event_id).code }}
                </label>

                <select :name="field.id" :id="field.id" class="form-select">
                    <option :value="null">- default -</option>
                </select>
            </div>
        </template>

        <template #save-action>Draw lots</template>
    </SlideOver>
</template>

<script lang="ts" setup>
import { useBlockStore } from '~~/stores/block';
import { useEventStore } from '~~/stores/event';

import { BlockStatus } from '~~/models/block';
import { Field } from '~~/models/event';

const blocks = useBlockStore();
const events = useEventStore();

interface Props {
    open: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    open: false
});

const emits = defineEmits<{
    (e: 'update:open', open: boolean): void;
    (e: 'save', event: any): void;
    (e: 'cancel'): void;
}>();

//FIXME:
const editorData = reactive({
    blocks: [],
    min_number: null,
    max_number: null,
    missing: '',
    gap: null
});

// Get all fields from the current block selection
const allFields = computed<Field[]>(() => {
    return editorData.blocks.flatMap((b) => events.allFieldsByBlock(b));
});
</script>

<style>
.vts-file__dropzone {
    display: flex;
    justify-content: center;
    border: 3px dashed skyblue;
    border-radius: 5px;
    padding: 30px;
    background: lightblue;
    transition: 0.2s ease background-color;
}

.vts-file--droppable .vts-file__dropzone {
    background: skyblue;
}

.vts-file--selected .vts-file__dropzone {
    background: greenyellow;
}
</style>
