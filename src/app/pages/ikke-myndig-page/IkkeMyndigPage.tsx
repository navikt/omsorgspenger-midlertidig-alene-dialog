import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import FrontPageBanner from '@navikt/sif-common-core/lib/components/front-page-banner/FrontPageBanner';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { Innholdstittel } from 'nav-frontend-typografi';
import './ikkeMyndigPage.less';
import Lenke from 'nav-frontend-lenker';
import getLenker from '../../lenker';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';

const IkkeMyndigPage = () => {
    const intl = useIntl();
    useLogSidevisning(SIFCommonPageKey.ikkeMyndig);

    return (
        <Page
            className="ikkeMyndigPage"
            title={intlHelper(intl, 'page.ikkeMyndig.sidetittel')}
            topContentRenderer={() => (
                <FrontPageBanner
                    bannerSize="xlarge"
                    counsellorWithSpeechBubbleProps={{
                        strongText: intlHelper(intl, 'page.ikkeMyndig.banner.tittel'),
                        normalText: intlHelper(intl, 'page.ikkeMyndig.banner.tekst'),
                        bottomContent: (
                            <Lenke href={getLenker(intl.locale).soknadRegnetSomAleneBrev} target="_blank">
                                <FormattedMessage id="page.ikkeMyndig.banner.lastNed" />
                            </Lenke>
                        ),
                    }}
                />
            )}>
            <Box margin="xxxl">
                <Innholdstittel>
                    <FormattedMessage id="page.ikkeMyndig.tittel" />
                </Innholdstittel>
            </Box>
        </Page>
    );
};

export default IkkeMyndigPage;
