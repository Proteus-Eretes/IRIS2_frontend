import { Club, ClubDetail } from '~/models/club';

const BASE_URL = '/api/clubs';

export const useClubService = () => {
    return {
        async loadClubs(id: string) {
            const url = BASE_URL + '/get-clubs?regattaId=' + id;
            return await $fetch<Club[]>(url);
        },
        async loadClubDetail(id: string) {
            const url = BASE_URL + '/get-club-detail?clubId=' + id;
            return await $fetch<ClubDetail>(url);
        }
    };
};
