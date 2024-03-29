import React from 'react';
import { render } from 'react-dom';
import { Route, Redirect } from 'react-router-dom';
import { AmplitudeProvider } from '@navikt/sif-common-amplitude/lib';
import { getEnvironmentVariable } from '@navikt/sif-common-core/lib/utils/envUtils';
import SoknadApplication from '@navikt/sif-common-soknad/lib/soknad-application-setup/SoknadApplication';
import SoknadApplicationCommonRoutes from '@navikt/sif-common-soknad/lib/soknad-application-setup/SoknadApplicationCommonRoutes';
import Modal from 'nav-frontend-modal';
import { applicationIntlMessages } from './i18n/applicationMessages';
import SoknadRemoteDataFetcher from './soknad/SoknadRemoteDataFetcher';
import '@navikt/sif-common-core/lib/styles/globalStyles.less';
import './styles/app.less';

Modal.setAppElement('#app');

export const APPLICATION_KEY = 'omsorgsdager-midlertidig-alene';
export const SKJEMANAVN = 'Søknad om ekstra omsorgsdager';

const root = document.getElementById('app');
const publicPath = getEnvironmentVariable('PUBLIC_PATH');

render(
    <AmplitudeProvider applicationKey={APPLICATION_KEY}>
        <SoknadApplication
            appName="Søknad om å bli regnet som midertidig alene for omsorgen"
            intlMessages={applicationIntlMessages}
            sentryKey={APPLICATION_KEY}
            appStatus={{
                applicationKey: APPLICATION_KEY,
                sanityConfig: {
                    projectId: getEnvironmentVariable('APPSTATUS_PROJECT_ID'),
                    dataset: getEnvironmentVariable('APPSTATUS_DATASET'),
                },
            }}
            publicPath={publicPath}>
            <SoknadApplicationCommonRoutes
                contentRoutes={[
                    <Route path="/" key="redirect" exact={true}>
                        <Redirect to="/soknad" />
                    </Route>,
                    <Route path="/soknad" key="soknad" component={SoknadRemoteDataFetcher} />,
                ]}
            />
        </SoknadApplication>
    </AmplitudeProvider>,
    root
);
