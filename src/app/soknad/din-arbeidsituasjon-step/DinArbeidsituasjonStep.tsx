import React from 'react';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
import { useIntl } from 'react-intl';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import SoknadFormComponents from '../SoknadFormComponents';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { Arbeidssituasjon, SoknadFormField } from '../../types/SoknadFormData';
import { validateRequiredList } from '@navikt/sif-common-core/lib/validation/fieldValidations';

const DinArbeidsituasjonStep = () => {
    const intl = useIntl();

    return (
        <SoknadFormStep id={StepID.DIN_ARBEIDSITUASJON}>
            <CounsellorPanel>
                <p>Din arbeidssituasjon</p>
            </CounsellorPanel>
            <FormBlock>
                <SoknadFormComponents.CheckboxPanelGroup
                    legend={intlHelper(intl, 'step.din-arbeidsituasjon.spm')}
                    name={SoknadFormField.arbeidssituasjon}
                    checkboxes={[
                        {
                            value: Arbeidssituasjon.arbeidstaker,
                            label: intlHelper(intl, `arbeidssituasjon.${Arbeidssituasjon.arbeidstaker}`),
                        },
                        {
                            value: Arbeidssituasjon.selvstendigNæringsdrivende,
                            label: intlHelper(intl, `arbeidssituasjon.${Arbeidssituasjon.selvstendigNæringsdrivende}`),
                        },
                        {
                            value: Arbeidssituasjon.frilanser,
                            label: intlHelper(intl, `arbeidssituasjon.${Arbeidssituasjon.frilanser}`),
                        },
                    ]}
                    validate={validateRequiredList}
                />
            </FormBlock>
        </SoknadFormStep>
    );
};

export default DinArbeidsituasjonStep;
