import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ExpandableInfo from '@navikt/sif-common-core/lib/components/expandable-content/ExpandableInfo';
import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import { commonFieldErrorRenderer } from '@navikt/sif-common-core/lib/utils/commonFieldErrorRenderer';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { validateYesOrNoIsAnswered } from '@navikt/sif-common-core/lib/validation/fieldValidations';
import { getTypedFormComponents, UnansweredQuestionsInfo } from '@navikt/sif-common-formik/lib';
import { QuestionVisibilityContext } from '@navikt/sif-common-soknad/lib/question-visibility/QuestionVisibilityContext';
import {
    getIntroFormAvslag,
    IntroFormAvslag,
    IntroFormData,
    IntroFormField,
    introFormInitialValues,
    IntroFormQuestions,
} from './introFormConfig';
import IntroFormQuestion from './IntroFormQuestion';

interface Props {
    onValidSubmit: () => void;
}

const IntroFormComponents = getTypedFormComponents<IntroFormField, IntroFormData>();

const IntroForm = ({ onValidSubmit }: Props) => {
    const intl = useIntl();
    return (
        <IntroFormComponents.FormikWrapper
            initialValues={introFormInitialValues}
            onSubmit={() => {
                onValidSubmit();
            }}
            renderForm={({ values }) => {
                const avslag = getIntroFormAvslag(values);
                const visibility = IntroFormQuestions.getVisbility({
                    ...values,
                    avslag,
                });
                const kanFortsette = visibility.areAllQuestionsAnswered() && avslag === undefined;
                return (
                    <IntroFormComponents.Form
                        includeValidationSummary={true}
                        includeButtons={kanFortsette}
                        fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
                        submitButtonLabel={intlHelper(intl, 'introForm.start')}
                        noButtonsContentRenderer={() =>
                            visibility.areAllQuestionsAnswered() ? undefined : (
                                <UnansweredQuestionsInfo>
                                    <FormattedMessage id="page.form.ubesvarteSpørsmålInfo" />
                                </UnansweredQuestionsInfo>
                            )
                        }>
                        <QuestionVisibilityContext.Provider value={{ visibility }}>
                            <IntroFormQuestion
                                name={IntroFormField.erYrkesaktiv}
                                validate={validateYesOrNoIsAnswered}
                                showStop={avslag === IntroFormAvslag.erIkkeYrkesaktiv}
                                stopMessage={<>{intlHelper(intl, 'introForm.erYrkesaktiv.stopMessage')}</>}
                                description={
                                    <ExpandableInfo title={intlHelper(intl, 'introForm.hvaBetyrDette')}>
                                        {intlHelper(intl, 'introForm.erYrkesaktiv.forklaring.1')}
                                        <ul>
                                            <li>{intlHelper(intl, 'introForm.arbeidstaker')}</li>
                                            <li>{intlHelper(intl, 'introForm.selvstendigNæringsdrivende')}</li>
                                            <li>{intlHelper(intl, 'introForm.frilanser')}</li>
                                        </ul>
                                    </ExpandableInfo>
                                }
                            />
                            <IntroFormQuestion
                                name={IntroFormField.erAndreForelderenUtAvStandMinst6Måneder}
                                validate={validateYesOrNoIsAnswered}
                                showStop={values.erAndreForelderenUtAvStandMinst6Måneder === YesOrNo.NO}
                                stopMessage={
                                    <>
                                        {intlHelper(
                                            intl,
                                            'introForm.erAndreForelderenUtAvStandMinst6Måneder.stopMessage'
                                        )}
                                    </>
                                }
                            />
                        </QuestionVisibilityContext.Provider>
                    </IntroFormComponents.Form>
                );
            }}
        />
    );
};

export default IntroForm;
