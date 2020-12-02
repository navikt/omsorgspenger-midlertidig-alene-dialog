import React from 'react';
import { FormikModalFormAndList, FormikValidateFunction } from '@navikt/sif-common-formik';
import BarnForm from './BarnForm';
import BarnList from './BarnList';
import { Barn } from './types';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { useIntl } from 'react-intl';

interface Props<FieldNames> {
    name: FieldNames;
    validate?: FormikValidateFunction;
    selectDescription?: string;
}

function BarnListAndDialog<FieldNames>({ name, validate, selectDescription }: Props<FieldNames>) {
    const intl = useIntl();

    return (
        <>
            <FormikModalFormAndList<FieldNames, Barn>
                name={name}
                labels={{
                    addLabel: intlHelper(intl, 'barn.list.legg_til_knapp'),
                    modalTitle: intlHelper(intl, 'barn.modal.tittel'),
                    listTitle: intlHelper(intl, 'barn.list.tittel'),
                }}
                dialogWidth="narrow"
                validate={validate}
                formRenderer={({ onSubmit, onCancel, item }) => (
                    <BarnForm
                        barn={item}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                        selectDescription={selectDescription}
                    />
                )}
                listRenderer={({ items, onEdit, onDelete }) => (
                    <BarnList barna={items} onEdit={onEdit} onDelete={onDelete} />
                )}
            />
        </>
    );
}

export default BarnListAndDialog;
