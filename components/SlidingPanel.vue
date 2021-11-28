<template>
	<div class="sliding-panel">
		<h2
			class="
				uppercase
				font-medium
                text-sm
				rounded-t-md
				text-white
				bg-secondary-400
				px-3
				py-2
			"
		>
			<slot name="header" />
		</h2>

		<div class="p-2 flex-grow overflow-scroll">
			<slot />
		</div>
	</div>
</template>
