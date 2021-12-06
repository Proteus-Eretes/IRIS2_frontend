<template>
	<div class="sliding-container">
		<sliding-panel
			:index="0"
			:activePanel="activePanel"
			@focus="activePanel = 0"
		>
			<template #header>Blocks</template>

			<div v-for="block in blocks.getAllBlocks" :key="block.id">
				<router-link
					:to="{ query: { block: block.id } }"
					@click="selectBlock(block)"
				>
					{{ block.block }}
				</router-link>
			</div>
		</sliding-panel>

		<sliding-panel
			:index="1"
			:activePanel="activePanel"
			@close="activePanel = 0"
			@focus="activePanel = 1"
		>
			<template #header>
				Block
				{{
					blocks.getSelectedBlock != null
						? blocks.getSelectedBlock.block
						: ''
				}}
			</template>

			<template #header-buttons>
				<span
					class="
						rounded-full
						bg-white
						text-secondary-500
						font-medium
						text-sm
						px-2
					"
				>
					{{
						blocks.getSelectedBlock != null
							? blocks.getSelectedBlock.status
							: ''
					}}
				</span>
			</template>

			<div>
				<p>
					{{
						blocks.getSelectedBlock != null
							? blocks.getSelectedBlock.id
							: ''
					}}
				</p>
			</div>
		</sliding-panel>

		<sliding-panel
			:index="2"
			:activePanel="activePanel"
			@close="activePanel = 1"
			@focus="activePanel = 2"
		>
			<template #header>Test</template>

			Hey
		</sliding-panel>
	</div>
</template>

<script lang="ts" setup>
import { useBlocks } from '~~/stores/blocks';
import { Block } from '~~/types/block.model';

const blocks = useBlocks();
blocks.loadBlocks();

// The panel that is last opened
const activePanel = ref(0);

const router = useRouter();
const { block, field, crew, rower } = router.currentRoute.value.query;
if (block && typeof block == 'string') {
	blocks.selectBlock(block);
	activePanel.value = 1;
}

const selectBlock = (block: Block) => {
	router.push({
		path: router.currentRoute.value.path,
		query: { block: block.id, ...router.currentRoute.value.query },
	});

	activePanel.value = 1;
	blocks.selectBlock(block.id);
};
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	layout: 'main',
});
</script>
