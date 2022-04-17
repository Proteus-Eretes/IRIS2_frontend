export default defineNuxtRouteMiddleware((to, from) => {
    const { regatta: regattaId } = to.query;

    if (!(regattaId as string) && to.path != '/regattas') {
        return navigateTo({ path: '/regattas' });
    }
});
