import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import { Utenlandsopphold } from '@navikt/sif-common-forms/lib/utenlandsopphold/types';
import { Barn } from '../pre-common/question-visibility/forms/barn/types';

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
    hvorLengeInnleggelsesperiodenKommerTil = 'hvorLengeInnleggelsesperiodenKommerTil',
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
    [SoknadFormField.alderAvAlleBarn]: Barn[];
    [SoknadFormField.harBoddUtenforNorgeSiste12Mnd]: YesOrNo;
    [SoknadFormField.utenlandsoppholdSiste12Mnd]: Utenlandsopphold[];
    [SoknadFormField.skalBoUtenforNorgeNeste12Mnd]: YesOrNo;
    [SoknadFormField.utenlandsoppholdNeste12Mnd]: Utenlandsopphold[];
    [SoknadFormField.hvorLengeInnleggelsesperiodenKommerTil]: YesOrNo;
}

export type DinArbeidssituasjonFormData = Pick<SoknadFormData, SoknadFormField.arbeidssituasjon>;

export type AnnenForelderFormData = Pick<
    SoknadFormData,
    | SoknadFormField.annenForelderNavn
    | SoknadFormField.annenForelderFnr
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
