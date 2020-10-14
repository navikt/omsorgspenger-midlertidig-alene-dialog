import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import { SoknadFormData, SoknadFormField } from '../types/SoknadFormData';

export const initialSoknadFormData: Partial<SoknadFormData> = {
    [SoknadFormField.harForståttRettigheterOgPlikter]: false,
    [SoknadFormField.harBekreftetOpplysninger]: false,
    [SoknadFormField.borINorge]: YesOrNo.UNANSWERED,
    [SoknadFormField.arbeiderINorge]: YesOrNo.UNANSWERED,
    [SoknadFormField.arbeidssituasjon]: [],
    [SoknadFormField.annenForelderNavn]: '',
    [SoknadFormField.annenForelderEtternavn]: '',
    [SoknadFormField.annenForelderFnr]: '',
    [SoknadFormField.annenForelderSituasjon]: [],
    [SoknadFormField.annenForelderSituasjonBeskrivelse]: '',
    [SoknadFormField.antallFellesBarn]: 0,
    [SoknadFormField.alderYngsteBarn]: 0,
    [SoknadFormField.harFosterbarn]: YesOrNo.UNANSWERED,
    [SoknadFormField.alderAvAlleFosterbarn]: [],
};
