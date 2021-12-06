<template>
	<div class="blocks__assign-event group">
		<DotsVerticalIcon
			class="icon-white group-hover:icon-primary"
		/>

		<slot />

		<UserGroupIcon class="icon-primary" />

		<slot name="number-crews" />
	</div>
</template>

<script lang="ts" setup>
import { DotsVerticalIcon, UserGroupIcon } from '@heroicons/vue/outline';
</script>
