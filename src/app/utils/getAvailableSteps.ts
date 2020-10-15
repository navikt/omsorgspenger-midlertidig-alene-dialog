// import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
// import { validateFødselsnummer } from '@navikt/sif-common-core/lib/validation/fieldValidations';
// import { ANTALL_DAGER_RANGE } from '../soknad/mottaker-step/MottakerStep';
import { StepID } from '../soknad/soknadStepsConfig';
// import { Person } from '../types/Person';
import {
    AnnenForelderSituasjonFormData,
    DinSituasjonFormData,
    MedlemskapFormData,
    OmAnnenForelderFormData,
    OmBarnaFormData,
    SoknadFormData,
} from '../types/SoknadFormData';
// import { validateFødselsnummerIsDifferentThan } from '../validation/fieldValidation';

const dinArbeidsituasjonIsComplete = ({}: Partial<DinSituasjonFormData>): boolean => {
    return true;
};

const omAnnenForelderIsComplete = ({}: Partial<OmAnnenForelderFormData>): boolean => {
    return true;
};

const annenForelderSituasjonIsComplete = ({}: Partial<AnnenForelderSituasjonFormData>): boolean => {
    return true;
};

const medlemskapIsComplete = ({}: Partial<MedlemskapFormData>): boolean => {
    return true;
};

const omBarnaIsComplete = ({}: Partial<OmBarnaFormData>): boolean => {
    return true;
};

// export const getAvailableSteps = (values: Partial<SoknadFormData>, søker: Person): StepID[] => {
export const getAvailableSteps = (values: Partial<SoknadFormData>): StepID[] => {
    const steps: StepID[] = [];
    steps.push(StepID.DIN_ARBEIDSITUASJON);

    if (dinArbeidsituasjonIsComplete(values)) {
        steps.push(StepID.OM_ANNEN_FORELDER);
    }
    if (omAnnenForelderIsComplete(values)) {
        steps.push(StepID.ANNEN_FORELDER_SITUASJON);
    }
    if (annenForelderSituasjonIsComplete(values)) {
        steps.push(StepID.OM_BARNA);
    }

    if (omBarnaIsComplete(values)) {
        steps.push(StepID.MEDLEMSKAP);
    }

    if (medlemskapIsComplete(values)) {
        steps.push(StepID.OPPSUMMERING);
    }

    return steps;
};

export const isStepAvailable = (stepId: StepID, availableSteps: StepID[]): boolean => {
    return availableSteps.find((id) => id === stepId) !== undefined;
};
