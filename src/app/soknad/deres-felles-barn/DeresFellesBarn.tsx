import React from 'react';
import { useIntl } from 'react-intl';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { useFormikContext } from 'formik';
import AlertStripe from 'nav-frontend-alertstriper';
import BarnListAndDialog from '../../pre-common/question-visibility/forms/barn/BarnListAndDialog';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import { validateBarn } from '../../validation/fieldValidation';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';

const OmDeresFellesBarnStep = () => {
    const intl = useIntl();
    const { values } = useFormikContext<SoknadFormData>();

    return (
        <SoknadFormStep id={StepID.DERES_FELLES_BARN}>
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
                    validate={validateBarn}
                />
            </FormBlock>
        </SoknadFormStep>
    );
};

export default OmDeresFellesBarnStep;
