import React from 'react';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import SoknadFormComponents from '../SoknadFormComponents';
import { AnnenForeldrenSituasjon, SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import {
    validateRequiredField,
    validateYesOrNoIsAnswered,
} from '@navikt/sif-common-core/lib/validation/fieldValidations';
import { useFormikContext } from 'formik';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import FormQuestion from '@navikt/sif-common-soknad/lib/form-question/FormQuestion';
import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
// import TidsperiodeForm from '@navikt/sif-common-forms/lib/tidsperiode/TidsperiodeForm';

const AnnenForelderenSituasjonStep = () => {
    const intl = useIntl();
    const { values } = useFormikContext<SoknadFormData>();
    const addTextboxAndYesNo =
        values.annenForelderSituasjon === AnnenForeldrenSituasjon.sykdom ||
        values.annenForelderSituasjon === AnnenForeldrenSituasjon.annet;

    const kanIkkeFortsette =
        addTextboxAndYesNo &&
        (values.annenForelderPeriodeMer6Maneder === YesOrNo.NO ||
            values.annenForelderPeriodeMer6Maneder === YesOrNo.UNANSWERED);
    return (
        <SoknadFormStep id={StepID.ANNEN_FORELDER_SITUASJON} buttonDisabled={kanIkkeFortsette}>
            <CounsellorPanel>{intlHelper(intl, 'step.annenForeldrensSituasjon.tittel')}</CounsellorPanel>

            <Box margin="xxl">
                <SoknadFormComponents.RadioPanelGroup
                    legend={intlHelper(intl, 'step.annenForeldrensSituasjon.grunn.spm')}
                    name={SoknadFormField.annenForelderSituasjon}
                    radios={[
                        {
                            label: intlHelper(intl, 'step.annenForeldrensSituasjon.grunn.sykdom'),
                            value: AnnenForeldrenSituasjon.sykdom,
                        },
                        {
                            label: intlHelper(intl, 'step.annenForeldrensSituasjon.grunn.innlagtIHelseinstitusjon'),
                            value: AnnenForeldrenSituasjon.innlagtIHelseinstitusjon,
                        },
                        {
                            label: intlHelper(intl, 'step.annenForeldrensSituasjon.grunn.fengsel'),
                            value: AnnenForeldrenSituasjon.fengsel,
                        },
                        {
                            label: intlHelper(intl, 'step.annenForeldrensSituasjon.grunn.verneplikt'),
                            value: AnnenForeldrenSituasjon.utøverVerneplikt,
                        },
                        {
                            label: intlHelper(intl, 'step.annenForeldrensSituasjon.grunn.annet'),
                            value: AnnenForeldrenSituasjon.annet,
                        },
                    ]}
                    validate={validateRequiredField}
                />
            </Box>
            {addTextboxAndYesNo && (
                <>
                    <Box margin="xxl">
                        <SoknadFormComponents.Textarea
                            name={SoknadFormField.annenForelderSituasjonBeskrivelse}
                            label={intlHelper(intl, 'step.annenForeldrensSituasjon.beskrivelseAvSituasjonen.spm')}
                            validate={validateRequiredField}
                            maxLength={1000}
                        />
                    </Box>

                    <FormBlock>
                        <FormQuestion
                            name={SoknadFormField.annenForelderPeriodeMer6Maneder}
                            legend={intlHelper(intl, 'step.annenForeldrensSituasjon.erVarighetMerEnn6Maneder.spm')}
                            validate={validateYesOrNoIsAnswered}
                            showStop={values.annenForelderPeriodeMer6Maneder === YesOrNo.NO}
                            stopMessage={'Stop message'}
                        />
                    </FormBlock>
                </>
            )}
            {values.annenForelderSituasjon && !addTextboxAndYesNo && (
                <FormBlock>
                    <SoknadFormComponents.DateRangePicker
                        legend={
                            values.annenForelderSituasjon === AnnenForeldrenSituasjon.innlagtIHelseinstitusjon
                                ? intlHelper(intl, 'step.annenForeldrensSituasjon.periode.innlagtIHelseinstitusjon.spm')
                                : values.annenForelderSituasjon === AnnenForeldrenSituasjon.fengsel
                                ? intlHelper(intl, 'step.annenForeldrensSituasjon.periode.fengsel.spm')
                                : intlHelper(intl, 'step.annenForeldrensSituasjon.periode.verneplikt.spm')
                        }
                        fromInputProps={{
                            label: intlHelper(intl, 'step.annenForeldrensSituasjon.periode.fra'),
                            // validate: validateFraDatoField,
                            name: SoknadFormField.annenForelderPeriodeFom,
                        }}
                        toInputProps={{
                            label: intlHelper(intl, 'step.annenForeldrensSituasjon.periode.til'),
                            // validate: validateTilDatoField,
                            name: SoknadFormField.annenForelderPeriodeTom,
                        }}
                    />
                </FormBlock>
            )}
        </SoknadFormStep>
    );
};

export default AnnenForelderenSituasjonStep;
