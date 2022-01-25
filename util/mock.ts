import { Block, BlockStatus } from '~~/types/block.model';
import { Club, ClubDetail } from '~/types/club.model';
import {
    Crew,
    CrewDetail,
    CrewStatus,
    Fine,
    Team,
    TeamDetail,
    TeamResultStatus
} from '~/types/crew.model';
import {
    Event,
    EventDetail,
    EventStatus,
    Field,
    FieldDetail
} from '~~/types/event.model';
import { Location, LocationType } from '~/types/location.model';
import { Regatta, RegattaDetail, RegattaType } from '~~/types/regatta.model';
import { Result } from '~/types/result.model';
import { Round } from '~~/types/round.model';
import { Gender, Rower, RowerDetail, RowerRole } from '~/types/rower.model';
import { User } from '~/types/user.model';

export const blocksMock: Block[] = [
    {
        id: '11ec-4c5c-7591a1ca-a089-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a545',
        block: 1,
        start_time: new Date('2021-11-28T13:00:00+01:00'),
        status: BlockStatus.SHIRT_NUMBERS_ASSIGNED
    },
    {
        id: '11ec-4fe5-9d68da06-a373-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a545',
        block: 2,
        start_time: new Date('2021-11-28T12:53:00+01:00'),
        status: BlockStatus.EVENTS_ASSIGNED
    },
    {
        id: '11ec-4fe5-a92bc36c-bd79-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        block: 3,
        start_time: new Date('2021-11-28T13:43:00+01:00'),
        status: BlockStatus.CREATED
    },
    {
        id: '11ec-4fe5-b2954964-9edf-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        block: 10,
        start_time: new Date('2021-11-28T09:53:00+01:00'),
        status: BlockStatus.EVENTS_ASSIGNED
    }
];

export const clubsMock: Club[] = [
    {
        id: '11ec-4c5c-3ee6fe9a-b737-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        code: 'ALK',
        name: 'Alkmaarsche'
    },
    {
        id: '11ec-4c5c-3ee8e14c-b526-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        code: 'RYM',
        name: 'Rijnmond'
    },
    {
        id: '11ec-4c5c-3ee51ad0-8251-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        code: 'NAU',
        name: 'Nautilus'
    },
    {
        id: '11ec-4c5c-3ee9c27e-8ce7-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        code: 'LEY',
        name: 'Leythe'
    },
    {
        id: '11ec-4c5c-3ee7fbd8-bff9-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        code: 'GOU',
        name: 'Gouda'
    },
    {
        id: '11ec-4c5c-3ee60cb0-9976-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        code: 'ALP',
        name: 'Alphen'
    }
];

export const clubDetailsMock: ClubDetail[] = [
    {
        id: '11ec-4c5c-3ee6fe9a-b737-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        code: 'ALK',
        name: 'Alkmaarsche',
        federation: '',
        address: '',
        city: '',
        blade: '',
        trousers: '',
        shirt: '',
        knrb_num: 6,
        contact: {
            name: '',
            mobile: '',
            phone: '',
            fax: '',
            email: ''
        },
        emergency: {
            name: '',
            mobile: '',
            phone: ''
        }
    },
    {
        id: '11ec-4c5c-3ee8e14c-b526-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        code: 'RYM',
        name: 'Rijnmond',
        federation: '',
        address: '',
        city: '',
        blade: '',
        trousers: '',
        shirt: '',
        knrb_num: 8,
        contact: {
            name: '',
            mobile: '',
            phone: '',
            fax: '',
            email: ''
        },
        emergency: {
            name: '',
            mobile: '',
            phone: ''
        }
    },
    {
        id: '11ec-4c5c-3ee51ad0-8251-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        code: 'NAU',
        name: 'Nautilus',
        federation: '',
        address: '',
        city: '',
        blade: '',
        trousers: '',
        shirt: '',
        knrb_num: 4,
        contact: {
            name: '',
            mobile: '',
            phone: '',
            fax: '',
            email: ''
        },
        emergency: {
            name: '',
            mobile: '',
            phone: ''
        }
    },
    {
        id: '11ec-4c5c-3ee9c27e-8ce7-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        code: 'LEY',
        name: 'Leythe',
        federation: '',
        address: '',
        city: '',
        blade: '',
        trousers: '',
        shirt: '',
        knrb_num: 9,
        contact: {
            name: '',
            mobile: '',
            phone: '',
            fax: '',
            email: ''
        },
        emergency: {
            name: '',
            mobile: '',
            phone: ''
        }
    },
    {
        id: '11ec-4c5c-3ee7fbd8-bff9-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        code: 'GOU',
        name: 'Gouda',
        federation: '',
        address: '',
        city: '',
        blade: '',
        trousers: '',
        shirt: '',
        knrb_num: 7,
        contact: {
            name: '',
            mobile: '',
            phone: '',
            fax: '',
            email: ''
        },
        emergency: {
            name: '',
            mobile: '',
            phone: ''
        }
    },
    {
        id: '11ec-4c5c-3ee51ad0-8251-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        code: 'NAU',
        name: 'Nautilus',
        federation: '',
        address: '',
        city: '',
        blade: '',
        trousers: '',
        shirt: '',
        knrb_num: 4,
        contact: {
            name: '',
            mobile: '',
            phone: '',
            fax: '',
            email: ''
        },
        emergency: {
            name: '',
            mobile: '',
            phone: ''
        }
    },
    {
        id: '11ec-4c5c-3ee60cb0-9976-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        code: 'ALP',
        name: 'Alphen',
        federation: '',
        address: '',
        city: '',
        blade: '',
        trousers: '',
        shirt: '',
        knrb_num: 5,
        contact: {
            name: '',
            mobile: '',
            phone: '',
            fax: '',
            email: ''
        },
        emergency: {
            name: '',
            mobile: '',
            phone: ''
        }
    }
];

