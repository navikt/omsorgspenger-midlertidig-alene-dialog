import React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import InformationPoster from '@navikt/sif-common-core/lib/components/information-poster/InformationPoster';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import StepBanner from '@navikt/sif-common-core/lib/components/step-banner/StepBanner';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
// import Lenke from 'nav-frontend-lenker';
// import getLenker from '../../lenker';
import { navigateToSoknadFrontpage } from '../../utils/navigationUtils';
import IntroForm from './IntroForm';

const IntroPage = () => {
    const intl = useIntl();
    const history = useHistory();
    return (
        <Page
            title={intlHelper(intl, 'application.title')}
            topContentRenderer={() => <StepBanner text={intlHelper(intl, 'application.title')} />}>
            <Box margin="xxxl">
                <InformationPoster>
                    <p>{intlHelper(intl, 'introForm.info.1')}</p>
                    <ul>
                        <li>{intlHelper(intl, 'introForm.info.grunnList.1')}</li>
                        <li>{intlHelper(intl, 'introForm.info.grunnList.2')}</li>
                        <li>{intlHelper(intl, 'introForm.info.grunnList.3')}</li>
                        <li>{intlHelper(intl, 'introForm.info.grunnList.4')}</li>
                        <li>{intlHelper(intl, 'introForm.info.grunnList.5')}</li>
                    </ul>

                    <p>{intlHelper(intl, 'introForm.info.2')}</p>
                </InformationPoster>
            </Box>
            <FormBlock>
                <IntroForm
                    onValidSubmit={() => {
                        setTimeout(() => {
                            navigateToSoknadFrontpage(history);
                        });
                    }}
                />
            </FormBlock>
        </Page>
    );
};

export default IntroPage;
