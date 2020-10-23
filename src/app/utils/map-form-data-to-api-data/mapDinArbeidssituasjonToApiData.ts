import { SoknadApiData } from '../../types/SoknadApiData';
import { DinArbeidssituasjonFormData } from '../../types/SoknadFormData';

export type DinArbeidssituasjonApiData = Pick<SoknadApiData, 'arbeidssituasjon'>;

export const mapDinArbeidssituasjonToApiData = (formData: DinArbeidssituasjonFormData): DinArbeidssituasjonApiData => {
    return {
        arbeidssituasjon: formData.arbeidssituasjon,
    };
};
