<template>
	<NuxtLink :to="item.to" v-slot="{ isActive, isExactActive }">
		<div
			:class="[isActive ? 'bg-primary-900 text-white' : '', 'rounded-md']"
		>
			<div
				:class="[
					isExactActive ? 'bg-primary-800 text-white' : '',
					'flex space-x-3 text-primary-300 hover:bg-primary-600 hover:text-white px-3 py-2 rounded-md text-base font-medium',
				]"
			>
				<component :is="item.icon" class="w-6 h-6" />
				<span>{{ item.name }}</span>
			</div>

			<ul v-if="item.items">
				<li v-for="subItem in item.items" :key="subItem.name">
					<NuxtLink :to="subItem.to" v-slot="{ isActive }">
						<div
							:class="[
								isActive ? 'bg-primary-800 text-white' : '',
								'text-primary-300 hover:bg-primary-600 hover:text-white px-3 py-2 ml-9 rounded-md text-base font-medium flex space-x-3',
							]"
						>
							{{ subItem.name }}
						</div>
					</NuxtLink>
				</li>
			</ul>
		</div>
	</NuxtLink>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
	TemplateIcon,
	ViewGridIcon,
	UserGroupIcon,
	CalendarIcon,
	CurrencyEuroIcon,
	ClipboardListIcon,
	ShareIcon,
	MicrophoneIcon,
} from '@heroicons/vue/outline';

export default defineComponent({
	components: {
		TemplateIcon,
		ViewGridIcon,
		UserGroupIcon,
		CalendarIcon,
		CurrencyEuroIcon,
		ClipboardListIcon,
		ShareIcon,
		MicrophoneIcon,
	},
	props: ['item'],
});
</script>
