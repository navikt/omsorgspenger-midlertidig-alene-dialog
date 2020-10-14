import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import { AndreForelderen, SoknadFormData, SoknadFormField } from '../types/SoknadFormData';

const initialAndreForeldren: AndreForelderen = {
    fornavn: '',
    etternavn: '',
    fnr: '',
    situasjon: '',
    situasjonFom: new Date(),
    situasjonTom: new Date(),
};

export const initialSoknadFormData: Partial<SoknadFormData> = {
    [SoknadFormField.harForståttRettigheterOgPlikter]: false,
    [SoknadFormField.harBekreftetOpplysninger]: false,
    [SoknadFormField.borINorge]: YesOrNo.UNANSWERED,
    [SoknadFormField.arbeiderINorge]: YesOrNo.UNANSWERED,
    [SoknadFormField.arbeidssituasjon]: [],
    [SoknadFormField.andreForeldren]: initialAndreForeldren,
    [SoknadFormField.antallFellesBarn]: 0,
    [SoknadFormField.alderYngsteBarn]: 0,
    [SoknadFormField.harFosterbarn]: YesOrNo.UNANSWERED,
    [SoknadFormField.alderAvAlleFosterbarn]: [],
};
