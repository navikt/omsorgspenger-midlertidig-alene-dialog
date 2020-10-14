import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';

export enum Arbeidssituasjon {
    'arbeidstaker' = 'arbeidstaker',
    'selvstendigNæringsdrivende' = 'selvstendigNæringsdrivende',
    'frilanser' = 'frilanser',
    'annen' = 'annen',
}

export enum AndreForeldrenSituasjon {
    'sykdom' = 'sykdom',
    'innlagt i helseinstitusjon' = 'innlagt i helseinstitusjon',
    'fengsel' = 'fengsel',
    'utøver verneplikt' = 'utøver verneplikt',
    'annet' = 'annet',
}

export enum SoknadFormField {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
    harBekreftetOpplysninger = 'harBekreftetOpplysninger',
    borINorge = 'borINorge',
    arbeiderINorge = 'arbeiderINorge',
    arbeidssituasjon = 'arbeidssituasjon',
    andreForeldren = 'andreForeldren',
    antallFellesBarn = 'antallFellesBarn',
    alderYngsteBarn = 'alderYngsteBarn',
    harFosterbarn = 'harFosterbarn',
    alderAvAlleFosterbarn = 'alderAvAlleFosterbarn',
}

export interface AndreForelderen {
    fornavn: string;
    etternavn: string;
    fnr: string;
    situasjon: string;
    situasjonBeskrivelse?: string;
    situasjonFom: Date;
    situasjonTom: Date;
}

export interface SoknadFormData {
    [SoknadFormField.harForståttRettigheterOgPlikter]: boolean;
    [SoknadFormField.harBekreftetOpplysninger]: boolean;
    [SoknadFormField.borINorge]: YesOrNo;
    [SoknadFormField.arbeiderINorge]: YesOrNo;
    [SoknadFormField.arbeidssituasjon]: Arbeidssituasjon[];
    [SoknadFormField.andreForeldren]: AndreForelderen;
    [SoknadFormField.antallFellesBarn]: number;
    [SoknadFormField.alderYngsteBarn]: number;
    [SoknadFormField.harFosterbarn]: YesOrNo;
    [SoknadFormField.alderAvAlleFosterbarn]: Array<number>;
}

export type DinArbeidSituasjonFormData = Pick<
    SoknadFormData,
    SoknadFormField.arbeiderINorge | SoknadFormField.borINorge | SoknadFormField.arbeidssituasjon
>;

export type OmAndreForeldrenFormData = Pick<SoknadFormData, SoknadFormField.andreForeldren>;

export type OmBarnaFormData = Pick<
    SoknadFormData,
    | SoknadFormField.antallFellesBarn
    | SoknadFormField.alderYngsteBarn
    | SoknadFormField.harFosterbarn
    | SoknadFormField.alderAvAlleFosterbarn
>;
