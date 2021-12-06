<template>
	<div>
		<div class="sliding-container">
			<sliding-panel
				:index="0"
				:activePanel="activePanel"
				@focus="activePanel = 0"
			>
				<template #header>Blocks</template>

				<div>
					<div v-for="block in blocks.getAllBlocks" :key="block.id">
						<button type="button" @click="selectBlock(block)">
							{{ block.block }}
						</button>
					</div>

					<button type="button" @click="showAddBlock = true">
						Add Block
					</button>
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

				<div v-if="blocks.getSelectedBlockDetail && blocks.getSelectedBlockDetail.fields">
					<div v-for="field in blocks.getSelectedBlockDetail.fields" :key="field.id">
						<!-- <button type="button" @click="selectBlock(block)"> -->
							{{ field.round.name }}
						<!-- </button> -->
					</div>
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

		<slide-over v-model:open="showAddBlock">
			<template #header>Title</template>

			Hey
		</slide-over>
	</div>
</template>

<script lang="ts" setup>
import { useBlocks } from '~~/stores/blocks';
import { Block } from '~~/types/block.model';

const blocks = useBlocks();
blocks.loadBlocks();
blocks.loadBlockDetails();

// The panel that is last opened
const activePanel = ref(0);
const showAddBlock = ref(false);

const router = useRouter();
const { block, field, crew, rower } = router.currentRoute.value.query;
if (block && typeof block == 'string') {
	blocks.selectBlock(block);
	activePanel.value = 1;
}

// Remove block
const selectBlock = (block: Block) => {
	router.replace({
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
