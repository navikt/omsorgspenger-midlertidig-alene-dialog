import { hasValue } from '@navikt/sif-common-core/lib/validation/hasValue';

export interface Barn {
    id?: string;
    alders: number;
}

export const isBarn = (barn: Partial<Barn>): barn is Barn => {
    const { alders } = barn;
    return hasValue(alders);
};
