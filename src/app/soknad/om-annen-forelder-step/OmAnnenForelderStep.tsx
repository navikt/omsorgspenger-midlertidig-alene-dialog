import React from 'react';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
// import { useIntl } from 'react-intl';
// import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
// import Box from '@navikt/sif-common-core/lib/components/box/Box';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
// import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';

const OmAnnenForelderStep = () => {
    // const intl = useIntl();

    return (
        <SoknadFormStep id={StepID.OM_ANNEN_FORELDER}>
            <CounsellorPanel>Om den andre forelderen</CounsellorPanel>
        </SoknadFormStep>
    );
};

export default OmAnnenForelderStep;
