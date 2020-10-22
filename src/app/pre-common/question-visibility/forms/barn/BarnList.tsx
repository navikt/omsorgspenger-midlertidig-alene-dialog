import React from 'react';
import ActionLink from '@navikt/sif-common-core/lib/components/action-link/ActionLink';
import ItemList from '@navikt/sif-common-core/lib/components/item-list/ItemList';
import { Barn } from './types';

interface Props {
    barna: Barn[];
    onEdit?: (opphold: Barn) => void;
    onDelete?: (opphold: Barn) => void;
}

const BarnList = ({ barna = [], onDelete, onEdit }: Props) => {
    const getBarnTitleString = (barn: Barn) => {
        return (
            <>
                <span style={{ paddingRight: '1rem' }}>Født i {barn.alders}</span>
            </>
        );
    };
    const renderBarnLabel = (barn: Barn): React.ReactNode => {
        return (
            <>
                {onEdit && <ActionLink onClick={() => onEdit(barn)}>{getBarnTitleString(barn)}</ActionLink>}
                {!onEdit && <span>{getBarnTitleString(barn)}</span>}
            </>
        );
    };

    return (
        <>
            <ItemList<Barn>
                getItemId={(barn) => barn.id}
                getItemTitle={() => ''}
                onDelete={onDelete}
                onEdit={onEdit}
                labelRenderer={renderBarnLabel}
                items={barna.filter((barn) => barn.id !== undefined)}
            />
        </>
    );
};

export default BarnList;
