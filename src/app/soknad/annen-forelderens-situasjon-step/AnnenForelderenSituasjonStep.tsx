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
import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import AlertStripe from 'nav-frontend-alertstriper';
import moment from 'moment';

export const isPeriodeLess6month = (periodeFom: string, periodeTom: string): boolean => {
    return moment(periodeTom).diff(periodeFom, 'month', true) < 6;
};

export const cleanupnnenForelderenSituasjonStep = (values: SoknadFormData): SoknadFormData => {
    const cleanedValues = { ...values };

    if (values.annenForelderSituasjon === AnnenForeldrenSituasjon.sykdom) {
        cleanedValues.annenForelderPeriodeFom = '';
        cleanedValues.annenForelderPeriodeTom = '';
        cleanedValues.vetLengdePåInnleggelseperioden = YesOrNo.UNANSWERED;
    }

    if (values.annenForelderSituasjon === AnnenForeldrenSituasjon.innlagtIHelseinstitusjon) {
        cleanedValues.annenForelderSituasjonBeskrivelse = '';
        if (values.vetLengdePåInnleggelseperioden === YesOrNo.YES) {
            isPeriodeLess6month(values.annenForelderPeriodeFom, values.annenForelderPeriodeTom)
                ? (cleanedValues.annenForelderPeriodeMer6Maneder = YesOrNo.NO)
                : (cleanedValues.annenForelderPeriodeMer6Maneder = YesOrNo.YES);
        } else {
            cleanedValues.annenForelderPeriodeFom = '';
            cleanedValues.annenForelderPeriodeTom = '';
        }
    }
    if (values.annenForelderSituasjon === AnnenForeldrenSituasjon.fengsel) {
        cleanedValues.annenForelderSituasjonBeskrivelse = '';
        isPeriodeLess6month(values.annenForelderPeriodeFom, values.annenForelderPeriodeTom)
            ? (cleanedValues.annenForelderPeriodeMer6Maneder = YesOrNo.NO)
            : (cleanedValues.annenForelderPeriodeMer6Maneder = YesOrNo.YES);
        cleanedValues.vetLengdePåInnleggelseperioden = YesOrNo.UNANSWERED;
    }
    if (values.annenForelderSituasjon === AnnenForeldrenSituasjon.utøverVerneplikt) {
        cleanedValues.annenForelderSituasjonBeskrivelse = '';
        isPeriodeLess6month(values.annenForelderPeriodeFom, values.annenForelderPeriodeTom)
            ? (cleanedValues.annenForelderPeriodeMer6Maneder = YesOrNo.NO)
            : (cleanedValues.annenForelderPeriodeMer6Maneder = YesOrNo.YES);
        cleanedValues.vetLengdePåInnleggelseperioden = YesOrNo.UNANSWERED;
    }

    if (values.annenForelderSituasjon === AnnenForeldrenSituasjon.annet) {
        cleanedValues.annenForelderPeriodeFom = '';
        cleanedValues.annenForelderPeriodeTom = '';
        cleanedValues.vetLengdePåInnleggelseperioden = YesOrNo.UNANSWERED;
    }
    return cleanedValues;
};

