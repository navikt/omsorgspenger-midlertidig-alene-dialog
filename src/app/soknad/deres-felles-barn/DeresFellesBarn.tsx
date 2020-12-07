import React from 'react';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import BarnListAndDialog from '../../pre-common/question-visibility/forms/barn/BarnListAndDialog';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { useFormikContext } from 'formik';
import AlertStripe from 'nav-frontend-alertstriper';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { useIntl } from 'react-intl';

const OmDeresFellesBarnStep = () => {
    const intl = useIntl();
    const { values } = useFormikContext<SoknadFormData>();

    return (
        <SoknadFormStep id={StepID.DERES_FELLES_BARN} buttonDisabled={values.fødselsårBarn.length < 1}>
            <CounsellorPanel>{intlHelper(intl, 'step.deres-felles-barn.banner')}</CounsellorPanel>

            {values.fødselsårBarn.length === 0 && (
                <FormBlock>
                    <AlertStripe type={'info'}>{intlHelper(intl, 'step.deres-felles-barn.stopMessage')}</AlertStripe>
                </FormBlock>
            )}
            <FormBlock>
                <BarnListAndDialog<SoknadFormField>
                    name={SoknadFormField.fødselsårBarn}
                    selectDescription={intlHelper(intl, 'step.deres-felles-barn.hvorforSpører.svar')}
                />
            </FormBlock>
        </SoknadFormStep>
    );
};

export default OmDeresFellesBarnStep;
