import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import { apiStringDateToDate, prettifyDateExtended } from '@navikt/sif-common-core/lib/utils/dateUtils';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import JaNeiSvar from '@navikt/sif-common-soknad/lib/soknad-summary/JaNeiSvar';
import SummaryBlock from '@navikt/sif-common-soknad/lib/soknad-summary/summary-block/SummaryBlock';
import SummarySection from '@navikt/sif-common-soknad/lib/soknad-summary/summary-section/SummarySection';
import TextareaSvar from '@navikt/sif-common-soknad/lib/soknad-summary/TextareaSvar';
import { AnnenForelder } from '../../types/SoknadApiData';

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
            <SummaryBlock header={intlHelper(intl, 'step.oppsummering.annenForelderensSituasjon.tittel')}>
                <FormattedMessage id={`grunn.${annenForelder.situasjon}`} />
            </SummaryBlock>

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
