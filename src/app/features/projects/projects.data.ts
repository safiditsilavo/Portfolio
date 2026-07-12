export type ProjectAccent = 'emerald' | 'cyan' | 'amber' | 'purple';

export interface Project {
  title: string;
  description: string;
  tags: string[];
  icon: string;
  accent: ProjectAccent;
  isPrivate: boolean;
}

export const PROJECTS: Project[] = [
  {
    title: 'Enterprise Search Engine',
    description: 'Designed a distributed search microservice running real-time Elasticsearch aggregations. Cut server query load durations by 60% over massive database clusters.',
    tags: ['#Elasticsearch', '#Python', '#FastAPI', '#Docker'],
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    accent: 'emerald',
    isPrivate: true,
  },
  {
    title: 'Monolith Migration Program',
    description: 'Spearheaded decomposition of complex legacy PHP services into light, decoupled NestJS containers, dramatically improving development delivery times.',
    tags: ['#NestJS', '#TypeScript', '#PHP-Migration', '#K8s'],
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547',
    accent: 'cyan',
    isPrivate: true,
  },
  {
    title: 'CI/CD Automated Highway',
    description: 'Designed parallel execution testing pipelines. Shortened feedback cycle speed, allowing safe release operations directly triggered on GitHub pushes.',
    tags: ['#Jenkins', '#Bash-Scripting', '#Automation', '#GithubActions'],
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    accent: 'amber',
    isPrivate: true,
  },
  {
    title: 'Admin Security Panel',
    description: 'Building a secure inventory gateway management dashboard, implementing modern reactive signals architecture with Angular.',
    tags: ['#Angular', '#Signals', '#Tailwind', '#TailoredDesign'],
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    accent: 'purple',
    isPrivate: false,
  },
];