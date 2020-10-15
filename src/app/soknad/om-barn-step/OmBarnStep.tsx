import React from 'react';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
// import { useIntl } from 'react-intl';
// import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
// import Box from '@navikt/sif-common-core/lib/components/box/Box';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';

const OmBarnaStep = () => {
    // const intl = useIntl();

    return (
        <SoknadFormStep id={StepID.OM_BARNA}>
            <CounsellorPanel>Om Barna step</CounsellorPanel>
        </SoknadFormStep>
    );
};

export default OmBarnaStep;
