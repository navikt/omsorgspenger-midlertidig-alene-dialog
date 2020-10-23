import { SoknadFormData } from '../../types/SoknadFormData';

export interface BarnApiData {
    antallBarn: number;
    alderAvAlleBarn: number[];
}

export const mapBarnToApiData = ({ alderAvAlleBarn }: SoknadFormData): BarnApiData => {
    return {
        antallBarn: alderAvAlleBarn.length,
        alderAvAlleBarn: alderAvAlleBarn.map((barn) => barn.alders),
    };
};
