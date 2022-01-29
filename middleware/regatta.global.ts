import { useRegattaStore } from '~~/stores/regatta';

export default defineNuxtRouteMiddleware((to, from) => {
    const regattas = useRegattaStore();
    const { regatta: regattaId } = to.query;

    if (!(regattaId as string) && to.path != '/regattas') {
        return navigateTo({ path: '/regattas' });
    } else {
        regattas.selectedId = regattaId as string;
    }
});