export const crewsMock: Crew[] = [
    {
        knrb_num: 307349,
        status: CrewStatus.ENTERED,
        category: '',
        id: '11ec-4c5c-3fc524f4-82a0-fa53f5d3a545',
        club_id: '11ec-4c5c-3ee6fe9a-b737-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        event_id: '11ec-4c5c-3f01ddfa-b7cf-fa53f5d3a545',
        sub_event_id: null,
        clubName: 'Alkmaarsche 1',
        displayName: 'Danoontje Pouwer',
        displayStatus: CrewStatus.ENTERED,
        coxes: [],
        coaches: [],
        rowers: []
    },
    {
        knrb_num: 306926,
        status: CrewStatus.ENTERED,
        category: '',
        id: '11ec-4c5c-3fe5828a-a2b3-fa53f5d3a545',
        club_id: '11ec-4c5c-3ee8e14c-b526-fa53f5d3a545',
        event_id: '11ec-4c5c-3f08f9aa-bdb4-fa53f5d3a545',
        sub_event_id: null,
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        clubName: 'Rijnmond',
        displayName: 'Rijnmond',
        displayStatus: CrewStatus.ENTERED,
        coxes: [],
        coaches: [],
        rowers: []
    },
    {
        knrb_num: 306988,
        status: CrewStatus.ENTERED,
        category: '',
        club_id: '11ec-4c5c-3ee51ad0-8251-fa53f5d3a545',
        id: '11ec-4c5c-3fdf94a6-a102-fa53f5d3a545',
        event_id: '11ec-4c5c-3f01ddfa-b7cf-fa53f5d3a545',
        sub_event_id: null,
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        clubName: 'Nautilus 1',
        displayName: 'Solo Queue',
        displayStatus: CrewStatus.ENTERED,
        coxes: [],
        coaches: [],
        rowers: []
    },
    {
        knrb_num: 307354,
        status: CrewStatus.ENTERED,
        category: '',
        id: '11ec-4c5c-3fc7c164-80d5-fa53f5d3a545',
        club_id: '11ec-4c5c-3ee6fe9a-b737-fa53f5d3a545',
        event_id: '11ec-4c5c-3f01ddfa-b7cf-fa53f5d3a545',
        sub_event_id: null,
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        clubName: 'Alkmaarsche 2',
        displayName: 'Alkmaarsche 2',
        displayStatus: CrewStatus.ENTERED,
        coxes: [],
        coaches: [],
        rowers: []
    },
    {
        knrb_num: 307569,
        status: CrewStatus.ENTERED,
        category: '',
        id: '11ec-4c5c-3fdc7f00-8293-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        club_id: '11ec-4c5c-3ee9c27e-8ce7-fa53f5d3a545',
        event_id: '11ec-4c5c-3f01ddfa-b7cf-fa53f5d3a545',
        sub_event_id: null,
        clubName: 'Leythe/Skylla',
        displayName: 'Leythe/Skylla',
        displayStatus: CrewStatus.ENTERED,
        coxes: [],
        coaches: [],
        rowers: []
    },
    {
        knrb_num: 307352,
        status: CrewStatus.ENTERED,
        category: '',
        id: '11ec-4c5c-3fca771a-99fb-fa53f5d3a545',
        club_id: '11ec-4c5c-3ee6fe9a-b737-fa53f5d3a545',
        event_id: '11ec-4c5c-3f01ddfa-b7cf-fa53f5d3a545',
        sub_event_id: null,
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        clubName: 'Alkmaarsche 3',
        displayName: 'Alkmaarsche 3',
        displayStatus: CrewStatus.ENTERED,
        coxes: [],
        coaches: [],
        rowers: []
    },
    {
        knrb_num: 307393,
        status: CrewStatus.ENTERED,
        category: '',
        club_id: '11ec-4c5c-3ee7fbd8-bff9-fa53f5d3a545',
        id: '11ec-4c5c-3fd98df4-bce8-fa53f5d3a545',
        event_id: '11ec-4c5c-3f01ddfa-b7cf-fa53f5d3a545',
        sub_event_id: null,
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        clubName: 'Gouda 2',
        displayName: 'Anton',
        displayStatus: CrewStatus.ENTERED,
        coxes: [],
        coaches: [],
        rowers: []
    },
    {
        knrb_num: 307911,
        status: CrewStatus.ENTERED,
        category: '',
        club_id: '11ec-4c5c-3ee51ad0-8251-fa53f5d3a545',
        id: '11ec-4c5c-3fe2883c-be9f-fa53f5d3a545',
        event_id: '11ec-4c5c-3f01ddfa-b7cf-fa53f5d3a545',
        sub_event_id: null,
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        clubName: 'Nautilus 2',
        displayName: 'Nautilus 2',
        displayStatus: CrewStatus.ENTERED,
        coxes: [],
        coaches: [],
        rowers: []
    },
    {
        knrb_num: 307938,
        status: CrewStatus.ENTERED,
        category: '',
        club_id: '11ec-4c5c-3ee60cb0-9976-fa53f5d3a545',
        id: '11ec-4c5c-3fd16890-92dc-fa53f5d3a545',
        event_id: '11ec-4c5c-3f08f9aa-bdb4-fa53f5d3a545',
        sub_event_id: null,
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        clubName: 'Alphen',
        displayName: 'Alphen',
        displayStatus: CrewStatus.ENTERED,
        coxes: [],
        coaches: [],
        rowers: []
    },
    {
        knrb_num: 306981,
        status: CrewStatus.ENTERED,
        category: '',
        club_id: '11ec-4c5c-3ee7fbd8-bff9-fa53f5d3a545',
        id: '11ec-4c5c-3fd6600c-a433-fa53f5d3a545',
        event_id: '11ec-4c5c-3f01ddfa-b7cf-fa53f5d3a545',
        sub_event_id: null,
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        clubName: 'Gouda 1',
        displayName: 'Gouda 1',
        displayStatus: CrewStatus.ENTERED,
        coxes: [],
        coaches: [],
        rowers: []
    },
    {
        knrb_num: 307680,
        status: CrewStatus.ENTERED,
        category: '',
        club_id: '11ec-4c5c-3ee6fe9a-b737-fa53f5d3a545',
        id: '11ec-4c5c-3fcd60d8-be4a-fa53f5d3a545',
        event_id: '11ec-4c5c-3f01ddfa-b7cf-fa53f5d3a545',
        sub_event_id: null,
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        clubName: 'Alkmaarsche 4',
        displayName: 'Alkmaarsche 4',
        displayStatus: CrewStatus.ENTERED,
        coxes: [],
        coaches: [],
        rowers: []
    }
];

