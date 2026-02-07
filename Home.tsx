import { Hero } from '@/sections/Hero';
import { ProfileCards } from '@/sections/ProfileCards';
import { Experience } from '@/sections/Experience';
import { Presentation } from '@/sections/Presentation';
import { SelectedProjects } from '@/sections/SelectedProjects';
import { Skills } from '@/sections/Skills';
import { Contact } from '@/sections/Contact';

export function Home() {
  return (
    <main>
      <Hero />
      <ProfileCards />
      <Experience />
      <Presentation />
      <SelectedProjects />
      <Skills />
      <Contact />
    </main>
  );
}
