import { MessageFileFormat } from '@navikt/sif-common-core/lib/dev-utils/intl/devIntlUtils';
import { allCommonMessages } from '@navikt/sif-common-core/lib/i18n/allCommonMessages';
import soknadIntlMessages from '@navikt/sif-common-soknad/lib/soknad-intl-messages/soknadIntlMessages';
import barnMessages from '../pre-common/forms/barn/barnMessages';
import { velkommenPageMessages } from '../soknad/velkommen-page/velkommenPageMessages';

const appMessagesNB = require('./nb.json');

const bokmålstekster = {
    ...allCommonMessages.nb,
    ...appMessagesNB,
    ...barnMessages.nb,
    ...soknadIntlMessages.nb,
    ...velkommenPageMessages.nb,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};
