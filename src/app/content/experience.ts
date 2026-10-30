import { Certification, Job } from '../core/models';

export const JOBS: Job[] = [
  {
    role: 'Mobile Product Developer & Consultant',
    organisation: 'Freelance · Flutter & Android · international clients',
    description:
      'I help startups, founders and product teams turn ideas into production apps for Android and iOS — owning requirements, architecture, UI, API and payment integrations, store releases and post-launch support.',
    period: '2024 – now',
  },
  {
    role: 'Senior Application Developer (Flutter)',
    organisation: 'Pseudocode Infotech · Ahmedabad',
    description:
      'Built Flutter apps for clients in India and Australia — mapping client needs to product features, shaping system design and integrations with the wider team, and keeping support and documentation to a consistent standard.',
    period: '2021 – 2024',
  },
  {
    role: 'Software Engineer, Mobile',
    organisation: 'TxLabs · Ahmedabad',
    description:
      'Built Android apps in Kotlin and moved into Flutter for Android and iOS. Worked with Coroutines, Retrofit, Room, WorkManager and Dagger on MVVM, added SSL pinning, Crashlytics and QR scanning, and advised clients on platform and architecture.',
    period: '2018 – 2021',
  },
  {
    role: 'Android Developer',
    organisation: 'Wama Software · Ahmedabad',
    description:
      'Started in native Android with Java, then Kotlin — connecting apps to REST back ends with Retrofit, building offline storage on SQLite, and shipping push notifications and Material Design UI.',
    period: '2015 – 2018',
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Marwadi Ratna Award — 1st rank',
    issuer: 'Marwadi Education Foundation · 2015 · MCA 2014–2016',
    icon: 'star',
    iconSize: 20,
    kind: 'award',
  },
  {
    title: 'Problem Solving (Basic)',
    issuer: 'HackerRank',
    icon: 'hackerrank',
    iconSize: 18,
    kind: 'certificate',
    url: 'https://www.hackerrank.com/maulik_sinroja',
  },
  {
    title: 'Cloud Computing Workshop',
    issuer: 'EMC · 2014',
    icon: 'cert',
    iconSize: 20,
    kind: 'certificate',
  },
  {
    title: 'Synergy 2015 — Transformation',
    issuer: 'State-level mega symposium · 2015',
    icon: 'mic',
    iconSize: 20,
    kind: 'certificate',
  },
  {
    title: 'AMCAT Certified',
    issuer: 'AMCAT employability assessment',
    icon: 'cert',
    iconSize: 20,
    kind: 'certificate',
  },
];
