import { Tutorial, LearningPath } from './types';

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'web-apps',
    title: 'Web Applications',
    description: 'Master React, Next.js, and modern full-stack development.',
    icon: 'Layout',
    color: 'emerald',
  },
  {
    id: 'websites',
    title: 'Websites',
    description: 'Learn HTML, CSS, and responsive design for stunning sites.',
    icon: 'Globe',
    color: 'indigo',
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Apps',
    description: 'Build cross-platform apps with React Native and Flutter.',
    icon: 'Smartphone',
    color: 'violet',
  },
  {
    id: 'backend',
    title: 'Backend Systems',
    description: 'Deep dive into Node.js, databases, and cloud infrastructure.',
    icon: 'Server',
    color: 'amber',
  },
];

export const FEATURED_TUTORIALS: Tutorial[] = [
  {
    id: '1',
    title: 'Building your first React App',
    description: 'A step-by-step guide to creating a modern web application from scratch.',
    category: 'Web App',
    difficulty: 'Beginner',
    duration: '45 mins',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072',
  },
  {
    id: '2',
    title: 'Responsive Design Mastery',
    description: 'Learn how to make your websites look great on any device with Tailwind CSS.',
    category: 'Website',
    difficulty: 'Intermediate',
    duration: '1.5 hours',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=2031',
  },
  {
    id: '3',
    title: 'Introduction to React Native',
    description: 'Start your mobile development journey by building a simple cross-platform app.',
    category: 'Mobile App',
    difficulty: 'Beginner',
    duration: '1 hour',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=2070',
  },
];

export const PROJECTS = [
  {
    id: 'islamic-gpt',
    title: 'Tsmak-Islamic GPT',
    description: 'An Islamic web app that answers all Islamic related questions with evidence from the Quran and Hadith.',
    link: 'https://tsmakislamicgpt.vercel.app',
    image: '/logo1.png',
    tags: ['AI', 'Islamic', 'GPT']
  },
  {
    id: 'nebula',
    title: 'Nebula Attendance system',
    description: 'A collaborative platform designed for modern teams to streamline their workflow and communication.',
    link: 'https://nebula-group-project.vercel.app',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070',
    tags: ['Next.js', 'Tailwind', 'Collaborative']
  },
  {
    id: 'group-black',
    title: 'AttendX Institutional',
    description: 'An elegant, high-performance web application focused on minimalist design and user experience.',
    link: 'https://group-project-teal-seven.vercel.app',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2070',
    tags: ['React', 'Framer Motion', 'UI/UX']
  },
  {
    id: 'lasustech',
    title: 'Lasustech Attendance System',
    description: 'A robust digital attendance management system built for educational institutions to track student presence efficiently.',
    link: 'https://lasustech-attendance-system.vercel.app',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=2070',
    tags: ['Full-stack', 'Database', 'Education']
  }
];
