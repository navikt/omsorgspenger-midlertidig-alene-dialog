import React from 'react';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { SoknadFormField } from '../../types/SoknadFormData';
import SoknadFormComponents from '../SoknadFormComponents';
import {
    validateAll,
    validateFødselsnummer,
    validateRequiredField,
} from '@navikt/sif-common-core/lib/validation/fieldValidations';
import { Person } from 'app/types/Person';
import { validateFødselsnummerIsDifferentThan } from '../../validation/fieldValidation';

type Props = {
    søker: Person;
};

const OmAnnenForelderStep = ({ søker }: Props) => {
    const intl = useIntl();

    return (
        <SoknadFormStep id={StepID.OM_ANNEN_FORELDER}>
            <CounsellorPanel>
                {intlHelper(intl, 'step.om-annen-forelder.banner')}
                <ul>
                    <li>{intlHelper(intl, 'step.om-annen-forelder.banner.list.1')}</li>
                    <li>{intlHelper(intl, 'step.om-annen-forelder.banner.list.2')}</li>
                </ul>
            </CounsellorPanel>

            <FormBlock>
                <SoknadFormComponents.Input
                    name={SoknadFormField.annenForelderFnr}
                    label={intlHelper(intl, 'step.om-annen-forlder.fnr.spm')}
                    validate={validateAll([
                        validateFødselsnummer,
                        validateFødselsnummerIsDifferentThan(søker.fødselsnummer),
                    ])}
                    inputMode="numeric"
                    maxLength={11}
                    minLength={11}
                    style={{ maxWidth: '20rem' }}
                />
            </FormBlock>
            <FormBlock>
                <SoknadFormComponents.Input
                    name={SoknadFormField.annenForelderNavn}
                    label={intlHelper(intl, 'step.om-annen-forlder.navn.spm')}
                    validate={validateRequiredField}
                    style={{ maxWidth: '20rem' }}
                />
            </FormBlock>
        </SoknadFormStep>
    );
};

export default OmAnnenForelderStep;