export const crewDetailsMock: CrewDetail[] = [
    {
        knrb_num: 307349,
        status: CrewStatus.ENTERED,
        name: 'Alkmaarsche',
        shortname: 'Alkmaarsche',
        alternative: 'Alkmaarsche 1',
        sequence: 1,
        combination: null,
        boat: '',
        boattype: '',
        remarks: null,
        result_status: TeamResultStatus.NORMAL,
        penalty_reason: null,
        correction_factor: 1,
        category: '',
        local: false,
        calculated_category: '',
        remarks_for_umpire: null,
        knrb_sequence: 1,
        public_remarks: null,
        club_id: '11ec-4c5c-3ee6fe9a-b737-fa53f5d3a545',
        id: '11ec-4c5c-3fc524f4-82a0-fa53f5d3a545',
        event_id: '11ec-4c5c-3f01ddfa-b7cf-fa53f5d3a545',
        sub_event_id: null,
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        clubName: 'Alkmaarsche 1',
        displayName: 'Alkmaarsche 1',
        displayStatus: CrewStatus.ENTERED,
        coxes: [],
        coaches: [],
        rowers: []
    },
    {
        knrb_num: 306926,
        status: CrewStatus.ENTERED,
        name: 'Rijnmond',
        shortname: 'Rijnmond',
        alternative: 'Rijnmond',
        sequence: 0,
        combination: null,
        boat: '',
        boattype: '',
        remarks: null,
        result_status: TeamResultStatus.NORMAL,
        penalty_reason: null,
        correction_factor: 1,
        category: '',
        local: false,
        calculated_category: '',
        remarks_for_umpire: null,
        knrb_sequence: 0,
        public_remarks: null,
        club_id: '11ec-4c5c-3ee8e14c-b526-fa53f5d3a545',
        id: '11ec-4c5c-3fe5828a-a2b3-fa53f5d3a545',
        event_id: '11ec-4c5c-3f08f9aa-bdb4-fa53f5d3a545',
        sub_event_id: null,
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        clubName: 'Rijnmond',
        displayName: 'Rijnmond',
        displayStatus: CrewStatus.ENTERED,
        coxes: [],
        coaches: [],
        rowers: []
    },
    {
        knrb_num: 306988,
        status: CrewStatus.ENTERED,
        name: 'Nautilus',
        shortname: 'Nautilus',
        alternative: 'Nautilus 1',
        sequence: 1,
        combination: null,
        boat: '',
        boattype: '',
        remarks: null,
        result_status: TeamResultStatus.NORMAL,
        penalty_reason: null,
        correction_factor: 1,
        category: '',
        local: false,
        calculated_category: '',
        remarks_for_umpire: null,
        knrb_sequence: 1,
        public_remarks: null,
        club_id: '11ec-4c5c-3ee51ad0-8251-fa53f5d3a545',
        id: '11ec-4c5c-3fdf94a6-a102-fa53f5d3a545',
        event_id: '11ec-4c5c-3f01ddfa-b7cf-fa53f5d3a545',
        sub_event_id: null,
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        clubName: 'Nautilus 1',
        displayName: 'Nautilus 1',
        displayStatus: CrewStatus.ENTERED,
        coxes: [],
        coaches: [],
        rowers: []
    },
    {
        knrb_num: 307354,
        status: CrewStatus.ENTERED,
        name: 'Alkmaarsche',
        shortname: 'Alkmaarsche',
        alternative: 'Alkmaarsche 2',
        sequence: 2,
        combination: null,
        boat: '',
        boattype: '',
        remarks: null,
        result_status: TeamResultStatus.NORMAL,
        penalty_reason: null,
        correction_factor: 1,
        category: '',
        local: false,
        calculated_category: '',
        remarks_for_umpire: null,
        knrb_sequence: 2,
        public_remarks: null,
        club_id: '11ec-4c5c-3ee6fe9a-b737-fa53f5d3a545',
        id: '11ec-4c5c-3fc7c164-80d5-fa53f5d3a545',
        event_id: '11ec-4c5c-3f01ddfa-b7cf-fa53f5d3a545',
        sub_event_id: null,
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        clubName: 'Alkmaarsche 2',
        displayName: 'Alkmaarsche 2',
        displayStatus: CrewStatus.ENTERED,
        coxes: [],
        coaches: [],
        rowers: []
    },
    {
        knrb_num: 307569,
        status: CrewStatus.ENTERED,
        name: 'Leythe',
        shortname: 'Leythe',
        alternative: 'Leythe/Skylla',
        sequence: 0,
        combination: null,
        boat: '',
        boattype: '',
        remarks: null,
        result_status: TeamResultStatus.NORMAL,
        penalty_reason: null,
        correction_factor: 1,
        category: '',
        local: false,
        calculated_category: '',
        remarks_for_umpire: null,
        knrb_sequence: 0,
        public_remarks: null,
        club_id: '11ec-4c5c-3ee9c27e-8ce7-fa53f5d3a545',
        id: '11ec-4c5c-3fdc7f00-8293-fa53f5d3a545',
        event_id: '11ec-4c5c-3f01ddfa-b7cf-fa53f5d3a545',
        sub_event_id: null,
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        clubName: 'Leythe/Skylla',
        displayName: 'Leythe/Skylla',
        displayStatus: CrewStatus.ENTERED,
        coxes: [],
        coaches: [],
        rowers: []
    },
    {
        knrb_num: 307352,
        status: CrewStatus.ENTERED,
        name: 'Alkmaarsche',
        shortname: 'Alkmaarsche',
        alternative: 'Alkmaarsche 3',
        sequence: 3,
        combination: null,
        boat: '',
        boattype: '',
        remarks: null,
        result_status: TeamResultStatus.NORMAL,
        penalty_reason: null,
        correction_factor: 1,
        category: '',
        local: false,
        calculated_category: '',
        remarks_for_umpire: null,
        knrb_sequence: 3,
        public_remarks: null,
        club_id: '11ec-4c5c-3ee6fe9a-b737-fa53f5d3a545',
        id: '11ec-4c5c-3fca771a-99fb-fa53f5d3a545',
        event_id: '11ec-4c5c-3f01ddfa-b7cf-fa53f5d3a545',
        sub_event_id: null,
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        clubName: 'Alkmaarsche 3',
        displayName: 'Alkmaarsche 3',
        displayStatus: CrewStatus.ENTERED,
        coxes: [],
        coaches: [],
        rowers: []
    },
    {
        knrb_num: 307393,
        status: CrewStatus.ENTERED,
        name: 'Gouda',
        shortname: 'Gouda',
        alternative: 'Gouda 2',
        sequence: 2,
        combination: null,
        boat: '',
        boattype: '',
        remarks: null,
        result_status: TeamResultStatus.NORMAL,
        penalty_reason: null,
        correction_factor: 1,
        category: '',
        local: false,
        calculated_category: '',
        remarks_for_umpire: null,
        knrb_sequence: 2,
        public_remarks: null,
        club_id: '11ec-4c5c-3ee7fbd8-bff9-fa53f5d3a545',
        id: '11ec-4c5c-3fd98df4-bce8-fa53f5d3a545',
        event_id: '11ec-4c5c-3f01ddfa-b7cf-fa53f5d3a545',
        sub_event_id: null,
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        clubName: 'Gouda 2',
        displayName: 'Gouda 2',
        displayStatus: CrewStatus.ENTERED,
        coxes: [],
        coaches: [],
        rowers: []
    },
    {
        knrb_num: 307911,
        status: CrewStatus.ENTERED,
        name: 'Nautilus',
        shortname: 'Nautilus',
        alternative: 'Nautilus 2',
        sequence: 2,
        combination: null,
        boat: '',
        boattype: '',
        remarks: null,
        result_status: TeamResultStatus.NORMAL,
        penalty_reason: null,
        correction_factor: 1,
        category: '',
        local: false,
        calculated_category: '',
        remarks_for_umpire: null,
        knrb_sequence: 2,
        public_remarks: null,
        club_id: '11ec-4c5c-3ee51ad0-8251-fa53f5d3a545',
        id: '11ec-4c5c-3fe2883c-be9f-fa53f5d3a545',
        event_id: '11ec-4c5c-3f01ddfa-b7cf-fa53f5d3a545',
        sub_event_id: null,
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        clubName: 'Nautilus 2',
        displayName: 'Nautilus 2',
        displayStatus: CrewStatus.ENTERED,
        coxes: [],
        coaches: [],
        rowers: []
    },
    {
        knrb_num: 307938,
        status: CrewStatus.ENTERED,
        name: 'Alphen',
        shortname: 'Alphen',
        alternative: 'Alphen',
        sequence: 0,
        combination: null,
        boat: '',
        boattype: '',
        remarks: null,
        result_status: TeamResultStatus.NORMAL,
        penalty_reason: null,
        correction_factor: 1,
        category: '',
        local: false,
        calculated_category: '',
        remarks_for_umpire: null,
        knrb_sequence: 0,
        public_remarks: null,
        club_id: '11ec-4c5c-3ee60cb0-9976-fa53f5d3a545',
        id: '11ec-4c5c-3fd16890-92dc-fa53f5d3a545',
        event_id: '11ec-4c5c-3f08f9aa-bdb4-fa53f5d3a545',
        sub_event_id: null,
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        clubName: 'Alphen',
        displayName: 'Alphen',
        displayStatus: CrewStatus.ENTERED,
        coxes: [],
        coaches: [],
        rowers: []
    },
    {
        knrb_num: 306981,
        status: CrewStatus.ENTERED,
        name: 'Gouda',
        shortname: 'Gouda',
        alternative: 'Gouda 1',
        sequence: 1,
        combination: null,
        boat: '',
        boattype: '',
        remarks: null,
        result_status: TeamResultStatus.NORMAL,
        penalty_reason: null,
        correction_factor: 1,
        category: '',
        local: false,
        calculated_category: '',
        remarks_for_umpire: null,
        knrb_sequence: 1,
        public_remarks: null,
        club_id: '11ec-4c5c-3ee7fbd8-bff9-fa53f5d3a545',
        id: '11ec-4c5c-3fd6600c-a433-fa53f5d3a545',
        event_id: '11ec-4c5c-3f01ddfa-b7cf-fa53f5d3a545',
        sub_event_id: null,
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        clubName: 'Gouda 1',
        displayName: 'Gouda 1',
        displayStatus: CrewStatus.ENTERED,
        coxes: [],
        coaches: [],
        rowers: []
    },
    {
        knrb_num: 307680,
        status: CrewStatus.ENTERED,
        name: 'Alkmaarsche',
        shortname: 'Alkmaarsche',
        alternative: 'Alkmaarsche 4',
        sequence: 4,
        combination: null,
        boat: '',
        boattype: '',
        remarks: null,
        result_status: TeamResultStatus.NORMAL,
        penalty_reason: null,
        correction_factor: 1,
        category: '',
        local: false,
        calculated_category: '',
        remarks_for_umpire: null,
        knrb_sequence: 4,
        public_remarks: null,
        club_id: '11ec-4c5c-3ee6fe9a-b737-fa53f5d3a545',
        id: '11ec-4c5c-3fcd60d8-be4a-fa53f5d3a545',
        event_id: '11ec-4c5c-3f01ddfa-b7cf-fa53f5d3a545',
        sub_event_id: null,
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        clubName: 'Alkmaarsche 4',
        displayName: 'Alkmaarsche 4',
        displayStatus: CrewStatus.ENTERED,
        coxes: [],
        coaches: [],
        rowers: []
    }
];

