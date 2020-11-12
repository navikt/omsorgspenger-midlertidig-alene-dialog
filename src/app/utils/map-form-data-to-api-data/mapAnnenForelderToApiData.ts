import { AnnenForelderFormData } from '../../types/SoknadFormData';
import { SoknadApiData } from '../../types/SoknadApiData';
import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';

export type AnnenForelderToApiData = Pick<SoknadApiData, 'annenForelder'>;

export const mapAnnenForelderToApiData = (formData: AnnenForelderFormData): AnnenForelderToApiData => {
    return {
        annenForelder: {
            navn: formData.annenForelderNavn,
            fnr: formData.annenForelderFnr,
            situasjon: formData.annenForelderSituasjon,
            situasjonBeskrivelse:
                formData.annenForelderSituasjonBeskrivelse && formData.annenForelderSituasjonBeskrivelse.length > 0
                    ? formData.annenForelderSituasjonBeskrivelse
                    : undefined,
            periodeFraOgMed:
                formData.annenForelderPeriodeFom && formData.annenForelderPeriodeFom.length > 0
                    ? formData.annenForelderPeriodeFom
                    : undefined,
            periodeTilOgMed:
                formData.annenForelderPeriodeTom && formData.annenForelderPeriodeTom.length > 0
                    ? formData.annenForelderPeriodeTom
                    : undefined,
            periodeOver6Måneder: formData.annenForelderPeriodeMer6Maneder === YesOrNo.YES,
            vetLengdePåInnleggelseperioden:
                formData.vetLengdePåInnleggelseperioden ||
                formData.vetLengdePåInnleggelseperioden !== YesOrNo.UNANSWERED
                    ? formData.vetLengdePåInnleggelseperioden === YesOrNo.YES
                    : undefined,
        },
    };
};
