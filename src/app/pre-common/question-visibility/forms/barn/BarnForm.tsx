import React from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { commonFieldErrorRenderer } from '@navikt/sif-common-core/lib/utils/commonFieldErrorRenderer';
import { validateAll, validateRequiredNumber } from '@navikt/sif-common-core/lib/validation/fieldValidations';
import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import { Systemtittel } from 'nav-frontend-typografi';
import { Barn, isBarn } from './types';
import { guid } from 'nav-frontend-js-utils';
import { dateToday } from '@navikt/sif-common-core/lib/utils/dateUtils';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import ExpandableInfo from '@navikt/sif-common-core/lib/components/expandable-content/ExpandableInfo';

interface BarnFormText {
    form_barn_alders_label: string;
}

interface Props {
    barn?: Partial<Barn>;
    onSubmit: (values: Barn) => void;
    onCancel: () => void;
    text?: BarnFormText;
    selectDescription?: string;
}

enum FosterbarnFormField {
    alders = 'alders',
}

export const ARSTALL_RANGE = { min: dateToday.getFullYear() - 18, max: dateToday.getFullYear() };

const getArstallOptions = (): React.ReactNode => {
    const options = [<option key={'none'}></option>];
    let arastall = ARSTALL_RANGE.min;
    while (arastall <= ARSTALL_RANGE.max) {
        options.push(
            <option key={arastall} value={arastall}>
                {arastall}
            </option>
        );
        arastall++;
    }
    return options;
};

type FormValues = Partial<Barn>;

const Form = getTypedFormComponents<FosterbarnFormField, FormValues>();

const BarnForm = ({
    barn: initialValues = { alders: undefined },
    text,
    onCancel,
    onSubmit,
    selectDescription,
}: Props) => {
    const intl = useIntl();

    const defaultText: BarnFormText = {
        form_barn_alders_label: intlHelper(intl, 'barn.modal.alders_spm.label'),
    };
    const txt = { ...defaultText, ...text };

    const onFormikSubmit = (formValues: FormValues) => {
        if (isBarn(formValues)) {
            onSubmit({ ...formValues, id: initialValues.id || guid() });
        } else {
            throw new Error('Barn skjema: Formvalues is not a valid Barn on submit.');
        }
    };
    const getDescription = (text: string) => {
        return (
            <>
                <ExpandableInfo title={intlHelper(intl, 'barn.modal.hvorfor_spør')}>{text}</ExpandableInfo>
            </>
        );
    };
    return (
        <>
            <Form.FormikWrapper
                initialValues={initialValues}
                onSubmit={onFormikSubmit}
                renderForm={() => (
                    <Form.Form
                        onCancel={onCancel}
                        fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}>
                        <Systemtittel tag="h1">{intlHelper(intl, 'barn.modal.tittel')}</Systemtittel>
                        <FormBlock>
                            <Form.Select
                                name={FosterbarnFormField.alders}
                                label={txt.form_barn_alders_label}
                                validate={validateAll([validateRequiredNumber(ARSTALL_RANGE)])}
                                bredde="s"
                                description={selectDescription ? getDescription(selectDescription) : undefined}>
                                {getArstallOptions()}
                            </Form.Select>
                        </FormBlock>
                    </Form.Form>
                )}
            />
        </>
    );
};

export default BarnForm;
