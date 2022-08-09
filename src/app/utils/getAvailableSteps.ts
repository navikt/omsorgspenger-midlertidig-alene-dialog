import { Person } from '../types/Person';
import { StepID } from '../soknad/soknadStepsConfig';
import { AnnenForeldrenSituasjon, SoknadFormData } from '../types/SoknadFormData';
import { getFødselsnummerValidator, getStringValidator } from '@navikt/sif-common-formik/lib/validation';
import { validateFradato, validateTildato } from '../validation/fieldValidations';
import datepickerUtils from '@navikt/sif-common-formik/lib/components/formik-datepicker/datepickerUtils';
import { Barn } from '../types/Barn';

export const velkommenIsValid = ({ harForståttRettigheterOgPlikter }: SoknadFormData): boolean =>
    harForståttRettigheterOgPlikter === true;

const omAnnenForelderIsComplete = (formData: SoknadFormData, søker: Person): boolean => {
    const { annenForelderNavn, annenForelderFnr } = formData;
    const annenForelderFnrIsValid =
        getFødselsnummerValidator({
            required: true,
            disallowedValues: [søker.fødselsnummer],
        })(annenForelderFnr) === undefined;

    const annenForelderNavnIsValid =
        getStringValidator({ required: true, minLength: 2, maxLength: 50 })(annenForelderNavn) === undefined;

    return annenForelderFnrIsValid && annenForelderNavnIsValid;
};

const annenForelderSituasjonIsComplete = (formData: SoknadFormData): boolean => {
    const {
        annenForelderSituasjon,
        annenForelderSituasjonBeskrivelse,
        annenForelderPeriodeFom,
        annenForelderPeriodeTom,
        annenForelderPeriodeMer6Maneder,
        annenForelderPeriodeVetIkkeTom,
    } = formData;

    const periodeFraDate = datepickerUtils.getDateFromDateString(annenForelderPeriodeFom);
    const periodeTilDate = datepickerUtils.getDateFromDateString(annenForelderPeriodeTom);

    if (
        annenForelderSituasjon === undefined ||
        (annenForelderPeriodeFom === undefined &&
            validateFradato(annenForelderPeriodeFom, periodeTilDate) !== undefined)
    ) {
        return false;
    }

    if (
        annenForelderSituasjon === AnnenForeldrenSituasjon.utøverVerneplikt ||
        annenForelderSituasjon === AnnenForeldrenSituasjon.fengsel
    ) {
        return (
            annenForelderPeriodeTom !== undefined &&
            validateTildato(annenForelderPeriodeTom, periodeFraDate) === undefined &&
            annenForelderSituasjonBeskrivelse.length === 0
        );
    }

    const periodeIsValid = () =>
        annenForelderPeriodeVetIkkeTom
            ? annenForelderPeriodeMer6Maneder !== undefined
            : annenForelderPeriodeTom !== undefined &&
              validateTildato(annenForelderPeriodeTom, periodeFraDate) === undefined;

    if (annenForelderSituasjon === AnnenForeldrenSituasjon.innlagtIHelseinstitusjon) {
        return periodeIsValid() && annenForelderSituasjonBeskrivelse.length === 0;
    }

    if (
        annenForelderSituasjon === AnnenForeldrenSituasjon.sykdom ||
        annenForelderSituasjon === AnnenForeldrenSituasjon.annet
    ) {
        return (
            getStringValidator({ required: true, minLength: 5, maxLength: 1000 })(annenForelderSituasjonBeskrivelse) ===
                undefined && periodeIsValid()
        );
    }

    return false;
};

const omBarnaIsComplete = (formData: SoknadFormData, barn: Barn[]): boolean => {
    return annenForelderSituasjonIsComplete(formData) && (barn.length > 0 || (formData.andreBarn || []).length > 0);
};

export const getAvailableSteps = (values: SoknadFormData, søker: Person, barn: Barn[]): StepID[] => {
    const steps: StepID[] = [];

    if (velkommenIsValid(values)) {
        steps.push(StepID.OM_ANNEN_FORELDER);
    }

    if (velkommenIsValid(values) && omAnnenForelderIsComplete(values, søker)) {
        steps.push(StepID.ANNEN_FORELDER_SITUASJON);
    }
    if (
        velkommenIsValid(values) &&
        omAnnenForelderIsComplete(values, søker) &&
        annenForelderSituasjonIsComplete(values)
    ) {
        steps.push(StepID.DERES_FELLES_BARN);
    }
    if (
        velkommenIsValid(values) &&
        omAnnenForelderIsComplete(values, søker) &&
        annenForelderSituasjonIsComplete(values) &&
        omBarnaIsComplete(values, barn)
    ) {
        steps.push(StepID.OPPSUMMERING);
    }

    return steps;
};

export const isStepAvailable = (stepId: StepID, availableSteps: StepID[]): boolean => {
    return availableSteps.find((id) => id === stepId) !== undefined;
};
