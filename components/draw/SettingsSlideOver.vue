<template>
    <SlideOver :open="open" @update:open="$emit('update:open', $event)">
        <template #header>Update draw settings</template>
        <template #subheader>
            Update the settings used when drawing lots for the regatta.
        </template>

        <!-- Maximum crews type -->
        <div class="col-span-6 sm:col-span-4">
            <label for="event" class="form-label required">
                Maximum Crews Type
            </label>
            <select
                id="event"
                v-model="editorData.maximumCrewsType"
                class="form-select"
                required
            >
                <!-- FIXME: Where to get these values? -->
                <option :value="1">Absolute</option>
                <option :value="2">Percentage</option>
                <option :value="3">Percentage matched Crews</option>
                <option :value="4">Above a certain ranking percentage</option>
            </select>
        </div>

        <!-- Percentage base -->
        <div class="col-span-6 sm:col-span-4">
            <label for="event" class="form-label required">
                Base Crew Percentage
            </label>
            <select
                id="event"
                v-model="editorData.baseCrewPercentageOn"
                class="form-select"
                required
            >
                <!-- FIXME: misschien beter als Enum -->
                <option value="this year">This year</option>
                <option value="last year">Previous year</option>
            </select>
        </div>

        <!-- Maximum Crews number -->
        <div class="col-span-6">
            <label for="for8" class="form-label required">
                Maximum Crews number
            </label>
            <input
                id="for8"
                type="number"
                inputmode="numeric"
                v-model="editorData.maximumCrewsNumber"
                autocomplete="off"
                class="form-text"
                required
            />
        </div>

        <div class="col-span-6 py-3">
            <hr class="border-t border-gray-200" />
        </div>

        <div class="col-span-6 -mb-3 font-semibold">Matching rowers</div>

        <!-- 8+ -->
        <div class="col-span-6">
            <label for="for8" class="form-label required">8+</label>
            <input
                id="for8"
                type="number"
                inputmode="numeric"
                v-model="editorData.matchingRowersFor8"
                autocomplete="off"
                class="form-text"
                required
            />
        </div>

        <!-- 4+ -->
        <div class="col-span-6">
            <label for="for4" class="form-label required">4+</label>
            <input
                id="for4"
                type="number"
                inputmode="numeric"
                v-model="editorData.matchingRowersFor4"
                autocomplete="off"
                class="form-text"
                required
            />
        </div>

        <!-- 2+ -->
        <div class="col-span-6">
            <label for="for2" class="form-label required">2+</label>
            <input
                id="for2"
                type="number"
                inputmode="numeric"
                v-model="editorData.matchingRowersFor2"
                autocomplete="off"
                class="form-text"
                required
            />
        </div>

        <!-- 1+ -->
        <div class="col-span-6">
            <label for="for1" class="form-label required">1+</label>
            <input
                id="for1"
                type="number"
                inputmode="numeric"
                v-model="editorData.matchingRowersFor1"
                autocomplete="off"
                class="form-text"
                required
                disabled
            />
        </div>

        <div class="col-span-6 py-3">
            <hr class="border-t border-gray-200" />
        </div>

        <div class="col-span-6 -mb-3 font-semibold">Club settings</div>

        <!-- Exclude combination -->
        <div class="col-span-6 flex items-start">
            <div class="flex h-5 items-center">
                <input
                    id="excludeCombination"
                    type="checkbox"
                    v-model="editorData.previousYearClubsExcludeCombiationCrews"
                    class="form-checkbox"
                />
            </div>
            <div class="ml-3 text-sm">
                <label for="excludeCombination" class="form-label">
                    Exclude combination crews
                </label>
                <!-- TODO: get a description -->
                <p class="text-gray-500">This is a description.</p>
            </div>
        </div>

        <template #save-action>Draw lots</template>
    </SlideOver>
</template>

<script lang="ts" setup>
import { LotterySettings } from '~~/models/regatta';

interface Props {
    open: boolean;
    data?: LotterySettings;
}

const props = withDefaults(defineProps<Props>(), {
    open: false,
    data: () => {
        return {
            maximumCrewsType: '',
            baseCrewPercentageOn: '',
            maximumCrewsNumber: null,
            excludeCombinationCrews: null,
            matchingRowersFor8: null,
            matchingRowersFor4: null,
            matchingRowersFor2: null,
            matchingRowersFor1: null,
            previousYearClubsExcludeCombiationCrews: true
        };
    }
});

const emits = defineEmits<{
    (e: 'update:open', open: boolean): void;
    (e: 'save', event: LotterySettings): void;
    (e: 'cancel'): void;
}>();

const editorData: LotterySettings = reactive({
    ...props.data
});

const setData = (data: LotterySettings) => {
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
