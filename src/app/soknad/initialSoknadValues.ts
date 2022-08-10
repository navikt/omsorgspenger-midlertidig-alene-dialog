import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { SoknadFormData, SoknadFormField } from '../types/SoknadFormData';

export const initialSoknadFormData: SoknadFormData = {
    [SoknadFormField.harForståttRettigheterOgPlikter]: false,
    [SoknadFormField.harBekreftetOpplysninger]: false,
    [SoknadFormField.annenForelderNavn]: '',
    [SoknadFormField.annenForelderFnr]: '',
    [SoknadFormField.annenForelderSituasjon]: undefined,
    [SoknadFormField.annenForelderSituasjonBeskrivelse]: '',
    [SoknadFormField.annenForelderPeriodeMer6Maneder]: YesOrNo.UNANSWERED,
    [SoknadFormField.annenForelderPeriodeFom]: '',
    [SoknadFormField.andreBarn]: [],
};