export const eventsMock: Event[] = [
    {
        id: '11ec-505f-9ed438a2-a17c-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        parent_id: null,
        event: 11,
        number: 11,
        day: new Date('2020-10-01T00:00:00+00:00'),
        code: 'D 1x',
        name: 'Dames skiff',
        category: '',
        boat_type: '1x',
        sub_crews: [],
        crews: [],
        status: EventStatus.ONGOING
    },
    {
        event: 0,
        day: new Date('2020-10-01T00:00:00+00:00'),
        number: 0,
        code: 'Bedr 8+',
        name: 'Bedrijfs acht',
        category: 'Bedr',
        boat_type: '8+',
        id: '11ec-4c5c-3f08f9aa-bdb4-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        parent_id: null,
        sub_crews: [],
        crews: [],
        status: EventStatus.ONGOING
    },
    {
        event: 24,
        day: new Date('2020-10-01T00:00:00+00:00'),
        number: 24,
        code: 'H 4*',
        name: 'Heren dubbelvier-met',
        category: '',
        boat_type: '4*',
        id: '11ec-4c5c-3f01ddfa-b7cf-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        parent_id: null,
        sub_crews: [],
        crews: [],
        status: EventStatus.ONGOING
    }
];

export const eventDetailsMock: EventDetail[] = [
    {
        id: '11ec-505f-9ed438a2-a17c-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        cost_id: '11ec-4c5c-3ef5aa94-a599-fa53f5d3a545',
        parent_id: null,
        event: 11,
        number: 11,
        day: new Date('2020-10-01T00:00:00+00:00'),
        code: 'D 1x',
        name: 'D 1x',
        category: '',
        boat_type: '',
        weighed: false,
        gender: Gender.MAN,
        remarks: '',
        status: EventStatus.ONGOING,
        block_knrb: null,
        correction_factor_boat: 1,
        fields: [],
        sub_crews: [],
        crews: []
    }
];

