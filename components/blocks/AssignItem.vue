<template>
	<div class="blocks__assign-event group">
		<DotsVerticalIcon
			class="w-4 h-4 text-white group-hover:text-primary-500"
		/>

		<slot />

		<UserGroupIcon class="w-4 h-4 text-primary-400" />

		<slot name="number-crews" />
	</div>
</template>

<script lang="ts" setup>
import { DotsVerticalIcon, UserGroupIcon } from '@heroicons/vue/outline';
</script>
