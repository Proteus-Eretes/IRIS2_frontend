<template>
	<div>
		<button
			type="button"
			class="button button-primary m-2"
			@click="showError('Click')"
		>
			Error
		</button>
	</div>
</template>

<script lang="ts" setup>
import { useToastService } from '~~/composables/useToastService';
const { showError } = useToastService();
</script>

<script lang="ts">
export default defineComponent({
	layout: 'main',
});
</script>