export const fieldsMock: Field[] = [
    {
        block_id: '11ec-4fe5-a92bc36c-bd79-fa53f5d3a545',
        event_id: '11ec-505f-9ed438a2-a17c-fa53f5d3a545',
        id: '11ec-4c5c-a026a75a-a828-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        round_id: '11ec-4c5c-7c72dd38-b16a-fa53f5d3a545',
        teams: []
    },
    {
        block_id: '11ec-4fe5-a92bc36c-bd79-fa53f5d3a545',
        event_id: '11ec-4c5c-3f08f9aa-bdb4-fa53f5d3a545',
        id: '11ec-505f-9ed438a2-a17c-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        round_id: '11ec-4c5c-7c72dd38-b16a-fa53f5d3a545',
        teams: []
    }
];

export const fieldDetailsMock: FieldDetail[] = [
    {
        starting_order: null,
        result_status: 0,
        start_time: new Date('2020-10-01T17:17:17+17:17'),
        block_id: '11ec-4fe5-a92bc36c-bd79-fa53f5d3a545',
        event_id: '11ec-505f-9ed438a2-a17c-fa53f5d3a545',
        id: '11ec-4c5c-a026a75a-a828-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        round_id: '11ec-4c5c-7c72dd38-b16a-fa53f5d3a545',
        teams: []
    },
    {
        starting_order: null,
        result_status: 0,
        start_time: new Date('2020-10-01T17:17:17+17:17'),
        block_id: '11ec-4fe5-a92bc36c-bd79-fa53f5d3a545',
        event_id: '11ec-4c5c-3f08f9aa-bdb4-fa53f5d3a545',
        id: '11ec-505f-9ed438a2-a17c-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        round_id: '11ec-4c5c-7c72dd38-b16a-fa53f5d3a545',
        teams: []
    }
];

export const finesMock: Fine[] = [
    {
        amount: 67,
        description: '',
        date: new Date('2022-01-11T00:00:00+00:00'),
        crew_id: '11ec-4c5c-3fd16890-92dc-fa53f5d3a545',
        id: '11ec-726a-9d96cb26-86d4-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545'
    }
];

export const locationsMock: Location[] = [
    {
        id: '11ec-4c5c-82a99ff2-b372-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        round_id: '11ec-4c5c-7c72dd38-b16a-fa53f5d3a545',
        name: 'Start',
        distance: 0,
        type: LocationType.START,
        waypoint: false
    },
    {
        id: '11ec-4c5c-89103a22-a463-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        round_id: '11ec-4c5c-7c72dd38-b16a-fa53f5d3a545',
        name: 'Finish',
        distance: 600,
        type: LocationType.FINISH,
        waypoint: false
    }
];

export const regattasMock: Regatta[] = [
    {
        id: '11ec-28fd-389c2006-8fe8-fa53f5d3a545',
        venue_id: '11e9-d0de-fb4cbf3a-a657-525400d1387d',
        name: 'TBR 2021 test',
        start_date: new Date('2021-10-09T00:00:00+00:00'),
        end_date: new Date('2021-10-17T00:00:00+00:00'),
        race_type: RegattaType.CHASE,
        breaking_news: ''
    },
    {
        id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        venue_id: '11e9-d0de-fb4cbf3a-a657-525400d1385e',
        name: 'Sebastiaan test',
        start_date: new Date('2021-10-08T00:00:00+00:00'),
        end_date: new Date('2021-10-14T00:00:00+00:00'),
        race_type: RegattaType.CHASE,
        breaking_news: ''
    }
];

