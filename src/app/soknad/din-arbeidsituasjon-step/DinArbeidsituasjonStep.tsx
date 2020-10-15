import React from 'react';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
// import { FormattedMessage, useIntl } from 'react-intl';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';

const DinArbeidsituasjonStep = () => {
    // const intl = useIntl();

    return (
        <SoknadFormStep id={StepID.DIN_ARBEIDSITUASJON}>
            <CounsellorPanel>
                <p>Din arbeidssituasjon</p>
            </CounsellorPanel>
        </SoknadFormStep>
    );
};

export default DinArbeidsituasjonStep;
