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
