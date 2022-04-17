import { NewRegatta, Regatta, RegattaDetail } from '~~/models/regatta';

const BASE_URL = '/api/regattas';

export const useRegattaService = () => {
    return {
        async loadRegattas() {
            const url = BASE_URL + '/get-regattas';
            return await $fetch<Regatta[]>(url);
        },
        async loadRegattaDetail(id: string) {
            const url = BASE_URL + '/get-regatta-detail?regattaId=' + id;
            return await $fetch<RegattaDetail>(url);
        },

        async addRegatta(regatta: NewRegatta) {
            const url = BASE_URL + '/add-regatta';
            return await $fetch<Regatta>(url, {
                method: 'POST',
                body: regatta
            });
        },
        async editRegatta(id: string, data: NewRegatta) {
            const url = BASE_URL + '/edit-regatta?regattaId=' + id;
            return await $fetch<Regatta>(url, {
                method: 'POST',
                body: data
            });
        }
    };
};
