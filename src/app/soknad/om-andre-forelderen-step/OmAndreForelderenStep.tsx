import React from 'react';
import { useIntl } from 'react-intl';
// import Box from '@navikt/sif-common-core/lib/components/box/Box';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
// import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
// import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
// import { prettifyDate } from '@navikt/sif-common-core/lib/utils/dateUtils';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
// import { formatName } from '@navikt/sif-common-core/lib/utils/personUtils';
/*import {
    validateRequiredList,
    validateYesOrNoIsAnswered,
} from '@navikt/sif-common-core/lib/validation/fieldValidations';
*/
// import AlertStripe from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';

// import FormQuestion from '@navikt/sif-common-soknad/lib/form-question/FormQuestion';
import getLenker from '../../lenker';
// import { SoknadFormField } from '../../types/SoknadFormData';
// import SoknadFormComponents from '../SoknadFormComponents';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';

const OmAndreForelderenStep = () => {
    const intl = useIntl();

    return (
        <SoknadFormStep id={StepID.OM_ANDRE_FORELDEREN}>
            <CounsellorPanel>
                {intlHelper(intl, 'step.om-barna.info.1')}
                <p>{intlHelper(intl, 'step.om-barna.info.2')}</p>
                <p>{intlHelper(intl, 'step.om-barna.info.3')}</p>
                <Lenke href={getLenker(intl.locale).merOmFastBostedOgSamvær} target="_blank">
                    {intlHelper(intl, 'lesMerOmFastBostedOgSamvær')}
                </Lenke>
            </CounsellorPanel>
        </SoknadFormStep>
    );
};

export default OmAndreForelderenStep;
