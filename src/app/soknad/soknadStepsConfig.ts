import { SoknadApplicationType } from '@navikt/sif-common-soknad/lib/soknad-step/soknadStepTypes';
import soknadStepUtils from '@navikt/sif-common-soknad/lib/soknad-step/soknadStepUtils';

export enum StepID {
    'DIN_SITUASJON' = 'din-situasjon',
    'OM_ANNEN_FORELDER' = 'om-andre-forelderen',
    'OM_BARNA' = 'om-barna',
    'OPPSUMMERING' = 'oppsummering',
}

const SoknadSteps: StepID[] = [StepID.DIN_SITUASJON, StepID.OM_ANNEN_FORELDER, StepID.OM_BARNA, StepID.OPPSUMMERING];

export const soknadStepsConfig = soknadStepUtils.getStepsConfig(SoknadSteps, SoknadApplicationType.MELDING);
