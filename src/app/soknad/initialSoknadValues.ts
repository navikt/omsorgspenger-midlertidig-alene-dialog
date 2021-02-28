import { SoknadFormData, SoknadFormField } from '../types/SoknadFormData';

export const initialSoknadFormData: Partial<SoknadFormData> = {
    [SoknadFormField.harForståttRettigheterOgPlikter]: false,
    [SoknadFormField.harBekreftetOpplysninger]: false,
    [SoknadFormField.annenForelderNavn]: '',
    [SoknadFormField.annenForelderFnr]: '',
    [SoknadFormField.annenForelderSituasjonBeskrivelse]: '',
    [SoknadFormField.antallBarn]: 0,
    [SoknadFormField.fødselsårBarn]: [],
};
