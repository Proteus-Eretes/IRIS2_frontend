<template>
	<div class="overflow-scroll">
		<table class="min-w-full divide-y divide-gray-200">
			<thead class="bg-secondary-300">
				<tr>
					<th
						v-for="header in headers"
						:key="header"
						scope="col"
						class="px-3 py-2 text-xs"
					>
						{{ header }}
					</th>
					<th scope="col" class="relative px-3 py-2">
						<span class="sr-only">Actions</span>
					</th>
				</tr>
			</thead>
			<tbody class="bg-white divide-y divide-gray-200">
				<tr
					v-for="(item, index) in items"
					:key="item.id"
					class="hover:bg-gray-100 cursor-pointer"
				>
					<td
						v-for="header in headers"
						:key="header"
						class="px-3 py-2 whitespace-nowrap"
						@click="$emit('item-click', item)"
					>
						<slot
							:name="getSlotName(header)"
							:item="item"
							:index="index"
						/>
					</td>

					<td class="px-3 py-2 text-center">
						<Menu as="template">
							<MenuButton
								class="
									rounded-full
									text-sm
									focus:outline-none
									focus:ring-2
									focus:ring-offset-2
									focus:ring-offset-white
									focus:ring-secondary-500
								"
							>
								<span class="sr-only"> Open action menu </span>

								<DotsHorizontalIcon
									class="icon text-gray-400"
								/>
							</MenuButton>
							<Transition
								enter-active-class="transition ease-out duration-100"
								enter-from-class="opacity-0 scale-95"
								enter-to-class="opacity-100 scale-100"
								leave-active-class="transition ease-in duration-75"
								leave-from-class="opacity-100 scale-100"
								leave-to-class="opacity-0 scale-95"
							>
								<MenuItems
									class="
										origin-top-right
										absolute
										right-0
										w-48
										rounded-md
										shadow-lg
										py-1
										text-left
										bg-white
										ring-1 ring-black ring-opacity-5
										focus:outline-none
									"
								>
									<MenuItem
										v-for="action in actions"
										:key="action.id"
										v-slot="{ active }"
									>
										<a
											:class="[
												active ? 'bg-gray-100' : '',
												'icon-button text-gray-700',
											]"
											@click="
												$emit('action', {
													action,
													item,
												})
											"
										>
											<component
												:is="getIcon(action.icon)"
												class="icon text-gray-400"
											/>
											{{ action.setting }}
										</a>
									</MenuItem>

									<MenuItem v-slot="{ active }">
										<a
											:class="[
												active ? 'bg-gray-100' : '',
												'icon-button text-danger-700',
											]"
											@click="$emit('delete', item)"
										>
											<TrashIcon
												class="icon text-danger-400"
											/>
											Delete
										</a>
									</MenuItem>
								</MenuItems>
							</Transition>
						</Menu>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts" setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import {
	DotsHorizontalIcon,
	PencilIcon,
	CurrencyEuroIcon,
	ClipboardListIcon,
	TrashIcon,
} from '@heroicons/vue/outline';
import { BlockAction } from '~~/types/block.model';

interface Props {
	headers: string[]; // Worden ook als slot names gebruikt
	items: any[];
}

const props = defineProps<Props>();

const emits = defineEmits<{
	(e: 'item-click', item: any): void;
	(e: 'delete', item: any): void;
	(e: 'action', { action: BlockAction, item: any }): void;
}>();

// TODO Dit in de store?
const actions: BlockAction[] = [
	{
		link: '/blocks/assign',
		id: 'assign',
		icon: 'PencilIcon',
		setting: 'Assign events and Rounds',
	},
	{
		link: '/blocks/draw-lots',
		id: 'lots',
		icon: 'CurrencyEuroIcon',
		setting: 'Draw lots',
	},
	{
		link: '/shirt-number/assign-shirts-overview',
		id: 'shirts',
		icon: 'ClipboardListIcon',
		setting: 'Assign shirt numbers',
	},
];

// Make header name lowercase and replace whitespace with dash
const getSlotName = (header: any) => {
	const name = header.toLowerCase();
	const regex = /\s/gi;
	return name.replaceAll(regex, '-');
};

// FIXME Dit hoort gewoon als string te werken
const getIcon = (icon: string) => {
	switch (icon) {
		case 'DotsHorizontalIcon':
			return DotsHorizontalIcon;
		case 'PencilIcon':
			return PencilIcon;
		case 'CurrencyEuroIcon':
			return CurrencyEuroIcon;
		case 'ClipboardListIcon':
			return ClipboardListIcon;
	}
};
</script>
