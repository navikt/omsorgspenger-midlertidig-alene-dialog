import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
// import JaNeiSvar from '@navikt/sif-common-soknad/lib/soknad-summary/JaNeiSvar';
import SummaryBlock from '@navikt/sif-common-soknad/lib/soknad-summary/summary-block/SummaryBlock';
import SummarySection from '@navikt/sif-common-soknad/lib/soknad-summary/summary-section/SummarySection';
// import { BarnApiData } from '../../utils/map-form-data-to-api-data/mapBarnToApiData';

const OmBarnaSummary = () => {
    const intl = useIntl();

    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.om-barna.header')}>
            <SummaryBlock header={intlHelper(intl, 'step.oppsummering.om-barna.harAleneomsorg')}>
                Oppsummering
            </SummaryBlock>
        </SummarySection>
    );
};

export default OmBarnaSummary;
