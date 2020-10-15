import React from 'react';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
// import { useIntl } from 'react-intl';
// import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';

const AnnenForelderenSituasjonStep = () => {
    // const intl = useIntl();

    return (
        <SoknadFormStep id={StepID.ANNEN_FORELDER_SITUASJON}>
            <CounsellorPanel>Om den andre forelderens situasjon</CounsellorPanel>
        </SoknadFormStep>
    );
};

export default AnnenForelderenSituasjonStep;
