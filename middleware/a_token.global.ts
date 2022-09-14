export default defineNuxtRouteMiddleware((to, from) => {
    const { token: token } = to.query;

    if (token as string) {
        localStorage.setItem("IdToken", token as string);
    }
});
