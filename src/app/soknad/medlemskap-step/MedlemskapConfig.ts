import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import { validateYesOrNoIsAnswered } from '@navikt/sif-common-core/lib/validation/fieldValidations';
import { FieldValidationResult } from '@navikt/sif-common-core/lib/validation/types';
import { QuestionConfig, Questions } from '../../pre-common/question-visibility/questions/Questions';
import { isYesOrNoAnswered } from '../../validation/fieldValidation';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';

const medlemsskapQuestionConfig: QuestionConfig<SoknadFormData, SoknadFormField, FieldValidationResult> = {
    [SoknadFormField.harBoddUtenforNorgeSiste12Mnd]: {
        isAnswered: ({ harBoddUtenforNorgeSiste12Mnd }) => isYesOrNoAnswered(harBoddUtenforNorgeSiste12Mnd),
        validate: ({ harBoddUtenforNorgeSiste12Mnd }) => validateYesOrNoIsAnswered(harBoddUtenforNorgeSiste12Mnd),
    },
    [SoknadFormField.utenlandsoppholdSiste12Mnd]: {
        isIncluded: ({ harBoddUtenforNorgeSiste12Mnd }) => harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES,
        isAnswered: ({ utenlandsoppholdSiste12Mnd }) => utenlandsoppholdSiste12Mnd.length > 0,
    },
    [SoknadFormField.skalBoUtenforNorgeNeste12Mnd]: {
        isAnswered: ({ skalBoUtenforNorgeNeste12Mnd }) => isYesOrNoAnswered(skalBoUtenforNorgeNeste12Mnd),
        validate: ({ skalBoUtenforNorgeNeste12Mnd }) => validateYesOrNoIsAnswered(skalBoUtenforNorgeNeste12Mnd),
    },
    [SoknadFormField.utenlandsoppholdNeste12Mnd]: {
        isIncluded: ({ skalBoUtenforNorgeNeste12Mnd }) => skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES,
        isAnswered: ({ utenlandsoppholdNeste12Mnd }) => utenlandsoppholdNeste12Mnd.length > 0,
    },
};

export const medlemskapQuestions = Questions<SoknadFormData, SoknadFormField, FieldValidationResult>(
    medlemsskapQuestionConfig
);
