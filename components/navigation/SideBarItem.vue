<template>
	<NuxtLink :to="item.to" v-slot="{ isExactActive }">
		<div
			:class="[
				isParentActive(item.to) ? 'bg-primary-800 text-white' : '',
				'rounded-md',
			]"
		>
			<div
				:class="[
					isExactActive
						? 'text-white bg-secondary-500 hover:bg-secondary-400'
						: 'text-primary-300 hover:bg-primary-600',
					'flex space-x-3 hover:text-white px-3 py-2 rounded-md text-base font-medium',
				]"
			>
				<component :is="item.icon" class="w-6 h-6" />
				<span>{{ item.name }}</span>
			</div>

			<ul v-if="item.items && isParentActive(item.to)">
				<li v-for="subItem in item.items" :key="subItem.name">
					<NuxtLink :to="subItem.to" v-slot="{ isExactActive }">
						<div
							:class="[
								isExactActive
									? 'text-white bg-secondary-500 hover:bg-secondary-400'
									: 'text-primary-300 hover:bg-primary-600',
								'hover:text-white px-3 py-2 ml-9 rounded-md text-base font-medium flex space-x-3',
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

<script lang="ts" setup>
const router = useRouter();

const isParentActive = (base: string): boolean => {
	if (base === '/') return router.currentRoute.value.fullPath == '/';
	return router.currentRoute.value.fullPath.includes(base);
};
</script>

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
	CollectionIcon,
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
		CollectionIcon,
	},
	props: ['item'],
});
</script>
