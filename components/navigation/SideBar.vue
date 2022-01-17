<template>
	<nav
		:class="[
			sideBarCollapsed ? 'w-side-bar-collapse' : 'w-side-bar',
			'h-full flex flex-col',
		]"
	>
		<div class="flex items-end justify-end bg-secondary-500">
			<NuxtLink
				:to="{ path: '/', query: { regatta: regattas.selectedId } }"
			>
				<NavigationIrisLogo
					v-if="!sideBarCollapsed"
					class="text-white w-64 h-24"
				/>
				<div v-else class="w-16 h-24" />
			</NuxtLink>
		</div>

		<div class="grow bg-primary-700">
			<section v-if="regattas.selectedRegatta != null">
				<ul class="px-2 pt-3 pb-3 space-y-1">
					<li v-for="item in main.mainNavigation" :key="item.name">
						<NavigationSideBarItem
							:item="item"
							:show-text="!sideBarCollapsed"
						/>
					</li>
				</ul>
			</section>

			<section v-if="regattas.selectedRegatta != null">
				<p
					v-if="!sideBarCollapsed"
					class="pt-3 px-5 text-primary-500 text-sm font-medium uppercase"
				>
					During the competition
				</p>
				<ul class="px-2 pt-2 pb-3 space-y-1">
					<li
						v-for="item in main.competitionNavigation"
						:key="item.name"
					>
						<NavigationSideBarItem
							:item="item"
							:show-text="!sideBarCollapsed"
						/>
					</li>
				</ul>
			</section>

			<section>
				<p
					v-if="!sideBarCollapsed"
					class="pt-3 px-5 text-primary-500 text-sm font-medium uppercase"
				>
					IRIS admin
				</p>
				<ul class="px-2 pt-2 pb-3 space-y-1">
					<li v-for="item in main.adminNavigation" :key="item.name">
						<NavigationSideBarItem
							:item="item"
							:show-text="!sideBarCollapsed"
						/>
					</li>
				</ul>
			</section>

			<section>
				<ul class="px-2 pt-2 space-y-1">
					<li>
						<button
							@click="toggleSideBar()"
							:class="[
								'flex group w-full space-x-3 text-primary-500 hover:text-white hover:bg-primary-600 px-3 py-2 rounded-md text-base font-medium',
							]"
						>
							<component
								:is="
									sideBarCollapsed
										? 'ph-caret-double-right'
										: 'ph-caret-double-left'
								"
								class="w-6 h-6 text-primary-500 group-hover:text-white"
								aria-hidden="true"
							/>
							<span v-show="!sideBarCollapsed">Collapse</span>
						</button>
					</li>
				</ul>
			</section>
		</div>
	</nav>
</template>

<script lang="ts" setup>
import {
	PhGauge,
	PhSquaresFour,
	PhUsersThree,
	PhCalendarBlank,
	PhCoinVertical,
	PhListNumbers,
	PhExport,
	PhMicrophone,
	PhClipboardText,
	PhCaretDoubleLeft,
} from 'phosphor-vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

import { useRegattaStore } from '~~/stores/regatta';
const regattas = useRegattaStore();

import { useMainStore } from '~/stores/index';
const main = useMainStore();

const sideBarCollapsed = ref(false);
const toggleSideBar = useToggle(sideBarCollapsed);

onMounted(() => {
	const breakpoints = useBreakpoints(breakpointsTailwind);
	const smallerLg = breakpoints.isSmaller('lg');

	if (smallerLg) sideBarCollapsed.value = true;
});
</script>
