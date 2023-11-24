import PropertyItem from './PropertyItem';

import styles from './PropertyList.module.css';
import Type1 from '../../../asset/images/type_1.webp';
import Type2 from '../../../asset/images/type_2.jpg';
import Type3 from '../../../asset/images/type_3.jpg';
import Type4 from '../../../asset/images/type_4.jpg';
import Type5 from '../../../asset/images/type_5.jpg';

// ==================================================

const types = [
  {
    id: 't1',
    title: 'Hotels',
    type: 'hotel',
    image: Type1,
  },
  {
    id: 't2',
    title: 'Apartments',
    type: 'apartment',
    image: Type2,
  },
  {
    id: 't3',
    title: 'Resorts',
    type: 'resort',
    image: Type3,
  },
  {
    id: 't4',
    title: 'Villas',
    type: 'villa',
    image: Type4,
  },
  {
    id: 't5',
    title: 'Cabins',
    type: 'cabin',
    image: Type5,
  },
];

const PropertyList = () => {
  return (
    <section className={styles['section-property']}>
      <h2>Browse by property type</h2>

      <div className={styles['card-container']}>
        {types.map((type) => (
          <PropertyItem
            key={type.id}
            title={type.title}
            type={type.type}
            image={type.image}
          />
        ))}
      </div>
    </section>
  );
};

export default PropertyList;
