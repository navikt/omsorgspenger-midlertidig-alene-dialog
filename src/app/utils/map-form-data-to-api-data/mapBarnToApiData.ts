import { SoknadFormData } from '../../types/SoknadFormData';

export interface BarnApiData {
    antallBarn: number;
    fødselsårBarn: number[];
}

export const mapBarnToApiData = ({ fødselsårBarn }: SoknadFormData): BarnApiData => {
    return {
        antallBarn: fødselsårBarn.length,
        fødselsårBarn: fødselsårBarn.map((barn) => barn.alders),
    };
};
