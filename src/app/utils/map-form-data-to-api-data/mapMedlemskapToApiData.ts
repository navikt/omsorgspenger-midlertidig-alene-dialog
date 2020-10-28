import { Locale } from '@navikt/sif-common-core/lib/types/Locale';
import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import { formatDateToApiFormat } from '@navikt/sif-common-core/lib/utils/dateUtils';
import { getCountryName } from '@navikt/sif-common-formik/lib';
import { BostedUtland } from '@navikt/sif-common-forms/lib/bosted-utland/types';
import { BostedUtlandApiData, SoknadApiData } from '../../types/SoknadApiData';
import { MedlemskapFormData } from '../../types/SoknadFormData';

export const mapBostedUtlandToApiData = (opphold: BostedUtland, locale: string): BostedUtlandApiData => ({
    landnavn: getCountryName(opphold.landkode, locale),
    landkode: opphold.landkode,
    fraOgMed: formatDateToApiFormat(opphold.fom),
    tilOgMed: formatDateToApiFormat(opphold.tom),
});
export const getValidSpråk = (locale?: any): Locale => {
    const loc = typeof locale === 'string' ? locale : 'nb';
    try {
        switch (loc.toLowerCase()) {
            case 'nn':
                return 'nn';
            default:
                return 'nb';
        }
    } catch {
        // appSentryLogger.logInfo('Fallback on getValidSpråk', loc);
        return 'nb';
    }
};

export type AnnenForelderToApiData = Pick<SoknadApiData, 'medlemskap'>;
export const mapMedlemskapToApiData = (formData: MedlemskapFormData): AnnenForelderToApiData => {
    const sprak = getValidSpråk();
    return {
        medlemskap: {
            harBoddIUtlandetSiste12Mnd: formData.harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES,
            skalBoIUtlandetNeste12Mnd: formData.skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES,
            utenlandsoppholdSiste12Mnd:
                formData.harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES
                    ? formData.utenlandsoppholdSiste12Mnd.map((o) => mapBostedUtlandToApiData(o, sprak))
                    : [],
            utenlandsoppholdNeste12Mnd:
                formData.skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES
                    ? formData.utenlandsoppholdNeste12Mnd.map((o) => mapBostedUtlandToApiData(o, sprak))
                    : [],
        },
    };
};
