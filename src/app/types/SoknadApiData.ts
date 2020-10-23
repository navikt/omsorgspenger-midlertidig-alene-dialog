import { ApiStringDate } from '@navikt/sif-common-core/lib/types/ApiStringDate';
import { Locale } from '@navikt/sif-common-core/lib/types/Locale';
import { AnnenForeldrenSituasjon, Arbeidssituasjon } from './SoknadFormData';

export interface BostedUtlandApiData {
    fraOgMed: ApiStringDate;
    tilOgMed: ApiStringDate;
    landkode: string;
    landnavn: string;
}
export interface Medlemskap {
    harBoddUtenforNorgeSiste12Mnd: boolean;
    skalBoIUtlandetNeste12Mnd: boolean;
    utenlandsoppholdNeste12Mnd: BostedUtlandApiData[];
    utenlandsoppholdSiste12Mnd: BostedUtlandApiData[];
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
    alderAvAlleBarn: number[];
    medlemskap: Medlemskap;
}
