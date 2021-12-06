<template>
	<div>
		<div class="grid grid-cols-3 gap-3 p-3">
			<router-link
				v-for="regatta in regattas.getRegettas"
				:key="regatta.id"
				:to="{ path: '/', query: { regatta: regatta.id } }"
				class="block p-3 bg-white rounded-md shadow-sm"
				@click="regattas.selectRegatta(regatta.id)"
			>
				{{ regatta.name }}
			</router-link>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useRegattas } from '~~/stores/regattas';

const regattas = useRegattas();
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	layout: 'main',
});
</script>
