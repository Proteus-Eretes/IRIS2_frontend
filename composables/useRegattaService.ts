import { NewRegatta, Regatta, RegattaDetail } from '~~/models/regatta';

const BASE_URL = 'http://localhost:8080/regattas';

export const useRegattaService = () => {
    return {
        async loadRegattas() {
            return await $fetch<{regattas: Regatta[]}>(BASE_URL, {
                'headers': {
                    'authorization': 'bearer ' + localStorage.getItem('IdToken'),
                }
            });
        },
        async loadRegattaDetail(id: string) {
            const url = BASE_URL + '/view/' + id;
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
