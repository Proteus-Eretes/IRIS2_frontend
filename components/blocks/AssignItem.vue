<template>
	<div class="blocks__assign-event group">
		<DotsVerticalIcon
			class="icon text-white group-hover:text-primary-300"
			aria-hidden="true"
		/>

		<slot />

		<UserGroupIcon class="icon text-primary-300" aria-hidden="true" />

		<slot name="number-crews" />
	</div>
</template>

<script lang="ts" setup>
import { DotsVerticalIcon, UserGroupIcon } from '@heroicons/vue/outline';
</script>
