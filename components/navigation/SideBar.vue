<template>
	<nav class="w-side-bar h-full flex flex-col">
		<div class="flex items-end justify-end bg-secondary-500">
			<NuxtLink
				:to="{ path: '/', query: { regatta: regattas.selectedId } }"
			>
				<NavigationIrisLogo class="text-white w-64 h-24" />
			</NuxtLink>
		</div>

		<div class="grow bg-primary-700">
			<section v-if="regattas.selectedRegatta != null">
				<ul class="px-2 pt-3 pb-3 space-y-1">
					<li v-for="item in main.mainNavigation" :key="item.name">
						<NavigationSideBarItem :item="item" />
					</li>
				</ul>
			</section>

			<section v-if="regattas.selectedRegatta != null">
				<p
					class="pt-3 px-5 text-primary-500 text-sm font-medium uppercase"
				>
					During the competition
				</p>
				<ul class="px-2 pt-2 pb-3 space-y-1">
					<li
						v-for="item in main.competitionNavigation"
						:key="item.name"
					>
						<NavigationSideBarItem :item="item" />
					</li>
				</ul>
			</section>

			<section>
				<p
					class="pt-3 px-5 text-primary-500 text-sm font-medium uppercase"
				>
					IRIS admin
				</p>
				<ul class="px-2 pt-2 pb-3 space-y-1">
					<li v-for="item in main.adminNavigation" :key="item.name">
						<NavigationSideBarItem :item="item" />
					</li>
				</ul>
			</section>
		</div>
	</nav>
</template>

<script lang="ts" setup>
import { useRegattaStore } from '~~/stores/regatta';
const regattas = useRegattaStore();

import { useMainStore } from '~/stores/index';
const main = useMainStore();
</script>
