import { SoknadApplicationType } from '@navikt/sif-common-soknad/lib/soknad-step/soknadStepTypes';
import soknadStepUtils from '@navikt/sif-common-soknad/lib/soknad-step/soknadStepUtils';

export enum StepID {
    'DIN_ARBEIDSITUASJON' = 'din-arbeidsituasjon',
    'OM_ANNEN_FORELDER' = 'om-annen-forelder',
    'ANNEN_FORELDER_SITUASJON' = 'annen-forelder-situasjon',
    'MEDLEMSKAP' = 'medlemskap',
    'OM_BARNA' = 'om-barna',
    'OPPSUMMERING' = 'oppsummering',
}

const SoknadSteps: StepID[] = [
    StepID.DIN_ARBEIDSITUASJON,
    StepID.OM_ANNEN_FORELDER,
    StepID.ANNEN_FORELDER_SITUASJON,
    StepID.OM_BARNA,
    StepID.MEDLEMSKAP,
    StepID.OPPSUMMERING,
];

export const soknadStepsConfig = soknadStepUtils.getStepsConfig(SoknadSteps, SoknadApplicationType.MELDING);
