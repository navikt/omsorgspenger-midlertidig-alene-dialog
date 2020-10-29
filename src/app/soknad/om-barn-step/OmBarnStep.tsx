import React from 'react';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
// import { useIntl } from 'react-intl';
// import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
// import Box from '@navikt/sif-common-core/lib/components/box/Box';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
// import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
// import SoknadFormComponents from '../SoknadFormComponents';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
// import { useFormikContext } from 'formik';
import BarnListAndDialog from '../../pre-common/question-visibility/forms/barn/BarnListAndDialog';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { useFormikContext } from 'formik';
// import Box from '@navikt/sif-common-core/lib/components/box/Box';
import AlertStripe from 'nav-frontend-alertstriper';

/* export const ANTALL_BARN_RANGE = { min: 1, max: 10 };

const getAntallBarnOptions = (): React.ReactNode => {
    const options = [<option key={'none'}></option>];
    let barn = ANTALL_BARN_RANGE.min;
    while (barn <= ANTALL_BARN_RANGE.max) {
        options.push(
            <option key={barn} value={barn}>
                {barn}
            </option>
        );
        barn++;
    }
    return options;
};
const test1 = <>Helo</>;

const createAgePicker = (antallBarn: number) => {
    const test2 = 
    for (let i = 0; i < antallBarn; i++) {
        return test1;
    }
};
*/

const OmBarnaStep = () => {
    // const intl = useIntl();
    const { values } = useFormikContext<SoknadFormData>();

    return (
        <SoknadFormStep id={StepID.OM_BARNA} buttonDisabled={values.fødselsårBarn.length < 1}>
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
