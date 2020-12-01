import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import {
    DateRange,
    dateRangesCollide,
    dateRangesExceedsRange,
    dateRangesHasFromDateEqualPreviousRangeToDate,
} from '@navikt/sif-common-core/lib/utils/dateUtils';
import {
    createFieldValidationError,
    FieldValidationErrors,
} from '@navikt/sif-common-core/lib/validation/fieldValidations';
import { hasValue } from '@navikt/sif-common-core/lib/validation/hasValue';
import { FieldValidationResult } from '@navikt/sif-common-core/lib/validation/types';
import { Utenlandsopphold } from '@navikt/sif-common-forms/lib/utenlandsopphold/types';

export enum AppFieldValidationErrors {
    fnr_lik_søkerFnr = 'fieldvalidation.mottakersFnrErSøkersFnr',
    utenlandsopphold_ikke_registrert = 'validationText.utenlandsopphold_ikke_registrert',
    utenlandsopphold_overlapper = 'validationText.utenlandsopphold_overlapper',
    utenlandsopphold_utenfor_periode = 'validationText.utenlandsopphold_utenfor_periode',
    utenlandsopphold_overlapper_samme_start_slutt = 'validationText.utenlandsopphold_overlapper_samme_start_slutt',
    mindre_5_bokstaver = 'validationText.mindre_5_bokstaver',
    mer_1000_bokstaver = 'validationText.mer_1000_bokstaver',
}

export const createAppFieldValidationError = (
    error: AppFieldValidationErrors | FieldValidationErrors,
    values?: any
): FieldValidationResult => {
    return createFieldValidationError<AppFieldValidationErrors | FieldValidationErrors>(error, values);
};

export const validateFødselsnummerIsDifferentThan = (applicantFnr: string) => (fnr: string) => {
    if (hasValue(fnr) && applicantFnr === fnr.trim()) {
        return createFieldValidationError(AppFieldValidationErrors.fnr_lik_søkerFnr);
    }
    return undefined;
};

export const isYesOrNoAnswered = (answer: YesOrNo) => {
    return answer === YesOrNo.NO || answer === YesOrNo.YES || answer === YesOrNo.DO_NOT_KNOW;
};

export const validateUtenlandsoppholdIPerioden = (
    periode: DateRange,
    utenlandsopphold: Utenlandsopphold[]
): FieldValidationResult => {
    if (utenlandsopphold.length === 0) {
        return createAppFieldValidationError(AppFieldValidationErrors.utenlandsopphold_ikke_registrert);
    }
    const dateRanges = utenlandsopphold.map((u) => ({ from: u.fom, to: u.tom }));
    if (dateRangesCollide(dateRanges)) {
        return createAppFieldValidationError(AppFieldValidationErrors.utenlandsopphold_overlapper);
    }
    if (dateRangesExceedsRange(dateRanges, periode)) {
        return createAppFieldValidationError(AppFieldValidationErrors.utenlandsopphold_utenfor_periode);
    }
    if (dateRangesHasFromDateEqualPreviousRangeToDate(dateRanges)) {
        return createAppFieldValidationError(AppFieldValidationErrors.utenlandsopphold_overlapper_samme_start_slutt);
    }
    return undefined;
};

export const validateTextArea = (text: string): FieldValidationResult => {
    if (text.length < 5) {
        return createAppFieldValidationError(AppFieldValidationErrors.mindre_5_bokstaver);
    }
    if (text.length > 1000) {
        return createAppFieldValidationError(AppFieldValidationErrors.mer_1000_bokstaver);
    }
    return undefined;
};
