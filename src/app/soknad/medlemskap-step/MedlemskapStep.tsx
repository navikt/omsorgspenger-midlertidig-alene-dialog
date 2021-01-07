import React from 'react';
import { useIntl } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import ExpandableInfo from '@navikt/sif-common-core/lib/components/expandable-content/ExpandableInfo';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { date1YearAgo, date1YearFromNow, dateToday } from '@navikt/sif-common-core/lib/utils/dateUtils';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { validateYesOrNoIsAnswered } from '@navikt/sif-common-core/lib/validation/fieldValidations';
import { BostedUtland } from '@navikt/sif-common-forms/lib/bosted-utland/types';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import Lenke from 'nav-frontend-lenker';
import getLenker from '../../lenker';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import SoknadFormComponents from '../SoknadFormComponents';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
import BostedsoppholdIUtlandetFormPart from './BostedsoppholdIUtlandetFormPart';
import { medlemskapQuestions } from './MedlemskapConfig';

const getFomForBostedNeste12 = (bosted: BostedUtland[]): Date => {
    const sisteBosted = bosted.length > 0 ? bosted[bosted.length - 1] : undefined;
    if (sisteBosted) {
        return dayjs(sisteBosted.tom).isSame(dateToday, 'day') ? dayjs(dateToday).add(1, 'day').toDate() : dateToday;
    }
    return dateToday;
};

const MedlemskapStep = () => {
    const { values } = useFormikContext<SoknadFormData>();
    const intl = useIntl();
    const questions = medlemskapQuestions.getVisbility(values);

    const neste12FomDate = getFomForBostedNeste12(values.utenlandsoppholdSiste12Mnd);

    return (
        <SoknadFormStep id={StepID.MEDLEMSKAP}>
            <Box padBottom="xxl">
                <CounsellorPanel>
                    {intlHelper(intl, 'steg.medlemsskap.info')}{' '}
                    <Lenke href={getLenker().medlemskap} target="_blank">
                        nav.no
                    </Lenke>
                    .
                </CounsellorPanel>
            </Box>

            <SoknadFormComponents.YesOrNoQuestion
                legend={intlHelper(intl, 'steg.medlemsskap.annetLandSiste12.spm')}
                name={SoknadFormField.harBoddUtenforNorgeSiste12Mnd}
                validate={questions.validate(SoknadFormField.harBoddUtenforNorgeSiste12Mnd)}
                description={
                    <ExpandableInfo title={intlHelper(intl, 'hvaBetyrDette')}>
                        {intlHelper(intl, 'steg.medlemsskap.annetLandSiste12.hjelp')}
                    </ExpandableInfo>
                }
            />
            {questions.isVisible(SoknadFormField.utenlandsoppholdSiste12Mnd) && (
                <FormBlock margin="l">
                    <BostedsoppholdIUtlandetFormPart
                        periode={{ from: date1YearAgo, to: dateToday }}
                        name={SoknadFormField.utenlandsoppholdSiste12Mnd}
                        labels={{
                            addLabel: intlHelper(intl, 'step.medlemskap.knap.leggNyttUtenlandsopphold'),
                            listTitle: intlHelper(intl, 'steg.medlemsskap.annetLandSiste12.listeTittel'),
                            // Fungerer ikke
                            modalTitle: '',
                        }}
                    />
                </FormBlock>
            )}
            <FormBlock>
                <SoknadFormComponents.YesOrNoQuestion
                    legend={intlHelper(intl, 'steg.medlemsskap.annetLandNeste12.spm')}
                    name={SoknadFormField.skalBoUtenforNorgeNeste12Mnd}
                    validate={validateYesOrNoIsAnswered}
                    description={
                        <ExpandableInfo title={intlHelper(intl, 'hvaBetyrDette')}>
                            {intlHelper(intl, 'steg.medlemsskap.annetLandNeste12.hjelp')}
                        </ExpandableInfo>
                    }
                />
            </FormBlock>
            {questions.isVisible(SoknadFormField.utenlandsoppholdNeste12Mnd) && (
                <FormBlock margin="l">
                    <BostedsoppholdIUtlandetFormPart
                        periode={{ from: neste12FomDate, to: date1YearFromNow }}
                        name={SoknadFormField.utenlandsoppholdNeste12Mnd}
                        labels={{
                            addLabel: intlHelper(intl, 'step.medlemskap.knap.leggNyttUtenlandsopphold'),
                            listTitle: intlHelper(intl, 'steg.medlemsskap.annetLandSiste12.listeTittel'),
                            // Fungerer ikke
                            modalTitle: '',
                        }}
                    />
                </FormBlock>
            )}
        </SoknadFormStep>
    );
};

export default MedlemskapStep;
