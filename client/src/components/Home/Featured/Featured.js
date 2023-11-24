import FeaturedItem from './FeaturedItem';

import styles from './Featured.module.css';
import HaNoiImg from '../../../asset/images/City Image/Ha Noi.jpg';
import HCMImg from '../../../asset/images/City Image/HCM.jpg';
import DaNangImg from '../../../asset/images/City Image/Da Nang.jpg';

// ==================================================

const cityList = [
  {
    id: 'c1',
    name: 'Ha Noi',
    image: HaNoiImg,
  },
  {
    id: 'c2',
    name: 'Ho Chi Minh',
    image: HCMImg,
  },
  {
    id: 'c3',
    name: 'Da Nang',
    image: DaNangImg,
  },
];

const Featured = () => {
  return (
    <section className={styles['section-featured']}>
      {cityList.map((city) => (
        <FeaturedItem key={city.id} name={city.name} image={city.image} />
      ))}
    </section>
  );
};

export default Featured;
