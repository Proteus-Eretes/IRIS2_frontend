<template>
	<div>
		<SlidingContainer>
			<SlidingPanel>
				<template #header>Blocks</template>

				<div v-for="block in blocks.getAllBlocks" :key="block.id">
					{{ block.block }}
				</div>
			</SlidingPanel>

			<div>
				Hey
			</div>
		</SlidingContainer>
	</div>
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
