export type SkillAccent = 'emerald' | 'cyan' | 'purple' | 'amber';

export interface SkillGroup {
  labelKey: string;
  accent: SkillAccent;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    labelKey: 'skills.groups.backend',
    accent: 'emerald',
    items: ['C#/.NET', 'Python', 'PHP', 'REST APIs'],
  },
  {
    labelKey: 'skills.groups.frontend',
    accent: 'cyan',
    items: ['Angular', 'TypeScript', 'TailwindCSS', 'Bootstrap', 'HTML5/CSS3'],
  },
  {
    labelKey: 'skills.groups.data',
    accent: 'purple',
    items: ['PostgreSQL', 'Elasticsearch Stack', 'MySQL', 'MongoDB'],
  },
  {
    labelKey: 'skills.groups.ops',
    accent: 'amber',
    items: ['Docker Containers', 'Git / GitHub Actions', 'CI/CD Jenkins System', 'Linux'],
  },
];