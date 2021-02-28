import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import { Barn } from '../pre-common/question-visibility/forms/barn/types';

export enum AnnenForeldrenSituasjon {
    'sykdom' = 'sykdom',
    'innlagtIHelseinstitusjon' = 'innlagtIHelseinstitusjon',
    'fengsel' = 'fengsel',
    'utøverVerneplikt' = 'utøverVerneplikt',
    'annet' = 'annet',
}

export enum SoknadFormField {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
    harBekreftetOpplysninger = 'harBekreftetOpplysninger',
    annenForelderNavn = 'annenForelderNavn',
    annenForelderEtternavn = 'annenForelderEtternavn',
    annenForelderFnr = 'annenForelderFnr',
    annenForelderSituasjon = 'annenForelderSituasjon',
    annenForelderSituasjonBeskrivelse = 'annenForelderSituasjonBeskrivelse',
    annenForelderPeriodeFom = 'annenForelderPeriodeFom',
    annenForelderPeriodeTom = 'annenForelderPeriodeTom',
    annenForelderPeriodeMer6Maneder = 'annenForelderPeriodeMer6Maneder',
    vetLengdePåInnleggelseperioden = 'vetLengdePåInnleggelseperioden',
    antallBarn = 'antallBarn',
    fødselsårBarn = 'fødselsårBarn',
}

export interface SoknadFormData {
    [SoknadFormField.harForståttRettigheterOgPlikter]: boolean;
    [SoknadFormField.harBekreftetOpplysninger]: boolean;
    [SoknadFormField.annenForelderNavn]: string;
    [SoknadFormField.annenForelderFnr]: string;
    [SoknadFormField.annenForelderSituasjon]: AnnenForeldrenSituasjon;
    [SoknadFormField.annenForelderSituasjonBeskrivelse]: string;
    [SoknadFormField.annenForelderPeriodeFom]: string;
    [SoknadFormField.annenForelderPeriodeTom]: string;
    [SoknadFormField.annenForelderPeriodeMer6Maneder]: YesOrNo;
    [SoknadFormField.vetLengdePåInnleggelseperioden]: YesOrNo;
    [SoknadFormField.antallBarn]: number;
    [SoknadFormField.fødselsårBarn]: Barn[];
}

export type AnnenForelderFormData = Pick<
    SoknadFormData,
    | SoknadFormField.annenForelderNavn
    | SoknadFormField.annenForelderFnr
    | SoknadFormField.annenForelderSituasjon
    | SoknadFormField.annenForelderSituasjonBeskrivelse
    | SoknadFormField.annenForelderPeriodeFom
    | SoknadFormField.annenForelderPeriodeTom
    | SoknadFormField.annenForelderPeriodeMer6Maneder
    | SoknadFormField.vetLengdePåInnleggelseperioden
>;

export type OmBarnaFormData = Pick<SoknadFormData, SoknadFormField.antallBarn | SoknadFormField.fødselsårBarn>;
