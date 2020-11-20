import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import SummaryBlock from '@navikt/sif-common-soknad/lib/soknad-summary/summary-block/SummaryBlock';
import SummarySection from '@navikt/sif-common-soknad/lib/soknad-summary/summary-section/SummarySection';
import { SoknadApiData } from 'app/types/SoknadApiData';
import SummaryList from '@navikt/sif-common-core/lib/components/summary-list/SummaryList';
import Box from '@navikt/sif-common-core/lib/components/box/Box';

interface Props {
    apiValues: SoknadApiData;
}
// TODO: intl
const OmBarnaSummary = ({ apiValues }: Props) => {
    const intl = useIntl();

    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.deres-felles-barn.header')}>
            <>
                <SummaryBlock header={intlHelper(intl, 'step.oppsummering.deres-felles-barn.barn')}>
                    <SummaryList
                        items={apiValues.fødselsårBarn}
                        itemRenderer={(a) => `${intlHelper(intl, 'step.oppsummering.deres-felles-barn.født')} ${a}`}
                    />
                </SummaryBlock>
                <Box margin="m">
                    {intlHelper(intl, 'step.oppsummering.deres-felles-barn.antallBarn')} {apiValues.antallBarn}
                </Box>
            </>
        </SummarySection>
    );
};

export default OmBarnaSummary;
