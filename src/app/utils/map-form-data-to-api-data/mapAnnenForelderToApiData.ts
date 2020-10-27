// import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import { AnnenForelderFormData } from '../../types/SoknadFormData';
import { SoknadApiData } from '../../types/SoknadApiData';
import { formatDateToApiFormat } from '@navikt/sif-common-core/lib/utils/dateUtils';
import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';

export type AnnenForelderToApiData = Pick<SoknadApiData, 'annenForelder'>;

export const mapAnnenForelderToApiData = (formData: AnnenForelderFormData): AnnenForelderToApiData => {
    return {
        annenForelder: {
            navn: formData.annenForelderNavn,
            fnr: formData.annenForelderFnr,
            situasjon: formData.annenForelderSituasjon,
            situasjonBeskrivelse: formData.annenForelderSituasjonBeskrivelse,
            periodeFraOgMed: formatDateToApiFormat(formData.annenForelderPeriodeFom),
            periodeTilOgMed: formatDateToApiFormat(formData.annenForelderPeriodeTom),
            periodeOver6Måneder: formData.annenForelderPeriodeMer6Maneder === YesOrNo.YES,
        },
    };
};
