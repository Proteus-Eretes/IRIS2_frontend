import { useRegattaStore } from '~~/stores/regatta';

export default defineNuxtRouteMiddleware((to, from) => {
    const regattas = useRegattaStore();
    const { regatta } = to.query;

    if (!(regatta as string) && to.path != '/regattas') {
        return navigateTo({ path: '/regattas' });
    } else {
        regattas.selectedId = regatta as string;
    }
});
