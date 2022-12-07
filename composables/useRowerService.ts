import { NewRower, Rower, RowerDetail } from '~/models/rower';

const BASE_URL = '/api/rowers';

export const useRowerService = () => {
    return {
        async loadRowers(id: string) {
            const url = BASE_URL + '/get-rowers?regattaId=' + id;
            return await $fetch<Rower[]>(url);
        },
        async loadRowersByCrew(id: string) {
            const url = BASE_URL + '/get-rowers-by-crew?crewId=' + id;
            return await $fetch<Rower[]>(url);
        },
        async loadRowerDetail(id: string) {
            const url = BASE_URL + '/get-rower-detail?rowerId=' + id;
            return await $fetch<RowerDetail>(url);
        },

        async addRower(rower: NewRower) {
            const url = BASE_URL + '/add-rower';
            return await $fetch<Rower>(url, {
                method: 'POST',
                body: rower
            });
        },
        async editRower(id: string, data: NewRower) {
            const url = BASE_URL + '/edit-rower?rowerId=' + id;
            return await $fetch<Rower>(url, {
                method: 'POST',
                body: data
            });
        }
    };
};
