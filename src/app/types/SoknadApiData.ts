import { ApiStringDate } from '@navikt/sif-common-core/lib/types/ApiStringDate';
import { Locale } from '@navikt/sif-common-core/lib/types/Locale';
import { AnnenForeldrenSituasjon, Arbeidssituasjon } from './SoknadFormData';

export interface SoknadApiData {
    id: string;
    språk: Locale;
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
    borINorge: boolean;
    arbeiderINorge: boolean;
    arbeidssituasjon: Arbeidssituasjon[];
    annenForelderNavn: string;
    annenForelderEtternavn: string;
    annenForelderFnr: string;
    annenForelderSituasjon: AnnenForeldrenSituasjon[];
    annenForelderSituasjonBeskrivelse: string;
    annenForelderPeriodeFom: ApiStringDate;
    annenForelderPeriodeTom: ApiStringDate;
    antallFellesBarn: number;
    alderYngsteBarn: number;
    harFosterbarn: boolean;
    alderAvAlleFosterbarn: number[];
}
