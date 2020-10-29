import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import SummaryBlock from '@navikt/sif-common-soknad/lib/soknad-summary/summary-block/SummaryBlock';
import SummarySection from '@navikt/sif-common-soknad/lib/soknad-summary/summary-section/SummarySection';
import { SoknadApiData } from 'app/types/SoknadApiData';
import SummaryList from '@navikt/sif-common-core/lib/components/summary-list/SummaryList';

interface Props {
    apiValues: SoknadApiData;
}

const OmBarnaSummary = ({ apiValues }: Props) => {
    const intl = useIntl();

    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.om-barna.header')}>
            <SummaryBlock header="Barna">
                <SummaryList items={apiValues.fødselsårBarn} itemRenderer={(a) => `Født i ${a}`} />
                Antall barn: {apiValues.antallBarn}
            </SummaryBlock>
        </SummarySection>
    );
};

export default OmBarnaSummary;
