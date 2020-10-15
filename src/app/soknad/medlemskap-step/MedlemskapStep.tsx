import React from 'react';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
// import { useIntl } from 'react-intl';
// import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';

const MedlemskapStep = () => {
    // const intl = useIntl();

    return (
        <SoknadFormStep id={StepID.MEDLEMSKAP}>
            <CounsellorPanel>Medlemskap Steg</CounsellorPanel>
        </SoknadFormStep>
    );
};

export default MedlemskapStep;
