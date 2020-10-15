import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
// import { validateFødselsnummer } from '@navikt/sif-common-core/lib/validation/fieldValidations';
// import { ANTALL_DAGER_RANGE } from '../soknad/mottaker-step/MottakerStep';
import { StepID } from '../soknad/soknadStepsConfig';
// import { Person } from '../types/Person';
import { DinSituasjonFormData, OmBarnaFormData, SoknadFormData } from '../types/SoknadFormData';
// import { validateFødselsnummerIsDifferentThan } from '../validation/fieldValidation';

const omBarnaIsComplete = ({}: Partial<OmBarnaFormData>): boolean => {
    return true;
};

const dinSituasjonIsComplete = ({
    arbeiderINorge,
    borINorge,
    arbeidssituasjon,
}: Partial<DinSituasjonFormData>): boolean => {
    if (arbeiderINorge !== YesOrNo.YES) {
        return false;
    }
    if (borINorge === YesOrNo.UNANSWERED) {
        return false;
    }
    if (arbeidssituasjon?.length === 0) {
        return false;
    }
    return true;
};
// export const getAvailableSteps = (values: Partial<SoknadFormData>, søker: Person): StepID[] => {
export const getAvailableSteps = (values: Partial<SoknadFormData>): StepID[] => {
    const steps: StepID[] = [];
    steps.push(StepID.DIN_SITUASJON);
    if (dinSituasjonIsComplete(values)) {
        steps.push(StepID.OM_ANNEN_FORELDER);
    }

    if (omBarnaIsComplete(values)) {
        steps.push(StepID.OPPSUMMERING);
    }

    return steps;
};

export const isStepAvailable = (stepId: StepID, availableSteps: StepID[]): boolean => {
    return availableSteps.find((id) => id === stepId) !== undefined;
};
