import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';

export enum Arbeidssituasjon {
    'arbeidstaker' = 'arbeidstaker',
    'selvstendigNæringsdrivende' = 'selvstendigNæringsdrivende',
    'frilanser' = 'frilanser',
    'annen' = 'annen',
}

export enum AnnenForeldrenSituasjon {
    'sykdom' = 'sykdom',
    'innlagt_i_helseinstitusjon' = 'innlagt_i_helseinstitusjon',
    'fengsel' = 'fengsel',
    'utøver_verneplikt' = 'utøver_verneplikt',
    'annet' = 'annet',
}

export enum SoknadFormField {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
    harBekreftetOpplysninger = 'harBekreftetOpplysninger',
    borINorge = 'borINorge',
    arbeiderINorge = 'arbeiderINorge',
    arbeidssituasjon = 'arbeidssituasjon',
    annenForelderNavn = 'annenForelderNavn',
    annenForelderEtternavn = 'annenForelderEtternavn',
    annenForelderFnr = 'annenForelderFnr',
    annenForelderSituasjon = 'annenForelderSituasjon',
    annenForelderSituasjonBeskrivelse = 'annenForelderSituasjonBeskrivelse',
    annenForelderPeriodeFom = 'annenForelderPeriodeFom',
    annenForelderPeriodeTom = 'annenForelderPeriodeTom',
    antallFellesBarn = 'antallFellesBarn',
    alderYngsteBarn = 'alderYngsteBarn',
    harFosterbarn = 'harFosterbarn',
    alderAvAlleFosterbarn = 'alderAvAlleFosterbarn',
}

export interface SoknadFormData {
    [SoknadFormField.harForståttRettigheterOgPlikter]: boolean;
    [SoknadFormField.harBekreftetOpplysninger]: boolean;
    [SoknadFormField.borINorge]: YesOrNo;
    [SoknadFormField.arbeiderINorge]: YesOrNo;
    [SoknadFormField.arbeidssituasjon]: Arbeidssituasjon[];
    [SoknadFormField.annenForelderNavn]: string;
    [SoknadFormField.annenForelderEtternavn]: string;
    [SoknadFormField.annenForelderFnr]: string;
    [SoknadFormField.annenForelderSituasjon]: AnnenForeldrenSituasjon[];
    [SoknadFormField.annenForelderSituasjonBeskrivelse]: string;
    [SoknadFormField.annenForelderPeriodeFom]: Date;
    [SoknadFormField.annenForelderPeriodeTom]: Date;
    [SoknadFormField.antallFellesBarn]: number;
    [SoknadFormField.alderYngsteBarn]: number;
    [SoknadFormField.harFosterbarn]: YesOrNo;
    [SoknadFormField.alderAvAlleFosterbarn]: Array<number>;
}

export type DinSituasjonFormData = Pick<
    SoknadFormData,
    SoknadFormField.arbeiderINorge | SoknadFormField.borINorge | SoknadFormField.arbeidssituasjon
>;

export type OmAnnenForelderFormData = Pick<
    SoknadFormData,
    | SoknadFormField.annenForelderNavn
    | SoknadFormField.annenForelderEtternavn
    | SoknadFormField.annenForelderFnr
    | SoknadFormField.annenForelderSituasjon
    | SoknadFormField.annenForelderSituasjonBeskrivelse
    | SoknadFormField.annenForelderPeriodeFom
    | SoknadFormField.annenForelderPeriodeTom
>;

export type OmBarnaFormData = Pick<
    SoknadFormData,
    | SoknadFormField.antallFellesBarn
    | SoknadFormField.alderYngsteBarn
    | SoknadFormField.harFosterbarn
    | SoknadFormField.alderAvAlleFosterbarn
>;
