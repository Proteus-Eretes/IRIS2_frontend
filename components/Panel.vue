<template>
    <div class="panel">
        <div class="panel-header">
            <h2>
                <slot name="header" />
            </h2>
        </div>

        <div class="p-2 grow overflow-y-scroll">
            <slot />
        </div>
    </div>
</template>
