import ravisSolarEngineers from '@/assets/gallery-ravi-solar-engineers.jpg';
import helloKakinadaLaunch from '@/assets/gallery-hellokakinada-launch.jpg';
import helloKakinadaAnniversary from '@/assets/gallery-hellokakinada-anniversary.jpg';
import vamsiChestHospital from '@/assets/gallery-vamsi-chest-hospital.jpg';
import rrPropertiesUgadi from '@/assets/gallery-rr-properties-ugadi.jpg';
import rrPropertiesRamNavami from '@/assets/gallery-rr-properties-ram-navami.jpg';

export type GalleryImage = {
  src: string;
  alt: string;
  text: string;
};

export const galleryImages: GalleryImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1755331039789-7e5680e26e8f?q=80&w=1200&auto=format&fit=crop',
    text: 'Creative Direction',
    alt: 'Abstract digital art with a glowing layered composition',
  },
  {
    src: 'https://images.unsplash.com/photo-1755569309049-98410b94f66d?q=80&w=1200&auto=format&fit=crop',
    text: 'Brand Systems',
    alt: 'Modern sculptural form with soft architectural lighting',
  },
  {
    src: 'https://images.unsplash.com/photo-1755497595318-7e5e3523854f?q=80&w=1200&auto=format&fit=crop',
    text: 'Digital Experiences',
    alt: 'Digital artwork with luminous geometric detail',
  },
  {
    src: 'https://images.unsplash.com/photo-1755353985163-c2a0fe5ac3d8?q=80&w=1200&auto=format&fit=crop',
    text: 'Visual Language',
    alt: 'Contemporary abstract artwork with bold forms',
  },
  {
    src: 'https://images.unsplash.com/photo-1745965976680-d00be7dc0377?q=80&w=1200&auto=format&fit=crop',
    text: 'Growth Concepts',
    alt: 'Geometric visual pattern with a premium editorial feel',
  },
  {
    src: 'https://images.unsplash.com/photo-1752588975228-21f44630bb3c?q=80&w=1200&auto=format&fit=crop',
    text: 'Campaign Worlds',
    alt: 'Textured surface study with futuristic visual language',
  },
  {
    src: 'https://pbs.twimg.com/media/Gyla7NnXMAAXSo_?format=jpg&name=large',
    text: 'Social Experiments',
    alt: 'Social media visual reference for creative exploration',
  },
  {
    src: ravisSolarEngineers,
    text: 'Ravi Solar Engineers',
    alt: 'Solar EV charging campaign poster for Ravi Solar Engineers, Kakinada',
  },
  {
    src: helloKakinadaLaunch,
    text: 'HelloKakinada.in',
    alt: 'Brand campaign poster for HelloKakinada.in local business platform',
  },
  {
    src: helloKakinadaAnniversary,
    text: 'HelloKakinada — 1 Year',
    alt: 'One year anniversary campaign poster for HelloKakinada.in',
  },
  {
    src: vamsiChestHospital,
    text: 'Vamsi Chest & Multi Speciality Hospital',
    alt: 'Asthma awareness campaign poster for Vamsi Chest & Multi Speciality Hospital',
  },
  {
    src: rrPropertiesUgadi,
    text: 'RR Properties — Ugadi',
    alt: 'Ugadi festival greeting campaign poster for RR Properties',
  },
  {
    src: rrPropertiesRamNavami,
    text: 'RR Properties — Ram Navami',
    alt: 'Ram Navami festival greeting campaign poster for RR Properties',
  },
];
