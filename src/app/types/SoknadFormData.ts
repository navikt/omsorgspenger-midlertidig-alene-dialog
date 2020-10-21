import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import { Utenlandsopphold } from '@navikt/sif-common-forms/lib/utenlandsopphold/types';

export enum Arbeidssituasjon {
    'arbeidstaker' = 'arbeidstaker',
    'selvstendigNæringsdrivende' = 'selvstendigNæringsdrivende',
    'frilanser' = 'frilanser',
    'annen' = 'annen',
}

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
    arbeidssituasjon = 'arbeidssituasjon',
    annenForelderNavn = 'annenForelderNavn',
    annenForelderEtternavn = 'annenForelderEtternavn',
    annenForelderFnr = 'annenForelderFnr',
    annenForelderSituasjon = 'annenForelderSituasjon',
    annenForelderSituasjonBeskrivelse = 'annenForelderSituasjonBeskrivelse',
    annenForelderPeriodeFom = 'annenForelderPeriodeFom',
    annenForelderPeriodeTom = 'annenForelderPeriodeTom',
    annenForelderPeriodeMer6Maneder = 'annenForelderPeriodeMer6Maneder',
    antallBarn = 'antallBarn',
    alderAvAlleBarn = 'alderAvAlleBarn',
    harBoddUtenforNorgeSiste12Mnd = 'harBoddUtenforNorgeSiste12Mnd',
    utenlandsoppholdSiste12Mnd = 'utenlandsoppholdSiste12Mnd',
    skalBoUtenforNorgeNeste12Mnd = 'skalBoUtenforNorgeNeste12Mnd',
    utenlandsoppholdNeste12Mnd = 'utenlandsoppholdNeste12Mnd',
}

export interface SoknadFormData {
    [SoknadFormField.harForståttRettigheterOgPlikter]: boolean;
    [SoknadFormField.harBekreftetOpplysninger]: boolean;
    [SoknadFormField.arbeidssituasjon]: Arbeidssituasjon[];
    [SoknadFormField.annenForelderNavn]: string;
    [SoknadFormField.annenForelderFnr]: string;
    [SoknadFormField.annenForelderSituasjon]: AnnenForeldrenSituasjon;
    [SoknadFormField.annenForelderSituasjonBeskrivelse]: string;
    [SoknadFormField.annenForelderPeriodeFom]: Date;
    [SoknadFormField.annenForelderPeriodeTom]: Date;
    [SoknadFormField.annenForelderPeriodeMer6Maneder]: YesOrNo;
    [SoknadFormField.antallBarn]: number;
    [SoknadFormField.alderAvAlleBarn]: Date[];
    [SoknadFormField.harBoddUtenforNorgeSiste12Mnd]: YesOrNo;
    [SoknadFormField.utenlandsoppholdSiste12Mnd]: Utenlandsopphold[];
    [SoknadFormField.skalBoUtenforNorgeNeste12Mnd]: YesOrNo;
    [SoknadFormField.utenlandsoppholdNeste12Mnd]: Utenlandsopphold[];
}

export type DinSituasjonFormData = Pick<SoknadFormData, SoknadFormField.arbeidssituasjon>;

export type OmAnnenForelderFormData = Pick<
    SoknadFormData,
    SoknadFormField.annenForelderNavn | SoknadFormField.annenForelderFnr
>;

export type AnnenForelderSituasjonFormData = Pick<
    SoknadFormData,
    | SoknadFormField.annenForelderSituasjon
    | SoknadFormField.annenForelderSituasjonBeskrivelse
    | SoknadFormField.annenForelderPeriodeFom
    | SoknadFormField.annenForelderPeriodeTom
    | SoknadFormField.annenForelderPeriodeMer6Maneder
>;

export type MedlemskapFormData = Pick<
    SoknadFormData,
    | SoknadFormField.harBoddUtenforNorgeSiste12Mnd
    | SoknadFormField.utenlandsoppholdSiste12Mnd
    | SoknadFormField.skalBoUtenforNorgeNeste12Mnd
    | SoknadFormField.utenlandsoppholdNeste12Mnd
>;

export type OmBarnaFormData = Pick<SoknadFormData, SoknadFormField.antallBarn | SoknadFormField.alderAvAlleBarn>;
