import React from 'react';
import { useIntl } from 'react-intl';
import ContentWithHeader from '@navikt/sif-common-core/lib/components/content-with-header/ContentWithHeader';
import ItemList from '@navikt/sif-common-core/lib/components/item-list/ItemList';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { useFormikContext } from 'formik';
import AlertStripe from 'nav-frontend-alertstriper';
import BarnListAndDialog from '../../pre-common/question-visibility/forms/barn/BarnListAndDialog';
import { Barn, SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
import Box from '@navikt/sif-common-core/lib/components/box/Box';

interface Props {
    barn: Barn[];
}

const barnItemLabelRenderer = (barnet: Barn): React.ReactNode => {
    const barnoplysninger = `${barnet.navn} (fnr. ${barnet.identitetsnummer})`;
    return (
        <div style={{ display: 'flex' }}>
            <span style={{ order: 1, paddingLeft: '1rem', justifySelf: 'flex-end' }}>{barnoplysninger}</span>
        </div>
    );
};

const OmDeresFellesBarnStep = ({ barn }: Props) => {
    const intl = useIntl();
    const {
        values: { andreBarn },
    } = useFormikContext<SoknadFormData>();

    const kanFortsette = (barn !== undefined && barn.length > 0) || andreBarn.length > 0;
    return (
        <SoknadFormStep id={StepID.DERES_FELLES_BARN} showSubmitButton={kanFortsette}>
            {barn.length > 0 && (
                <Box margin="xl">
                    <ContentWithHeader header={intlHelper(intl, 'step.deres-felles-barn.listHeader.registrerteBarn')}>
                        <ItemList<Barn>
                            getItemId={(registrerteBarn): string => registrerteBarn.aktørId}
                            getItemTitle={(registrerteBarn): string => registrerteBarn.navn}
                            labelRenderer={(barnet): React.ReactNode => barnItemLabelRenderer(barnet)}
                            items={barn}
                        />
                    </ContentWithHeader>
                </Box>
            )}

            <Box margin="xl">
                <ContentWithHeader
                    header={
                        andreBarn.length === 0
                            ? intlHelper(intl, 'step.deres-felles-barn.spm.andreBarn')
                            : intlHelper(intl, 'step.deres-felles-barn.spm.flereBarn')
                    }>
                    {intlHelper(intl, 'step.deres-felles-barn.info.spm.text')}
                </ContentWithHeader>
            </Box>
            <Box margin="l">
                <BarnListAndDialog<SoknadFormField>
                    name={SoknadFormField.andreBarn}
                    labels={{
                        addLabel: 'Legg til barn',
                        listTitle: 'Andre barn',
                        modalTitle: 'Legg til barn',
                    }}
                />
            </Box>
            {andreBarn.length === 0 && barn.length === 0 && (
                <Box margin="l">
                    <AlertStripe type={'advarsel'}>
                        {intlHelper(intl, 'step.deres-felles-barn.info.ingenbarn.2')}
                    </AlertStripe>
                </Box>
            )}
        </SoknadFormStep>
    );
};

export default OmDeresFellesBarnStep;
