import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
// import JaNeiSvar from '@navikt/sif-common-soknad/lib/soknad-summary/JaNeiSvar';
// import SummaryBlock from '@navikt/sif-common-soknad/lib/soknad-summary/summary-block/SummaryBlock';
import SummarySection from '@navikt/sif-common-soknad/lib/soknad-summary/summary-section/SummarySection';
import { BostedUtlandApiData, Medlemskap } from '../../types/SoknadApiData';
import SummaryList from '@navikt/sif-common-core/lib/components/summary-list/SummaryList';
// import { BarnApiData } from '../../utils/map-form-data-to-api-data/mapBarnToApiData';
import JaNeiSvar from '@navikt/sif-common-soknad/lib/soknad-summary/JaNeiSvar';
import SummaryBlock from '@navikt/sif-common-soknad/lib/soknad-summary/summary-block/SummaryBlock';
import ContentWithHeader from '@navikt/sif-common-core/lib/components/content-with-header/ContentWithHeader';
import { apiStringDateToDate, prettifyDateExtended } from '@navikt/sif-common-core/lib/utils/dateUtils';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';

interface Props {
    medlemskap: Medlemskap;
}
const bem = bemUtils('utenlandsoppholdSummaryItem');

export const renderUtenlandsoppholdSummary = (opphold: BostedUtlandApiData): React.ReactNode => (
    <div className={bem.block}>
        <span className={bem.element('dates')}>
            {prettifyDateExtended(apiStringDateToDate(opphold.fraOgMed))} -{' '}
            {prettifyDateExtended(apiStringDateToDate(opphold.tilOgMed))}{' '}
        </span>
        <span className={bem.element('country')}>{opphold.landnavn}</span>
    </div>
);

const MedlemskapSummary = ({ medlemskap }: Props) => {
    const intl = useIntl();
    // steg.oppsummering.medlemskap.utlandetSiste12.liste.header
    return (
        <SummarySection header="Medlemskap">
            <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.medlemskap.utlandetSiste12.header')}>
                <JaNeiSvar harSvartJa={medlemskap.harBoddUtenforNorgeSiste12Mnd} />
                {medlemskap.harBoddUtenforNorgeSiste12Mnd && (
                    <ContentWithHeader
                        header={intlHelper(intl, 'steg.oppsummering.medlemskap.utlandetSiste12.liste.header')}>
                        <SummaryList
                            items={medlemskap.utenlandsoppholdSiste12Mnd}
                            itemRenderer={renderUtenlandsoppholdSummary}
                        />
                    </ContentWithHeader>
                )}
            </SummaryBlock>
            <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.medlemskap.utlandetNeste12.header')}>
                <JaNeiSvar harSvartJa={medlemskap.skalBoIUtlandetNeste12Mnd} />
                {medlemskap.skalBoIUtlandetNeste12Mnd && (
                    <ContentWithHeader
                        header={intlHelper(intl, 'steg.oppsummering.medlemskap.utlandetNeste12.liste.header')}>
                        <SummaryList
                            items={medlemskap.utenlandsoppholdNeste12Mnd}
                            itemRenderer={renderUtenlandsoppholdSummary}
                        />
                    </ContentWithHeader>
                )}
            </SummaryBlock>
        </SummarySection>
    );
};

export default MedlemskapSummary;
