import { hasValue } from '@navikt/sif-common-core/lib/validation/hasValue';
import { guid } from 'nav-frontend-js-utils';
import { AndreBarn, BarnFormValues } from './types';

const isBarn = (barn: Partial<AndreBarn>): barn is AndreBarn => {
    const { fnr, navn } = barn;
    return hasValue(fnr) && hasValue(navn);
};

const mapFormValuesToPartialAnnetBarn = (formValues: BarnFormValues, id: string | undefined): Partial<AndreBarn> => {
    return {
        ...formValues,
        id: id || guid(),
    };
};

const mapBarnToFormValues = (barn: Partial<AndreBarn>): BarnFormValues => {
    return {
        fnr: barn.fnr,
        navn: barn.navn,
    };
};

const annetBarnUtils = {
    mapBarnToFormValues,
    mapFormValuesToPartialAnnetBarn,
    isBarn,
};

export default annetBarnUtils;
