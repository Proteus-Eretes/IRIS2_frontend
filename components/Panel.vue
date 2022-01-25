<template>
    <div class="panel">
        <div class="panel-header">
            <h2>
                <slot name="header" />
            </h2>
        </div>

        <div class="grow overflow-y-scroll p-2">
            <slot />
        </div>
    </div>
</template>
