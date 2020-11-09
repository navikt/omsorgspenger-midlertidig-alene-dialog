import { validateFødselsnummer } from '@navikt/sif-common-core/lib/validation/fieldValidations';
import { Person } from 'app/types/Person';
import { StepID } from '../soknad/soknadStepsConfig';
import { validateFødselsnummerIsDifferentThan } from '../validation/fieldValidation';
import {
    AnnenForelderFormData,
    AnnenForeldrenSituasjon,
    DinArbeidssituasjonFormData,
    MedlemskapFormData,
    OmBarnaFormData,
    SoknadFormData,
} from '../types/SoknadFormData';
import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';

const dinArbeidsituasjonIsComplete = ({ arbeidssituasjon }: Partial<DinArbeidssituasjonFormData>): boolean => {
    return (arbeidssituasjon || []).length > 0;
};

const omAnnenForelderIsComplete = (
    { annenForelderNavn, annenForelderFnr }: Partial<AnnenForelderFormData>,
    søker: Person
): boolean => {
    return (
        (annenForelderNavn || '')?.length > 0 &&
        validateFødselsnummer(annenForelderFnr || '') === undefined &&
        validateFødselsnummerIsDifferentThan(søker.fødselsnummer)(annenForelderFnr || '') === undefined
    );
};

const annenForelderSituasjonIsComplete = ({
    annenForelderSituasjon,
    annenForelderSituasjonBeskrivelse,
    annenForelderPeriodeFom,
    annenForelderPeriodeTom,
    annenForelderPeriodeMer6Maneder,
    vetLengdePåInnleggelseperioden,
}: Partial<AnnenForelderFormData>): boolean => {
    if (
        annenForelderSituasjon === AnnenForeldrenSituasjon.sykdom ||
        annenForelderSituasjon === AnnenForeldrenSituasjon.annet
    ) {
        return (
            (annenForelderSituasjonBeskrivelse || '').length > 0 &&
            (annenForelderSituasjonBeskrivelse || '').length <= 1000 &&
            annenForelderPeriodeMer6Maneder !== (YesOrNo.UNANSWERED || undefined)
        );
    } else if (
        annenForelderSituasjon === AnnenForeldrenSituasjon.innlagtIHelseinstitusjon &&
        vetLengdePåInnleggelseperioden === YesOrNo.NO
    ) {
        return annenForelderPeriodeMer6Maneder !== undefined;
        // TODO: teste, validate datoer
    } else return annenForelderPeriodeFom !== undefined && annenForelderPeriodeTom !== undefined;
};

const omBarnaIsComplete = ({ fødselsårBarn }: Partial<OmBarnaFormData>): boolean => {
    // TODO: Alders validering hvis trenges
    return (fødselsårBarn || []).length > 0;
};

const medlemskapIsComplete = ({
    harBoddUtenforNorgeSiste12Mnd,
    skalBoUtenforNorgeNeste12Mnd,
    utenlandsoppholdSiste12Mnd,
    utenlandsoppholdNeste12Mnd,
}: Partial<MedlemskapFormData>): boolean => {
    if (harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES && (utenlandsoppholdSiste12Mnd || []).length < 1) {
        return false;
    }
    if (skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES && (utenlandsoppholdNeste12Mnd || []).length < 1) {
        return false;
    }
    return true;
};

export const getAvailableSteps = (values: Partial<SoknadFormData>, søker: Person): StepID[] => {
    const steps: StepID[] = [];
    steps.push(StepID.DIN_ARBEIDSITUASJON);

    if (dinArbeidsituasjonIsComplete(values)) {
        steps.push(StepID.OM_ANNEN_FORELDER);
    }
    if (omAnnenForelderIsComplete(values, søker)) {
        steps.push(StepID.ANNEN_FORELDER_SITUASJON);
    }
    if (annenForelderSituasjonIsComplete(values)) {
        steps.push(StepID.DERES_FELLES_BARN);
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
