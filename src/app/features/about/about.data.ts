export interface TimelineEntry {
  titleKey: string;
  organization: string;
  location: string;
  periodKey: string;
  bulletKeys: string[];
  icon: string;
  current?: boolean;
}

const ICON_CODE = 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4';
const ICON_BRIEFCASE =
  'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10';
const ICON_ACADEMIC =
  'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222';

export const EXPERIENCES: TimelineEntry[] = [
  {
    titleKey: 'about.experience.comete.role',
    organization: 'Comete.ai',
    location: 'Antananarivo',
    periodKey: 'about.experience.comete.period',
    bulletKeys: [1, 2, 3, 4].map(n => `about.experience.comete.b${n}`),
    icon: ICON_CODE,
    current: true,
  },
  {
    titleKey: 'about.experience.etech.role',
    organization: 'Etech Consulting',
    location: 'Antananarivo',
    periodKey: 'about.experience.etech.period',
    bulletKeys: [1, 2, 3, 4, 5].map(n => `about.experience.etech.b${n}`),
    icon: ICON_BRIEFCASE,
  },
];

export const EDUCATION: TimelineEntry[] = [
  {
    titleKey: 'about.education.master.degree',
    organization: 'Institut Supérieur Polytechnique de Madagascar',
    location: 'Antananarivo',
    periodKey: 'about.education.master.period',
    bulletKeys: [],
    icon: ICON_ACADEMIC,
  },
  {
    titleKey: 'about.education.licence.degree',
    organization: 'Institut Supérieur Polytechnique de Madagascar',
    location: 'Antananarivo',
    periodKey: 'about.education.licence.period',
    bulletKeys: [],
    icon: ICON_ACADEMIC,
  },
  {
    titleKey: 'about.education.bac.degree',
    organization: 'Lycée Privé Saint Joseph',
    location: 'Antsirabe',
    periodKey: 'about.education.bac.period',
    bulletKeys: [],
    icon: ICON_ACADEMIC,
  },
];