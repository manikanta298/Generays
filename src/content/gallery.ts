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
    alt: 'Solar EV charging campaign poster for Ravi Solar Engineers, Kakinada',
    text: 'Ravi Solar Engineers',
  },
  {
    src: helloKakinadaLaunch,
    alt: 'Brand campaign poster for HelloKakinada.in local business platform',
    text: 'HelloKakinada Launch',
  },
  {
    src: vamsiChestHospital,
    alt: 'Asthma awareness campaign poster for Vamsi Chest & Multi Speciality Hospital',
    text: 'Vamsi Chest Hospital',
  },
  {
    src: rrPropertiesUgadi,
    alt: 'Ugadi festival greeting campaign poster for RR Properties',
    text: 'RR Properties — Ugadi',
  },
  {
    src: rrPropertiesRamNavami,
    alt: 'Ram Navami festival greeting campaign poster for RR Properties',
    text: 'RR Properties — Ram Navami',
  },
  {
    src: helloKakinadaAnniversary,
    alt: 'One year anniversary campaign poster for HelloKakinada.in',
    text: 'HelloKakinada Anniversary',
  },
];
