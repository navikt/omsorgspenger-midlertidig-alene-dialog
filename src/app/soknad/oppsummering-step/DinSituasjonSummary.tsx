import React from 'react';
import { useIntl } from 'react-intl';
// import SummaryList from '@navikt/sif-common-core/lib/components/summary-list/SummaryList';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
// import JaNeiSvar from '@navikt/sif-common-soknad/lib/soknad-summary/JaNeiSvar';
import SummaryBlock from '@navikt/sif-common-soknad/lib/soknad-summary/summary-block/SummaryBlock';
// import TallSvar from '@navikt/sif-common-soknad/lib/soknad-summary/TallSvar';
// import { DinSituasjonApiData } from '../../utils/map-form-data-to-api-data/mapDinSituasjonToApiData';
import SummarySection from '@navikt/sif-common-soknad/lib/soknad-summary/summary-section/SummarySection';

const DinSituasjonSummary = () => {
    const intl = useIntl();
    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.dinSituasjon.header')}>
            <SummaryBlock header={intlHelper(intl, 'step.oppsummering.dinSituasjon.arbeiderINorge')}>
                Din Situasjon oppsummering
            </SummaryBlock>
        </SummarySection>
    );
};

export default DinSituasjonSummary;
