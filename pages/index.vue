<template>
	<div>
		<button type="button" @click="showError('Dit is een error')">
			Toast
		</button>
	</div>
</template>

<script lang="ts" setup>
import { useToastService } from '~~/composables/useToastService';
const { showError } = useToastService();

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
