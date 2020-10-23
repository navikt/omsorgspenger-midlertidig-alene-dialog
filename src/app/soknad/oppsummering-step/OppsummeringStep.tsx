import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { isPending } from '@devexperts/remote-data-ts';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
// import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import Guide from '@navikt/sif-common-core/lib/components/guide/Guide';
// import ResponsivePanel from '@navikt/sif-common-core/lib/components/responsive-panel/ResponsivePanel';
import VeilederSVG from '@navikt/sif-common-core/lib/components/veileder-svg/VeilederSVG';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { validateBekrefterOpplysninger } from '@navikt/sif-common-core/lib/validation/fieldValidations';
// import { AlertStripeFeil } from 'nav-frontend-alertstriper';
// import { Person } from '../../types/Person';
// import { SoknadApiData } from '../../types/SoknadApiData';
import { SoknadFormField } from '../../types/SoknadFormData';
import { useSoknadContext } from '../SoknadContext';
import SoknadFormComponents from '../SoknadFormComponents';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
import { SoknadApiData } from 'app/types/SoknadApiData';
import { Person } from 'app/types/Person';

type Props = {
    søker: Person;
    apiValues?: SoknadApiData;
};

const OppsummeringStep = ({ søker, apiValues }: Props) => {
    const intl = useIntl();
    const { sendSoknadStatus } = useSoknadContext();

    return (
        <SoknadFormStep
            id={StepID.OPPSUMMERING}
            includeValidationSummary={false}
            showButtonSpinner={isPending(sendSoknadStatus.status)}
            buttonDisabled={isPending(sendSoknadStatus.status)}>
            <Box margin="xxxl">
                <Guide kompakt={true} type="normal" svg={<VeilederSVG />}>
                    <FormattedMessage id="step.oppsummering.info" />
                </Guide>

                <>
                    <Box margin="xxl">oppsummering</Box>
                    {console.log(apiValues)}
                    {console.log(søker)}
                    <Box margin="l">
                        <SoknadFormComponents.ConfirmationCheckbox
                            label={intlHelper(intl, 'step.oppsummering.bekrefterOpplysninger')}
                            name={SoknadFormField.harBekreftetOpplysninger}
                            validate={validateBekrefterOpplysninger}
                        />
                    </Box>
                </>
            </Box>
        </SoknadFormStep>
    );
};

export default OppsummeringStep;
