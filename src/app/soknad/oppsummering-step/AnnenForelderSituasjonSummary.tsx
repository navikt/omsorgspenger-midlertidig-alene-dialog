import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import SummaryBlock from '@navikt/sif-common-soknad/lib/soknad-summary/summary-block/SummaryBlock';
import SummarySection from '@navikt/sif-common-soknad/lib/soknad-summary/summary-section/SummarySection';
import { AnnenForelder } from '../../types/SoknadApiData';
import JaNeiSvar from '@navikt/sif-common-soknad/lib/soknad-summary/JaNeiSvar';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import TextareaSvar from '@navikt/sif-common-soknad/lib/soknad-summary/TextareaSvar';
import { apiStringDateToDate, prettifyDateExtended } from '@navikt/sif-common-core/lib/utils/dateUtils';
import FormattedHtmlMessage from '@navikt/sif-common-core/lib/components/formatted-html-message/FormattedHtmlMessage';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';

const bem = bemUtils('utenlandsoppholdSummaryItem');
interface Props {
    annenForelder: AnnenForelder;
}

export const renderPeriodeAnnenForelderenKanIkkeHaTilsyn = (fraOgMed: string, tilOgMed: string): React.ReactNode => (
    <div className={bem.block}>
        <span className={bem.element('dates')}>
            {prettifyDateExtended(apiStringDateToDate(fraOgMed))} -{' '}
            {prettifyDateExtended(apiStringDateToDate(tilOgMed))}{' '}
        </span>
    </div>
);

const AnnenForelderSituasjonSummary = ({ annenForelder }: Props) => {
    const intl = useIntl();

    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.annenForelderensSituasjon.header')}>
            <Box margin="l">
                <FormattedHtmlMessage id="step.oppsummering.annenForelderensSituasjon.html" />{' '}
                <FormattedMessage id={`grunn.${annenForelder.situasjon}`} />
            </Box>

            {annenForelder.situasjonBeskrivelse && (
                <SummaryBlock header={intlHelper(intl, 'step.oppsummering.annenForelderensSituasjon.beskrivelse')}>
                    <TextareaSvar text={annenForelder.situasjonBeskrivelse} />
                </SummaryBlock>
            )}

            {!annenForelder.periodeFraOgMed && !annenForelder.periodeTilOgMed && (
                <SummaryBlock
                    header={intlHelper(intl, 'step.oppsummering.annenForelderensSituasjon.erVarighetMerEnn6Maneder')}>
                    <JaNeiSvar harSvartJa={annenForelder.periodeOver6Måneder} />
                </SummaryBlock>
            )}

            {annenForelder.periodeFraOgMed && annenForelder.periodeTilOgMed && (
                <SummaryBlock header={intlHelper(intl, 'step.oppsummering.annenForelderensSituasjon.periode.header')}>
                    {renderPeriodeAnnenForelderenKanIkkeHaTilsyn(
                        annenForelder.periodeFraOgMed,
                        annenForelder.periodeTilOgMed
                    )}
                </SummaryBlock>
            )}
        </SummarySection>
    );
};

export default AnnenForelderSituasjonSummary;
