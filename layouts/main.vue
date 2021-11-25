<template>
	<div class="min-h-screen flex flex-row">
		<aside>
			<Sidebar />
		</aside>

		<div class="flex-grow min-h-screen flex flex-col">
			<NavigationBar />

			<main class="bg-gray-50 flex-grow">
				<slot />
			</main>
		</div>
	</div>
</template>
