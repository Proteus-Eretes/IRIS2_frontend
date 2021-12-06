<template>
	<div class="blocks__assign-event group">
		<DotsVerticalIcon
			class="icon-white group-hover:icon-primary"
			aria-hidden="true"
		/>

		<slot />

		<UserGroupIcon class="icon-primary" aria-hidden="true" />

		<slot name="number-crews" />
	</div>
</template>

<script lang="ts" setup>
import { DotsVerticalIcon, UserGroupIcon } from '@heroicons/vue/outline';
</script>
