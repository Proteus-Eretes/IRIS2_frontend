<template>
	<div>
		<button type="button" @click="click()">Click</button>
	</div>
</template>

<script lang="ts" setup>
import { useToastService } from '~~/composables/useToastService';
const { showError } = useToastService();

const click = () => {
	showError('Click');
};
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	layout: 'main',
});
</script>
