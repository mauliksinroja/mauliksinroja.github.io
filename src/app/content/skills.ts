import { AiTool, Principle, StackGroup, ToolboxItem } from '../core/models';

const logo = (file: string) => ({ logo: `assets/icons/stack/${file}.svg` });

export const PRINCIPLES: Principle[] = [
  {
    step: '01 · Discovery',
    title: 'You see it before I build it',
    body: 'I bring clickable prototypes to discovery meetings. A requirement that surfaces in week zero costs a conversation; the same one in week four costs a sprint.',
  },
  {
    step: '02 · Architecture',
    title: 'AI-assisted, human-accountable',
    body: 'Claude, Codex and Gemini speed up review and boilerplate. BLoC keeps that output strict and reviewable. Every line that ships is code I can explain and own.',
  },
  {
    step: '03 · Release',
    title: 'Critical fixes in minutes, not days',
    body: 'Production apps ship with Shorebird code push, so a critical bug gets patched without waiting on a store review cycle.',
  },
];

export const AI_TOOLS: AiTool[] = [
  { name: 'Claude', vendor: 'Anthropic', icon: { logo: 'assets/icons/claude.svg' } },
  { name: 'Codex', vendor: 'OpenAI', icon: { symbol: 'code' } },
  { name: 'Gemini', vendor: 'Google', icon: { logo: 'assets/icons/gemini.svg' } },
];

export const STACK: StackGroup[] = [
  {
    title: 'Languages & frameworks',
    items: [
      { label: 'Flutter', icon: logo('flutter') },
      { label: 'Dart', icon: logo('dart') },
      { label: 'Kotlin', icon: logo('kotlin') },
      { label: 'Java', icon: logo('openjdk') },
      { label: 'Swift (learning)', icon: logo('swift') },
    ],
  },
  {
    title: 'Architecture',
    items: [
      { label: 'BLoC', icon: { symbol: 'bloc' } },
      { label: 'MVVM', icon: { symbol: 'arch-layers' } },
      { label: 'MVP', icon: { symbol: 'arch-layers' } },
      { label: 'Jetpack', icon: logo('jetpackcompose') },
    ],
  },
  {
    title: 'Backend & data',
    items: [
      { label: 'Firebase', icon: logo('firebase') },
      { label: 'REST', icon: { symbol: 'api' } },
      { label: 'GraphQL', icon: logo('graphql') },
      { label: 'SQLite', icon: logo('sqlite') },
      { label: 'PostgreSQL', icon: logo('postgresql') },
      { label: 'Cloud Firestore', icon: logo('firebase') },
    ],
  },
  {
    title: 'AI tools',
    items: AI_TOOLS.map((tool) => ({ label: tool.name, icon: tool.icon })),
  },
  {
    title: 'Ship & operate',
    items: [
      { label: 'Shorebird', icon: { symbol: 'patch' } },
      { label: 'CI/CD', icon: { symbol: 'cicd' } },
      { label: 'Jenkins', icon: logo('jenkins') },
      { label: 'Git', icon: logo('git') },
      { label: 'App Store', icon: logo('appstore') },
      { label: 'Google Play', icon: logo('googleplay') },
    ],
  },
];

export const TOOLBOX: ToolboxItem[] = [
  {
    monogram: 'Fl',
    name: 'Flutter & Dart',
    meta: 'Cross-platform · 8 apps here',
    color: '#1f3b63',
  },
  { monogram: 'Kt', name: 'Kotlin', meta: 'Native Android', color: '#4b3a7a' },
  { monogram: 'Bl', name: 'BLoC', meta: 'State management', color: '#25564a' },
  { monogram: 'Fb', name: 'Firebase', meta: 'Auth, data, analytics', color: '#7a5a1c' },
  { monogram: 'Sb', name: 'Shorebird', meta: 'Code push in production', color: '#6b2f52' },
  { monogram: 'Pay', name: 'Payments', meta: 'Stripe, Apple Pay, Google Pay', color: '#9c4a32' },
];
