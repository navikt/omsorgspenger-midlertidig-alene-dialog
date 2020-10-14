import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import { validateFødselsnummer } from '@navikt/sif-common-core/lib/validation/fieldValidations';
import { ANTALL_DAGER_RANGE } from '../soknad/mottaker-step/MottakerStep';
import { StepID } from '../soknad/soknadStepsConfig';
import { Person } from '../types/Person';
import { DinArbeidSituasjonFormData, OmBarnaFormData, SoknadFormData } from '../types/SoknadFormData';
import { validateFødselsnummerIsDifferentThan } from '../validation/fieldValidation';

const dineBarnIsComplete = ({ andreBarn }: Partial<DineBarnFormData>, barn: Barn[]): boolean => {
    return barn.length > 0 || (andreBarn || []).length > 0;
};

const omBarnaIsComplete = ({
    harAleneomsorg,
    harUtvidetRett,
    harAleneomsorgFor,
    harUtvidetRettFor,
}: Partial<OmBarnaFormData>): boolean => {
    if (harAleneomsorg !== YesOrNo.YES) {
        return false;
    }
    if (harAleneomsorg === YesOrNo.YES && harAleneomsorgFor?.length === 0) {
        return false;
    }
    if (harUtvidetRett === YesOrNo.UNANSWERED) {
        return false;
    }
    if (harUtvidetRett === YesOrNo.YES && harUtvidetRettFor?.length === 0) {
        return false;
    }
    return true;
};

const dinSituasjonIsComplete = ({
    arbeiderINorge,
    borINorge,
    arbeidssituasjon,
}: Partial<DinArbeidSituasjonFormData>): boolean => {
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

const mottakerIsComplete = (
    {
        overføreTilEktefelle,
        overføreTilSamboer,
        fnrMottaker,
        navnMottaker = '',
        antallDagerSomSkalOverføres,
    }: Partial<MottakerFormData>,
    søker: Person
): boolean => {
    if (overføreTilEktefelle === YesOrNo.NO && overføreTilSamboer !== YesOrNo.YES) {
        return false;
    }
    if (overføreTilSamboer === YesOrNo.NO && overføreTilEktefelle !== YesOrNo.YES) {
        return false;
    }
    const fnrValid = validateFødselsnummer(fnrMottaker || '');
    const fnrDifferent = validateFødselsnummerIsDifferentThan(søker.fødselsnummer)(fnrMottaker || '');
    if (fnrValid !== undefined || fnrDifferent !== undefined) {
        return false;
    }
    if ((navnMottaker || '')?.length < 1) {
        return false;
    }

    if (
        antallDagerSomSkalOverføres === undefined ||
        antallDagerSomSkalOverføres < ANTALL_DAGER_RANGE.min ||
        antallDagerSomSkalOverføres > ANTALL_DAGER_RANGE.max
    ) {
        return false;
    }
    return true;
};

export const getAvailableSteps = (values: Partial<SoknadFormData>, søker: Person): StepID[] => {
    const steps: StepID[] = [];
    steps.push(StepID.DIN_SITUASJON);
    if (dinSituasjonIsComplete(values)) {
        steps.push(StepID.OM_ANDRE_FORELDEREN);
    }

    if (omBarnaIsComplete(values)) {
        steps.push(StepID.OPPSUMMERING);
    }

    return steps;
};

export const isStepAvailable = (stepId: StepID, availableSteps: StepID[]): boolean => {
    return availableSteps.find((id) => id === stepId) !== undefined;
};
