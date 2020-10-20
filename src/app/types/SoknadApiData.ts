import { ApiStringDate } from '@navikt/sif-common-core/lib/types/ApiStringDate';
import { Locale } from '@navikt/sif-common-core/lib/types/Locale';
import { AnnenForeldrenSituasjon, Arbeidssituasjon } from './SoknadFormData';

export interface BostedUtlandApiData {
    fraOgMed: ApiStringDate;
    tilOgMed: ApiStringDate;
    landkode: string;
    landnavn: string;
}
interface Medlemskap {
    harBoddIUtlandetSiste12Mnd: boolean;
    skalBoIUtlandetNeste12Mnd: boolean;
    utenlandsoppholdNeste12Mnd: BostedUtlandApiData[];
    utenlandsoppholdSiste12Mnd: BostedUtlandApiData[];
}

export interface UtenlandsoppholdIPeriodenApiData {
    fraOgMed: ApiStringDate;
    tilOgMed: ApiStringDate;
    landkode: string;
    landnavn: string;
}

interface AnnenForelder {
    navn: string;
    fnr: string;
    situasjon: AnnenForeldrenSituasjon;
    situasjonBeskrivelse?: string;
    periodeFraOgMed?: ApiStringDate;
    periodeTilOgMed?: ApiStringDate;
    periodeMer6Maneder?: boolean;
}

export interface SoknadApiData {
    id: string;
    språk: Locale;
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
    arbeidssituasjon: Arbeidssituasjon[];
    annenForelder: AnnenForelder;
    antallBarn: number;
    alderAvAlleBarn: ApiStringDate[];
    medlemskap: Medlemskap;
    utenlandsoppholdIPerioden?: {
        skalOppholdeSegIUtlandetIPerioden: boolean;
        opphold: UtenlandsoppholdIPeriodenApiData[];
    };
}
