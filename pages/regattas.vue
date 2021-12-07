<template>
	<div>
		<div class="grid grid-cols-3 gap-3 p-3">
			<router-link
				v-for="regatta in regattas.allRegattas"
				:key="regatta.id"
				:to="{ path: '/', query: { regatta: regatta.id } }"
				class="block p-3 bg-white rounded-md shadow-sm"
				@click="regattas.selectedId = regatta.id"
			>
				{{ regatta.name }}
			</router-link>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useRegattas } from '~~/stores/regattas';

const regattas = useRegattas();

const params = useUrlSearchParams('history');
const { regatta } = params;
if (regatta && typeof regatta == 'string') {
	regattas.selectedId = null;

	delete params.regatta;
}
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	layout: 'main',
});
</script>
