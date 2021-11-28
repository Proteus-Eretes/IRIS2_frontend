<template>
	<div></div>
</template>

<script lang="ts" setup>
import { useBlocks } from '~~/stores/blocks';

const blocks = useBlocks();
blocks.loadBlocks();
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	layout: 'main',
});
</script>