export const regattaDetailsMock: RegattaDetail[] = [
    {
        id: '11ec-28fd-389c2006-8fe8-fa53f5d3a545',
        venue_id: '11e9-d0de-fb4cbf3a-a657-525400d1387d',
        name: 'TBR 2021 test',
        file: 'tbr21_20211008205502.xml',
        start_date: new Date('2021-10-09T00:00:00+00:00'),
        end_date: new Date('2021-10-17T00:00:00+00:00'),
        race_type: RegattaType.CHASE,
        breaking_news: '',
        lottery_settings: {
            maximumCrewsType: 'percentage',
            baseCrewPercentageOn: 'this year',
            maximumCrewsNumber: 25,
            excludeCombinationCrews: 0,
            matchingRowersFor8: 4,
            matchingRowersFor4: 2,
            matchingRowersFor2: 1,
            matchingRowersFor1: 1,
            previousYearClubsExcludeCombiationCrews: 1
        },
        correction_factor_settings: false,
        correction_factor_type: null
    },
    {
        id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        venue_id: '11e9-d0de-fb4cbf3a-a657-525400d1385e',
        name: 'Sebastiaan test',
        file: 'tbr21_20211008205501.xml',
        start_date: new Date('2021-10-08T00:00:00+00:00'),
        end_date: new Date('2021-10-14T00:00:00+00:00'),
        race_type: RegattaType.CHASE,
        breaking_news: '',
        lottery_settings: {
            maximumCrewsType: 'percentage',
            baseCrewPercentageOn: 'this year',
            maximumCrewsNumber: 25,
            excludeCombinationCrews: 0,
            matchingRowersFor8: 4,
            matchingRowersFor4: 2,
            matchingRowersFor2: 1,
            matchingRowersFor1: 1,
            previousYearClubsExcludeCombiationCrews: 1
        },
        correction_factor_settings: false,
        correction_factor_type: null
    }
];

export const roundsMock: Round[] = [
    {
        id: '11ec-4c5c-7c72dd38-b16a-fa83f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        block_id: '11ec-4fe5-a92bc36c-bd79-fa53f5d3a545',
        name: '600',
        multiplier: 1
    },
    {
        name: '600',
        multiplier: 1,
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53t5d3a545',
        block_id: '11ec-4fe5-a92bc36c-bd79-fa53f5d3a545',
        id: '11ec-4c5c-7c72dd38-b16a-fa53f5d4a545'
    },
    {
        name: '500',
        multiplier: 1,
        regatta_id: '11ec-4c5c-32593cee-84b6-fa53f5d3a545',
        block_id: '11ec-4fe5-a92bc36c-bd79-fa53f5d3a545',
        id: '11ec-4c5c-7c72dd38-b16a-fa53f5d3a545'
    }
];

export const rowersMock: Rower[] = [
    {
        id: '11ec-4c5c-7c72dd38-b17a-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        club_id: '11ec-4c5c-3ee8e14c-b526-fa53f5d3a545',
        knrb: '1',
        knrb_num: null,
        fullName: 'T.E. St',
        gender: Gender.MAN,
        crew_id: '11ec-4c5c-3fc524f4-82a0-fa53f5d3a545',
        role: RowerRole.ROWER,
        position: 1
    },
    {
        id: '11ec-4c5c-7c72dt38-b16a-fa53f5d3a545',
        club_id: '11ec-4c5c-3ee9c27e-8ce7-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        knrb: '2',
        knrb_num: null,
        fullName: 'T.E. St 2',
        gender: Gender.MAN,
        crew_id: '11ec-4c5c-3fdf94a6-a102-fa53f5d3a545',
        role: RowerRole.ROWER,
        position: 2
    },
    {
        id: '11ec-4c5c-7c72dd35-b17a-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        club_id: '11ec-4c5c-3ee8e14c-b526-fa53f5d3a545',
        knrb: '3',
        knrb_num: null,
        fullName: 'S.T. Roke',
        gender: Gender.WOMAN,
        crew_id: '11ec-4c5c-3fc524f4-82a0-fa53f5d3a545',
        role: RowerRole.ROWER,
        position: 8
    },
    {
        id: '11ec-4c5c-5v62dt38-b16a-fa53f5d3a545',
        club_id: '11ec-4c5c-3ee9c27e-8ce7-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        knrb: '4',
        knrb_num: null,
        fullName: 'S.T. Roke 2',
        gender: Gender.MIX,
        crew_id: '11ec-4c5c-3fdf94a6-a102-fa53f5d3a545',
        role: RowerRole.ROWER,
        position: 8
    },
    {
        id: '11ec-4c5c-5v62dt38-b16a-fa53f52oa545',
        club_id: '11ec-4c5c-3ee9c27e-8ce7-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        knrb: '5',
        knrb_num: null,
        fullName: 'C.O. Ach',
        gender: Gender.WOMAN,
        crew_id: '11ec-4c5c-3fdf94a6-a102-fa53f5d3a545',
        role: RowerRole.COACH,
        position: 1
    }
];

export const rowerDetailsMock: RowerDetail[] = [
    {
        id: '11ec-4c5c-7c72dd38-b17a-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        club_id: '11ec-4c5c-3ee8e14c-b526-fa53f5d3a545',
        knrb: '1',
        knrb_num: null,
        fullName: 'T.E. St',
        gender: Gender.MAN,
        crew_id: '11ec-4c5c-3fc524f4-82a0-fa53f5d3a545',
        role: RowerRole.ROWER,
        position: 1,
        license: true,
        initals: 'TES',
        firstname: 'Test',
        middlename: 'Ernst',
        lastname: 'St',
        year_of_birth: 1998
    },
    {
        id: '11ec-4c5c-7c72dt38-b16a-fa53f5d3a545',
        club_id: '11ec-4c5c-3ee9c27e-8ce7-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        knrb: '2',
        knrb_num: null,
        fullName: 'T.E. St 2',
        gender: Gender.MAN,
        crew_id: '11ec-4c5c-3fdf94a6-a102-fa53f5d3a545',
        role: RowerRole.ROWER,
        position: 2,
        license: true,
        initals: 'TES 2',
        firstname: 'Test',
        middlename: 'Ernst',
        lastname: 'St 2',
        year_of_birth: 2017
    },
    {
        id: '11ec-4c5c-7c72dd35-b17a-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        club_id: '11ec-4c5c-3ee8e14c-b526-fa53f5d3a545',
        knrb: '3',
        knrb_num: null,
        fullName: 'S.T. Roke',
        gender: Gender.WOMAN,
        crew_id: '11ec-4c5c-3fc524f4-82a0-fa53f5d3a545',
        role: RowerRole.ROWER,
        position: 8,
        license: true,
        initals: 'STR',
        firstname: 'Stroke',
        middlename: 'Test',
        lastname: 'Roke',
        year_of_birth: 2017
    },
    {
        id: '11ec-4c5c-5v62dt38-b16a-fa53f5d3a545',
        club_id: '11ec-4c5c-3ee9c27e-8ce7-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        knrb: '4',
        knrb_num: null,
        fullName: 'S.T. Roke 2',
        gender: Gender.MIX,
        crew_id: '11ec-4c5c-3fdf94a6-a102-fa53f5d3a545',
        role: RowerRole.ROWER,
        position: 8,
        license: true,
        initals: 'STR',
        firstname: 'Stroke 2',
        middlename: 'Test',
        lastname: 'Roke 2',
        year_of_birth: 2017
    },
    {
        id: '11ec-4c5c-5v62dt38-b16a-fa53f52oa545',
        club_id: '11ec-4c5c-3ee9c27e-8ce7-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        knrb: '5',
        knrb_num: null,
        fullName: 'C.O. Ach',
        gender: Gender.WOMAN,
        crew_id: '11ec-4c5c-3fdf94a6-a102-fa53f5d3a545',
        role: RowerRole.COACH,
        position: 1,
        license: true,
        initals: 'COA',
        firstname: 'Coach',
        middlename: 'Otto',
        lastname: 'Roke',
        year_of_birth: 2017
    }
];

