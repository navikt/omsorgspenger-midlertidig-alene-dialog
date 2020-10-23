import { SoknadApiData } from '../../types/SoknadApiData';
import { SoknadFormData } from '../../types/SoknadFormData';
import { mapAnnenForelderToApiData } from './mapAnnenForelderToApiData';
import { mapBarnToApiData } from './mapBarnToApiData';
import { mapDinArbeidssituasjonToApiData } from './mapDinArbeidssituasjonToApiData';
import { mapMedlemskapToApiData } from './mapMedlemskapToApiData';

export const mapFormDataToApiData = (
    soknadId: string,
    locale = 'nb',
    formData: SoknadFormData
): SoknadApiData | undefined => {
    try {
        const apiData: SoknadApiData = {
            id: soknadId,
            språk: locale === 'en' ? 'nn' : 'nb',
            harBekreftetOpplysninger: formData.harBekreftetOpplysninger,
            harForståttRettigheterOgPlikter: formData.harForståttRettigheterOgPlikter,
            ...mapDinArbeidssituasjonToApiData(formData),
            ...mapAnnenForelderToApiData(formData),
            ...mapBarnToApiData(formData),
            ...mapMedlemskapToApiData(formData),
        };
        return apiData;
    } catch (error) {
        console.error('mapFormDataToApiData failed', error);
        return undefined;
    }
};
