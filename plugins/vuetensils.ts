import { defineNuxtPlugin } from '#app';
import { VFile, VForm } from 'vuetensils/src/components';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('VFile', VFile);
    // nuxtApp.vueApp.component('VForm', VForm);
});
