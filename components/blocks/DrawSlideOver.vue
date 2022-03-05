<template>
    <SlideOver :open="open" @update:open="$emit('update:open', $event)">
        <template #header>
            Draw block
            {{ blocks.selectedBlock ? blocks.selectedBlock.block : '' }}
        </template>
        <template #subheader>Draw the lots for this block.</template>

        <div class="col-span-6 -mb-3 font-semibold">Import</div>

        <div class="col-span-3">
            <button type="button" class="button button-primary">
                Previous regatta
            </button>
        </div>

        <div class="col-span-3">
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
            <select name="default" id="default" class="form-select"></select>
        </div>

        <template v-for="field in events.allFieldsByBlock()">
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
