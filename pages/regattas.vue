<template>
    <div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3 p-3">
            <router-link
                v-for="regatta in regattas.allRegattas"
                :key="regatta.id"
                :to="{ path: '/', query: { regatta: regatta.id } }"
                class="block p-3 bg-white rounded-md shadow-sm"
                @click="selectRegatta(regatta.id)"
            >
                {{ regatta.name }}
            </router-link>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRegattaStore } from '~~/stores/regatta';

const regattas = useRegattaStore();

const params = useUrlSearchParams('history');
const { regatta } = params;
if (regatta && typeof regatta == 'string') {
    regattas.selectedId = null;

    delete params.regatta;
}

const selectRegatta = (id: string) => {
    regattas.selectedId = id;
};
</script>

<script lang="ts">
import { useBlockStore } from '~~/stores/block';

export default defineComponent({
    layout: 'main'
});
</script>
