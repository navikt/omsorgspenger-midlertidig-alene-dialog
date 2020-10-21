import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import { SoknadFormData, SoknadFormField } from '../types/SoknadFormData';

export const initialSoknadFormData: Partial<SoknadFormData> = {
    [SoknadFormField.harForståttRettigheterOgPlikter]: false,
    [SoknadFormField.harBekreftetOpplysninger]: false,
    [SoknadFormField.arbeidssituasjon]: [],
    [SoknadFormField.annenForelderNavn]: '',
    [SoknadFormField.annenForelderFnr]: '',
    [SoknadFormField.annenForelderSituasjonBeskrivelse]: '',
    [SoknadFormField.annenForelderPeriodeMer6Maneder]: YesOrNo.UNANSWERED,
    [SoknadFormField.antallBarn]: 0,
    [SoknadFormField.alderAvAlleBarn]: [],
    [SoknadFormField.harBoddUtenforNorgeSiste12Mnd]: YesOrNo.UNANSWERED,
    [SoknadFormField.utenlandsoppholdSiste12Mnd]: [],
    [SoknadFormField.skalBoUtenforNorgeNeste12Mnd]: YesOrNo.UNANSWERED,
    [SoknadFormField.utenlandsoppholdNeste12Mnd]: [],
    // [SoknadFormField.skalOppholdeSegIUtlandetIPerioden]: YesOrNo.UNANSWERED,
    // [SoknadFormField.utenlandsoppholdIPerioden]: [],
};
