import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/db';
import { Project } from '@/models/Project';

const seedProjects = [
  {
    title: 'Christ-Centered Leader Model',
    slug: 'christ-centered-leader-model',
    shortSummary: 'Interactive BYU leadership model that blended accessible front-end development with polished visual storytelling.',
    fullDescription:
      'Designed and developed an interactive web experience for the Sorensen Center that translated a complex leadership framework into a compelling digital model for campus audiences.',
    categories: ['Development', 'UX Design'],
    skills: ['React', 'JavaScript', 'WCAG', 'Figma', 'Responsive Design'],
    role: 'Communications & Marketing Team Lead',
    projectType: 'Interactive Web Experience',
    timeline: '2025',
    featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
    ],
    outcomes: ['Improved engagement on a key Sorensen Center page', 'Created a reusable front-end storytelling pattern'],
    challenges: ['Translating abstract ideas into intuitive interactions', 'Ensuring accessibility across visual components'],
    contributions: ['Led concepting', 'Built front-end interactions', 'Refined accessibility and layout'],
    problem: 'The model needed to be clear, engaging, and easier for students to understand online.',
    approach: 'I created wireframes, refined interaction patterns, and implemented accessible front-end components.',
    implementation: 'Built modular UI sections and interactive states with semantic markup, responsive behavior, and accessibility improvements.',
    features: ['Interactive model states', 'Responsive layout', 'Accessible navigation cues'],
    results: 'The final experience supported stronger storytelling and helped position the center as digitally polished and student-friendly.',
    lessons: 'A strong interaction model only works when content structure, clarity, and accessibility move together.',
    links: [{ label: 'Case Study', url: 'https://example.com' }],
    featured: true,
    published: true
  },
  {
    title: 'CineNiche Streaming Prototype',
    slug: 'cineniche-streaming-prototype',
    shortSummary: 'Prototype streaming platform with a rich interface, search, recommendations, and custom lists.',
    fullDescription:
      'Worked on a team to prototype a streaming product concept with an emphasis on user discovery, personalization, and a premium browsing experience.',
    categories: ['Development', 'UX Design', 'Analysis'],
    skills: ['React', 'TypeScript', 'MongoDB', 'Product Thinking', 'Figma'],
    role: 'Full-Stack / Product Team Member',
    projectType: 'Academic Product Prototype',
    timeline: '2025',
    featuredImage: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [],
    outcomes: ['Produced a polished prototype within a short timeline', 'Balanced UX, development, and prioritization'],
    challenges: ['Defining scope under time pressure', 'Designing for discoverability'],
    contributions: ['Supported interface design', 'Built application views', 'Helped define feature priorities'],
    problem: 'Users needed a niche streaming experience with curated discovery and list management.',
    approach: 'We mapped core user journeys, narrowed the MVP, and focused on the most visible product interactions.',
    implementation: 'Created reusable UI patterns and structured data for project content, search, and user lists.',
    features: ['Search', 'Recommendation sections', 'Custom lists'],
    results: 'The prototype communicated a compelling product concept and demonstrated the team’s ability to execute quickly.',
    lessons: 'Fast product work benefits from clear prioritization and a shared design language.',
    links: [{ label: 'GitHub', url: 'https://github.com' }],
    featured: true,
    published: true
  }
];

async function run() {
  await connectToDatabase();
  await Project.deleteMany({});
  await Project.insertMany(seedProjects);
  console.log('Seed complete');
  await mongoose.disconnect();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
