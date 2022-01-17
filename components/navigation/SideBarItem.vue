<template>
	<NuxtLink
		:to="{ path: item.to, query: { regatta: regattas.selectedId } }"
		v-slot="{ isExactActive }"
	>
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
					'flex group space-x-3 hover:text-white px-3 py-2 rounded-md text-base font-medium',
				]"
			>
				<component
					:is="item.icon"
					class="w-6 h-6 text-primary-100 group-hover:text-white"
					aria-hidden="true"
				/>
				<span v-show="showText">{{ item.name }}</span>
			</div>

			<ul v-show="item.items && isParentActive(item.to) && showText">
				<li v-for="subItem in item.items" :key="subItem.name">
					<NuxtLink
						:to="{
							path: subItem.to,
							query: { regatta: regattas.selectedId },
						}"
						v-slot="{ isExactActive }"
					>
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
import { RouteItem } from '~~/types/route-item.model';

import { useRegattaStore } from '~~/stores/regatta';
const regattas = useRegattaStore();

const router = useRouter();

const isParentActive = (base: string): boolean => {
	if (base === '/') return router.currentRoute.value.fullPath == '/';
	return router.currentRoute.value.fullPath.includes(base);
};

const props = defineProps<{
	item: RouteItem;
	showText?: boolean;
}>();
</script>
