interface Lenker {
    navno: string;
    medlemskap: string;
    personvern: string;
    rettOgPlikt: string;
    saksbehandlingstider: string;
    dittNAV: string;
    merOmFastBostedOgSamvær: string;
    medlemskapIFolketrygden: string;
    soknadRegnetSomAleneBrev: string;
}

const LenkerBokmål: Lenker = {
    navno: 'https://www.nav.no/',
    medlemskap:
        'https://www.nav.no/no/Person/Flere+tema/Arbeid+og+opphold+i+Norge/Relatert+informasjon/medlemskap-i-folketrygden',
    personvern:
        'https://www.nav.no/no/NAV+og+samfunn/Om+NAV/personvern-i-arbeids-og-velferdsetaten/personvernerkl%C3%A6ring-for-arbeids-og-velferdsetaten',
    rettOgPlikt: 'https://nav.no/rettOgPlikt',
    saksbehandlingstider: 'https://www.nav.no/no/NAV+og+samfunn/Om+NAV/Saksbehandlingstider+i+NAV',
    dittNAV: `https://www.nav.no/no/Ditt+NAV`,
    merOmFastBostedOgSamvær: `https://www.regjeringen.no/no/tema/familie-og-barn/innsiktsartikler/bosted-og-samvar/samvar/id749587/`,
    medlemskapIFolketrygden: `https://www.nav.no/no/person/flere-tema/arbeid-og-opphold-i-norge/relatert-informasjon/medlemskap-i-folketrygden`,
    soknadRegnetSomAleneBrev: `https://www.nav.no/soknader/nb/person/familie/omsorgspenger/NAV%2009-06.07/brev`,
};

const getLenker = (locale?: string): Lenker => {
    switch (locale) {
        case 'nn':
            return {
                ...LenkerBokmål,
            };
        default:
            return LenkerBokmål;
    }
};

export default getLenker;
