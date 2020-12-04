import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { yesOrNoIsAnswered } from '@navikt/sif-common-core/lib/utils/yesOrNoUtils';

export enum IntroFormField {
    'erYrkesaktiv' = 'erYrkesaktiv',
    'erAndreForelderenUtAvStandMinst6Måneder' = 'erAndreForelderenUtAvStandMinst6Måneder',
}

export interface IntroFormData {
    [IntroFormField.erYrkesaktiv]: YesOrNo;
    [IntroFormField.erAndreForelderenUtAvStandMinst6Måneder]: YesOrNo;
}

export const introFormInitialValues: Partial<IntroFormData> = {
    [IntroFormField.erYrkesaktiv]: YesOrNo.UNANSWERED,
    [IntroFormField.erAndreForelderenUtAvStandMinst6Måneder]: YesOrNo.UNANSWERED,
};

export enum IntroFormAvslag {
    erIkkeYrkesaktiv = 'erYrkesaktiv',
    erAndreForelderenIkkeUtAvStandMinst6Måneder = 'erAndreForelderenUtAvStandMinst6Måneder',
}

export const getIntroFormAvslag = ({ erYrkesaktiv }: IntroFormData): IntroFormAvslag | undefined => {
    if (erYrkesaktiv === YesOrNo.NO) {
        return IntroFormAvslag.erIkkeYrkesaktiv;
    }

    return undefined;
};

const Q = IntroFormField;

type IntroFormQuestionsPayload = IntroFormData & { avslag: IntroFormAvslag | undefined };

const IntroFormConfig: QuestionConfig<IntroFormQuestionsPayload, IntroFormField> = {
    [Q.erYrkesaktiv]: {
        isAnswered: ({ erYrkesaktiv }) => yesOrNoIsAnswered(erYrkesaktiv),
    },
    [Q.erAndreForelderenUtAvStandMinst6Måneder]: {
        parentQuestion: Q.erYrkesaktiv,
        isIncluded: ({ erYrkesaktiv, avslag }) =>
            yesOrNoIsAnswered(erYrkesaktiv) && avslag !== IntroFormAvslag.erIkkeYrkesaktiv,
        isAnswered: ({ erAndreForelderenUtAvStandMinst6Måneder }) =>
            yesOrNoIsAnswered(erAndreForelderenUtAvStandMinst6Måneder),
    },
};

export const IntroFormQuestions = Questions<IntroFormQuestionsPayload, IntroFormField>(IntroFormConfig);
