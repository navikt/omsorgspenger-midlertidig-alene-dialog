import React from 'react';
import SummaryList from '@navikt/sif-common-core/lib/components/summary-list/SummaryList';
import { ApiBarn } from '../../types/SoknadApiData';

interface Props {
    barn: ApiBarn[];
}

const BarnSummaryList = ({ barn }: Props) => {
    return (
        <SummaryList
            items={barn}
            itemRenderer={({ identitetsnummer, navn }: ApiBarn): string => {
                const fnr = identitetsnummer ? ` (fnr. ${identitetsnummer})` : '';
                return `${navn}${fnr}`;
            }}
        />
    );
};

export default BarnSummaryList;