export const teamsMock: Team[] = [
    {
        id: '11ec-4c5c-a02832ea-aaa4-fa53f5d3a545',
        crew_id: '11ec-4c5c-3fc524f4-82a0-fa53f5d3a545',
        field_id: '11ec-4c5c-a026a75a-a828-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        result_status: TeamResultStatus.NORMAL,
        shirt_number: 1
    },
    {
        id: '11ec-4c5c-a02801ea-aaa4-fa53f5d3a545',
        crew_id: '11ec-4c5c-3fc524f4-82a0-fa53f5d3a545',
        field_id: '11ec-4c5c-a026a75a-a828-fa53f5d3a545',
        regatta_id: '11ec-28fd-389c2006-8fe8-fa53f5d3a532',
        result_status: TeamResultStatus.EXCLUDED,
        shirt_number: 12
    },
    {
        id: '11ec-4c5c-a0301876-a778-fa53f5d3a545',
        crew_id: '11ec-4c5c-3fe5828a-a2b3-fa53f5d3a545',
        field_id: '11ec-4c5c-a026a75a-a828-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        result_status: TeamResultStatus.NORMAL,
        shirt_number: 2
    },
    {
        id: '11ec-4c5c-a02ea59a-a560-fa53f5d3a545',
        crew_id: '11ec-4c5c-3fdf94a6-a102-fa53f5d3a545',
        field_id: '11ec-4c5c-a026a75a-a828-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        result_status: TeamResultStatus.NORMAL,
        shirt_number: 3
    },
    {
        id: '11ec-4c5c-a028da3e-b298-fa53f5d3a545',
        crew_id: '11ec-4c5c-3fc7c164-80d5-fa53f5d3a545',
        field_id: '11ec-4c5c-a026a75a-a828-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        result_status: TeamResultStatus.NORMAL,
        shirt_number: 4
    },
    {
        id: '11ec-4c5c-a02dffa0-b12e-fa53f5d3a545',
        crew_id: '11ec-4c5c-3fdc7f00-8293-fa53f5d3a545',
        field_id: '11ec-4c5c-a026a75a-a828-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        result_status: TeamResultStatus.NORMAL,
        shirt_number: 5
    },
    {
        id: '11ec-4c5c-a0298790-9bc4-fa53f5d3a545',
        crew_id: '11ec-4c5c-3fca771a-99fb-fa53f5d3a545',
        field_id: '11ec-4c5c-a026a75a-a828-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        result_status: TeamResultStatus.NORMAL,
        shirt_number: 6
    },
    {
        id: '11ec-4c5c-a02d47cc-ada5-fa53f5d3a545',
        crew_id: '11ec-4c5c-3fd98df4-bce8-fa53f5d3a545',
        field_id: '11ec-4c5c-a026a75a-a828-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        result_status: TeamResultStatus.NORMAL,
        shirt_number: 7
    },
    {
        id: '11ec-4c5c-a02f757e-950b-fa53f5d3a545',
        crew_id: '11ec-4c5c-3fe2883c-be9f-fa53f5d3a545',
        field_id: '11ec-4c5c-a026a75a-a828-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        result_status: TeamResultStatus.NORMAL,
        shirt_number: 8
    },
    {
        id: '11ec-4c5c-a02ab80e-ade9-fa53f5d3a545',
        crew_id: '11ec-4c5c-3fd16890-92dc-fa53f5d3a545',
        field_id: '11ec-4c5c-a026a75a-a828-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        result_status: TeamResultStatus.NORMAL,
        shirt_number: 9
    },
    {
        id: '11ec-4c5c-a02b5dc2-a651-fa53f5d3a545',
        crew_id: '11ec-4c5c-3fd6600c-a433-fa53f5d3a545',
        field_id: '11ec-4c5c-a026a75a-a828-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        result_status: TeamResultStatus.NORMAL,
        shirt_number: 10
    },
    {
        id: '11ec-4c5c-a02a2e66-9d57-fa53f5d3a545',
        crew_id: '11ec-4c5c-3fcd60d8-be4a-fa53f5d3a545',
        field_id: '11ec-4c5c-a026a75a-a828-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        result_status: TeamResultStatus.NORMAL,
        shirt_number: 11
    }
];