const AnnenForelderenSituasjonStep = () => {
    const intl = useIntl();
    const { values } = useFormikContext<SoknadFormData>();

    const renderTekstArea = () => {
        return (
            <FormBlock>
                <SoknadFormComponents.Textarea
                    name={SoknadFormField.annenForelderSituasjonBeskrivelse}
                    label={intlHelper(intl, 'step.annen-foreldrens-situasjon.beskrivelseAvSituasjonen.spm')}
                    validate={validateRequiredField}
                    maxLength={1000}
                />
            </FormBlock>
        );
    };

    const renderOver6MndSpm = () => {
        return (
            <>
                <FormBlock>
                    <SoknadFormComponents.YesOrNoQuestion
                        name={SoknadFormField.annenForelderPeriodeMer6Maneder}
                        legend={intlHelper(intl, 'step.annen-foreldrens-situasjon.erVarighetMerEnn6Maneder.spm')}
                        validate={validateYesOrNoIsAnswered}
                    />
                    {values.annenForelderPeriodeMer6Maneder === YesOrNo.NO && (
                        <FormBlock>
                            <AlertStripe type={'info'}>
                                {intlHelper(intl, 'step.annen-foreldrens-situasjon.advarsel.1')}
                            </AlertStripe>
                        </FormBlock>
                    )}
                </FormBlock>
            </>
        );
    };

    const renderVetLengdePåInnleggelseperiodenSpm = () => {
        return (
            <FormBlock>
                <SoknadFormComponents.YesOrNoQuestion
                    name={SoknadFormField.vetLengdePåInnleggelseperioden}
                    legend={intlHelper(intl, 'step.annen-foreldrens-situasjon.vetLengdePåInnleggelseperioden.spm')}
                    validate={validateYesOrNoIsAnswered}
                />
            </FormBlock>
        );
    };

    const renderDateRangePicker = () => {
        return (
            <FormBlock>
                <SoknadFormComponents.DateRangePicker
                    legend={
                        values.annenForelderSituasjon === AnnenForeldrenSituasjon.innlagtIHelseinstitusjon
                            ? intlHelper(intl, 'step.annen-foreldrens-situasjon.periode.innlagtIHelseinstitusjon.spm')
                            : values.annenForelderSituasjon === AnnenForeldrenSituasjon.fengsel
                            ? intlHelper(intl, 'step.annen-foreldrens-situasjon.periode.fengsel.spm')
                            : intlHelper(intl, 'step.annen-foreldrens-situasjon.periode.verneplikt.spm')
                    }
                    fromInputProps={{
                        label: intlHelper(intl, 'step.annen-foreldrens-situasjon.periode.fra'),
                        validate: validateRequiredField,
                        name: SoknadFormField.annenForelderPeriodeFom,
                    }}
                    toInputProps={{
                        label: intlHelper(intl, 'step.annen-foreldrens-situasjon.periode.til'),
                        validate: validateRequiredField,
                        name: SoknadFormField.annenForelderPeriodeTom,
                    }}
                />
                {values.annenForelderPeriodeTom &&
                    values.annenForelderPeriodeTom &&
                    isPeriodeLess6month(values.annenForelderPeriodeFom, values.annenForelderPeriodeTom) && (
                        <FormBlock>
                            <AlertStripe type={'info'}>
                                {intlHelper(intl, 'step.annen-foreldrens-situasjon.advarsel.1')}
                            </AlertStripe>
                        </FormBlock>
                    )}
            </FormBlock>
        );
    };

    const renderAlternativer = () => {
        switch (values.annenForelderSituasjon) {
            case AnnenForeldrenSituasjon.sykdom:
                return (
                    <>
                        {renderTekstArea()}
                        {renderOver6MndSpm()}
                    </>
                );
            case AnnenForeldrenSituasjon.annet:
                return (
                    <>
                        {renderTekstArea()}
                        {renderOver6MndSpm()}
                    </>
                );
            case AnnenForeldrenSituasjon.innlagtIHelseinstitusjon:
                return (
                    <>
                        {renderVetLengdePåInnleggelseperiodenSpm()}
                        {values.vetLengdePåInnleggelseperioden === YesOrNo.YES && renderDateRangePicker()}
                        {values.vetLengdePåInnleggelseperioden === YesOrNo.NO && renderOver6MndSpm()}
                    </>
                );
            case AnnenForeldrenSituasjon.fengsel:
                return <>{renderDateRangePicker()}</>;
            case AnnenForeldrenSituasjon.utøverVerneplikt:
                return <>{renderDateRangePicker()}</>;
            default:
                return <></>;
        }
    };
    return (
        <SoknadFormStep id={StepID.ANNEN_FORELDER_SITUASJON} onStepCleanup={cleanupnnenForelderenSituasjonStep}>
            <CounsellorPanel>
                {intlHelper(intl, 'step.annen-foreldrens-situasjon.banner.1')}
                <p>{intlHelper(intl, 'step.annen-foreldrens-situasjon.banner.2')}</p>
            </CounsellorPanel>

            <Box margin="xxl">
                <SoknadFormComponents.RadioPanelGroup
                    legend={intlHelper(intl, 'step.annen-foreldrens-situasjon.grunn.spm')}
                    name={SoknadFormField.annenForelderSituasjon}
                    radios={[
                        {
                            label: intlHelper(intl, 'step.annen-foreldrens-situasjon.grunn.sykdom'),
                            value: AnnenForeldrenSituasjon.sykdom,
                        },
                        {
                            label: intlHelper(intl, 'step.annen-foreldrens-situasjon.grunn.innlagtIHelseinstitusjon'),
                            value: AnnenForeldrenSituasjon.innlagtIHelseinstitusjon,
                        },
                        {
                            label: intlHelper(intl, 'step.annen-foreldrens-situasjon.grunn.fengsel'),
                            value: AnnenForeldrenSituasjon.fengsel,
                        },
                        {
                            label: intlHelper(intl, 'step.annen-foreldrens-situasjon.grunn.verneplikt'),
                            value: AnnenForeldrenSituasjon.utøverVerneplikt,
                        },
                        {
                            label: intlHelper(intl, 'step.annen-foreldrens-situasjon.grunn.annet'),
                            value: AnnenForeldrenSituasjon.annet,
                        },
                    ]}
                    validate={validateRequiredField}
                />
            </Box>
            {renderAlternativer()}
        </SoknadFormStep>
    );
};

export default AnnenForelderenSituasjonStep;
