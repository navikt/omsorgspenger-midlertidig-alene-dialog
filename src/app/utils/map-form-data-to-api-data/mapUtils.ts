import { AndreBarn } from 'app/pre-common/question-visibility/forms/barn/types';
import { ApiBarn } from '../../types/SoknadApiData';
import { Barn } from '../../types/SoknadFormData';

export const mapAndreBarnToApiBarn = (annetBarn: AndreBarn): ApiBarn => {
    return {
        navn: annetBarn.navn,
        aktørId: undefined,
        identitetsnummer: annetBarn.fnr,
    };
};

export const mapBarnToApiBarn = (registrertBarn: Barn): ApiBarn => {
    return {
        navn: registrertBarn.navn,
        aktørId: registrertBarn.aktørId,
        identitetsnummer: registrertBarn.identitetsnummer,
    };
};