export const teamDetailsMock: TeamDetail[] = [
    {
        starting_order: 1,
        toss_reason: 'Random toss starting number: 1',
        shirt_number: 1,
        result_status: TeamResultStatus.NORMAL,
        penalty_time: 0,
        penalty_reason: '',
        deleted: false,
        user_set_deleted: false,
        crew_id: '11ec-4c5c-3fc524f4-82a0-fa53f5d3a545',
        field_id: '11ec-4c5c-a026a75a-a828-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        id: '11ec-4c5c-a02801ea-aaa4-fa53f5d3a545',
        equal_time_correction: '0',
        results: [],
        finishTime: 0
    },
    {
        starting_order: 2,
        toss_reason: 'Random toss starting number: 2',
        shirt_number: 2,
        result_status: TeamResultStatus.NORMAL,
        penalty_time: 0,
        penalty_reason: '',
        deleted: false,
        user_set_deleted: false,
        crew_id: '11ec-4c5c-3fe5828a-a2b3-fa53f5d3a545',
        field_id: '11ec-4c5c-a026a75a-a828-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        id: '11ec-4c5c-a0301876-a778-fa53f5d3a545',
        equal_time_correction: '0',
        results: [],
        finishTime: 0
    },
    {
        starting_order: 3,
        toss_reason: 'Random toss starting number: 3',
        shirt_number: 3,
        result_status: TeamResultStatus.NORMAL,
        penalty_time: 0,
        penalty_reason: '',
        deleted: false,
        user_set_deleted: false,
        crew_id: '11ec-4c5c-3fdf94a6-a102-fa53f5d3a545',
        field_id: '11ec-4c5c-a026a75a-a828-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        id: '11ec-4c5c-a02ea59a-a560-fa53f5d3a545',
        equal_time_correction: '0',
        results: [],
        finishTime: 0
    },
    {
        starting_order: 4,
        toss_reason: 'Random toss starting number: 4',
        shirt_number: 4,
        result_status: 0,
        penalty_time: 0,
        penalty_reason: '',
        deleted: false,
        user_set_deleted: false,
        crew_id: '11ec-4c5c-3fc7c164-80d5-fa53f5d3a545',
        field_id: '11ec-4c5c-a026a75a-a828-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        id: '11ec-4c5c-a028da3e-b298-fa53f5d3a545',
        equal_time_correction: '0',
        results: [],
        finishTime: 0
    },
    {
        starting_order: 5,
        toss_reason: 'Random toss starting number: 5',
        shirt_number: 5,
        result_status: TeamResultStatus.NORMAL,
        penalty_time: 0,
        penalty_reason: '',
        deleted: false,
        user_set_deleted: false,
        crew_id: '11ec-4c5c-3fdc7f00-8293-fa53f5d3a545',
        field_id: '11ec-4c5c-a026a75a-a828-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        id: '11ec-4c5c-a02dffa0-b12e-fa53f5d3a545',
        equal_time_correction: '0',
        results: [],
        finishTime: 0
    },
    {
        starting_order: 6,
        toss_reason: 'Random toss starting number: 6',
        shirt_number: 6,
        result_status: TeamResultStatus.NORMAL,
        penalty_time: 0,
        penalty_reason: '',
        deleted: false,
        user_set_deleted: false,
        crew_id: '11ec-4c5c-3fca771a-99fb-fa53f5d3a545',
        field_id: '11ec-4c5c-a026a75a-a828-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        id: '11ec-4c5c-a0298790-9bc4-fa53f5d3a545',
        equal_time_correction: '0',
        results: [],
        finishTime: 0
    },
    {
        starting_order: 7,
        toss_reason: 'Random toss starting number: 7',
        shirt_number: 7,
        result_status: TeamResultStatus.NORMAL,
        penalty_time: 0,
        penalty_reason: '',
        deleted: false,
        user_set_deleted: false,
        crew_id: '11ec-4c5c-3fd98df4-bce8-fa53f5d3a545',
        field_id: '11ec-4c5c-a026a75a-a828-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        id: '11ec-4c5c-a02d47cc-ada5-fa53f5d3a545',
        equal_time_correction: '0',
        results: [],
        finishTime: 0
    },
    {
        starting_order: 8,
        toss_reason: 'Random toss starting number: 8',
        shirt_number: 8,
        result_status: TeamResultStatus.NORMAL,
        penalty_time: 0,
        penalty_reason: '',
        deleted: false,
        user_set_deleted: false,
        crew_id: '11ec-4c5c-3fe2883c-be9f-fa53f5d3a545',
        field_id: '11ec-4c5c-a026a75a-a828-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        id: '11ec-4c5c-a02f757e-950b-fa53f5d3a545',
        equal_time_correction: '0',
        results: [],
        finishTime: 0
    },
    {
        starting_order: 9,
        toss_reason: 'Random toss starting number: 9',
        shirt_number: 9,
        result_status: TeamResultStatus.NORMAL,
        penalty_time: 0,
        penalty_reason: '',
        deleted: false,
        user_set_deleted: false,
        crew_id: '11ec-4c5c-3fd16890-92dc-fa53f5d3a545',
        field_id: '11ec-4c5c-a026a75a-a828-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        id: '11ec-4c5c-a02ab80e-ade9-fa53f5d3a545',
        equal_time_correction: '0',
        results: [],
        finishTime: 0
    },
    {
        starting_order: 10,
        toss_reason: 'Random toss starting number: 10',
        shirt_number: 10,
        result_status: TeamResultStatus.NORMAL,
        penalty_time: 0,
        penalty_reason: '',
        deleted: false,
        user_set_deleted: false,
        crew_id: '11ec-4c5c-3fd6600c-a433-fa53f5d3a545',
        field_id: '11ec-4c5c-a026a75a-a828-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        id: '11ec-4c5c-a02b5dc2-a651-fa53f5d3a545',
        equal_time_correction: '0',
        results: [],
        finishTime: 0
    },
    {
        starting_order: 11,
        toss_reason: 'Random toss starting number: 11',
        shirt_number: 11,
        result_status: TeamResultStatus.NORMAL,
        penalty_time: 0,
        penalty_reason: '',
        deleted: false,
        user_set_deleted: false,
        crew_id: '11ec-4c5c-3fcd60d8-be4a-fa53f5d3a545',
        field_id: '11ec-4c5c-a026a75a-a828-fa53f5d3a545',
        regatta_id: '11ec-4c5c-32393cee-84b6-fa53f5d3a545',
        id: '11ec-4c5c-a02a2e66-9d57-fa53f5d3a545',
        equal_time_correction: '0',
        results: [],
        finishTime: 0
    }
];
