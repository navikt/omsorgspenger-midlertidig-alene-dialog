import { ApiStringDate } from '@navikt/sif-common-core/lib/types/ApiStringDate';
import { Locale } from '@navikt/sif-common-core/lib/types/Locale';
import { Arbeidssituasjon } from './SoknadFormData';

export interface ApiAndreForelderen {
    navn: string;
    fornavn: string;
    fnr: string;
    situasjon: string;
    situasjonBeskrivelse?: string;
    situasjonFom: ApiStringDate;
    situasjonTom: ApiStringDate;
}

export interface SoknadApiData {
    id: string;
    språk: Locale;
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
    borINorge: boolean;
    arbeiderINorge: boolean;
    arbeidssituasjon: Arbeidssituasjon[];
    andreForeldren: ApiAndreForelderen;
    antallFellesBarn: number;
    alderYngsteBarn: number;
    harFosterbarn: boolean;
    alderAvAlleFosterbarn: number[];
}
