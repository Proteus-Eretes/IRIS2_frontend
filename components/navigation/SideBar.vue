<template>
	<nav class="w-64 h-full flex flex-col">
		<div class="flex items-end justify-end bg-secondary-500">
			<NuxtLink
				:to="{ path: '/', query: { regatta: regattas.selectedId } }"
			>
				<iris-logo class="text-white w-64 h-24" />
			</NuxtLink>
		</div>

		<div class="flex-grow bg-primary-700">
			<section v-if="regattas.selectedRegatta != null">
				<ul class="px-2 pt-3 pb-3 space-y-1">
					<li v-for="item in main.mainNavigation" :key="item.name">
						<side-bar-item :item="item" />
					</li>
				</ul>
			</section>

			<section v-if="regattas.selectedRegatta != null">
				<p
					class="
						pt-3
						px-5
						text-primary-500 text-sm
						font-medium
						uppercase
					"
				>
					During the competition
				</p>
				<ul class="px-2 pt-2 pb-3 space-y-1">
					<li
						v-for="item in main.competitionNavigation"
						:key="item.name"
					>
						<side-bar-item :item="item" />
					</li>
				</ul>
			</section>

			<section>
				<p
					class="
						pt-3
						px-5
						text-primary-500 text-sm
						font-medium
						uppercase
					"
				>
					IRIS admin
				</p>
				<ul class="px-2 pt-2 pb-3 space-y-1">
					<li v-for="item in main.adminNavigation" :key="item.name">
						<side-bar-item :item="item" />
					</li>
				</ul>
			</section>
		</div>
	</nav>
</template>

<script lang="ts" setup>
import SideBarItem from './SideBarItem.vue';
import IrisLogo from './IrisLogo.vue';

import { useRegattas } from '~/stores/regattas';
const regattas = useRegattas();

import { useMain } from '~/stores/index';
const main = useMain();
</script>
