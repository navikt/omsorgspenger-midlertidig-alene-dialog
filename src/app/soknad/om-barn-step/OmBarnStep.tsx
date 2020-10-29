import React from 'react';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import BarnListAndDialog from '../../pre-common/question-visibility/forms/barn/BarnListAndDialog';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { useFormikContext } from 'formik';
import AlertStripe from 'nav-frontend-alertstriper';

const OmBarnaStep = () => {
    const { values } = useFormikContext<SoknadFormData>();

    return (
        <SoknadFormStep id={StepID.OM_BARNA} buttonDisabled={values.fødselsårBarn.length < 1}>
            {
                //TODO intl
            }
            <CounsellorPanel>Om Barna step</CounsellorPanel>

            {values.fødselsårBarn.length === 0 && (
                <FormBlock>
                    <AlertStripe type={'info'}>Du må legge til minst ett barn for å fortsette</AlertStripe>
                </FormBlock>
            )}
            <FormBlock>
                <BarnListAndDialog<SoknadFormField> name={SoknadFormField.fødselsårBarn} />
            </FormBlock>
        </SoknadFormStep>
    );
};

export default OmBarnaStep;
