import { MessageFileFormat } from '@navikt/sif-common-core/lib/dev-utils/intl/devIntlUtils';
import { allCommonMessages } from '@navikt/sif-common-core/lib/i18n/allCommonMessages';
import soknadErrorIntlMessages from '@navikt/sif-common-soknad/lib/soknad-error-messages/soknadErrorIntlMessages';
import bostedUtlandMessages from '@navikt/sif-common-forms/lib/bosted-utland/bostedUtlandMessages';
import barnMessages from '../pre-common/question-visibility/forms/barn/barnMessages';

const appMessagesNB = require('./nb.json');
const introFormMessagesNB = require('../pages/intro-page/introFormMessagesNB.json');
const dinePlikterNB = require('../soknad/velkommen-page/dine-plikter/dinePlikterNB.json');
const personopplysningerNB = require('../soknad/velkommen-page/personopplysninger/personopplysningerNB.json');

const bokmålstekster = {
    ...allCommonMessages.nb,
    ...appMessagesNB,
    ...introFormMessagesNB,
    ...dinePlikterNB,
    ...personopplysningerNB,
    ...barnMessages.nb,
    ...soknadErrorIntlMessages.nb,
    ...bostedUtlandMessages.nb,
};
const nynorskstekster = {
    ...allCommonMessages.nn,
    ...soknadErrorIntlMessages.nn,
    ...bostedUtlandMessages.nn,
    ...barnMessages.nn,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
    nn: nynorskstekster,
};
