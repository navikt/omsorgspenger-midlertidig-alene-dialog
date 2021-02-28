import { SoknadApiData } from '../../types/SoknadApiData';
import { SoknadFormData } from '../../types/SoknadFormData';
import { mapAnnenForelderToApiData } from './mapAnnenForelderToApiData';
import { mapBarnToApiData } from './mapBarnToApiData';

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
            ...mapAnnenForelderToApiData(formData),
            ...mapBarnToApiData(formData),
        };
        return apiData;
    } catch (error) {
        console.error('mapFormDataToApiData failed', error);
        return undefined;
    }
};
