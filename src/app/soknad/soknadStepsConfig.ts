import { SoknadApplicationType } from '@navikt/sif-common-soknad/lib/soknad-step/soknadStepTypes';
import soknadStepUtils from '@navikt/sif-common-soknad/lib/soknad-step/soknadStepUtils';

export enum StepID {
    'DIN_ARBEIDSITUASJON' = 'din-arbeidsituasjon',
    'OM_ANNEN_FORELDER' = 'om-annen-forelder',
    'ANNEN_FORELDER_SITUASJON' = 'annen-forelder-situasjon',
    'MEDLEMSKAP' = 'medlemskap',
    'DERES_FELLES_BARN' = 'deres-felles-barn',
    'OPPSUMMERING' = 'oppsummering',
}

const SoknadSteps: StepID[] = [
    StepID.DIN_ARBEIDSITUASJON,
    StepID.OM_ANNEN_FORELDER,
    StepID.ANNEN_FORELDER_SITUASJON,
    StepID.DERES_FELLES_BARN,
    StepID.MEDLEMSKAP,
    StepID.OPPSUMMERING,
];

export const soknadStepsConfig = soknadStepUtils.getStepsConfig(SoknadSteps, SoknadApplicationType.SOKNAD);
