<template>
	<div>
		<button type="button" @click="toastService.showError('Dit is een error')">Toast</button>

		<!-- <Toast
			v-model:open="showToast"
			title="Titel"
			message="Hello!"
			classToast="bg-danger-600"
			classTitle="text-danger-100"
			classMessage="text-danger-200"
			classClose="text-danger-300"
			class-primary="text-danger-100"
		/> -->
	</div>
</template>

<script lang="ts" setup>
import { useToastService } from '~~/composables/useToastService';
const toastService = useToastService()

const showToast = ref(false);

const actionButton = () => {
	console.log('Action');
};
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	layout: 'main',
});
</script>
