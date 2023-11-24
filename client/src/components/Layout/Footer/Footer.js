import styles from './Footer.module.css';

// ==================================================

const DUMMY_FOOTER = [
  {
    col_number: 1,
    col_values: [
      'Countries',
      'Regions',
      'Cities',
      'Districts',
      'Airports',
      'Hotels',
    ],
  },
  {
    col_number: 2,
    col_values: [
      'Homes',
      'Apartments',
      'Resorts',
      'Villas',
      'Hostels',
      'Guest houses',
    ],
  },
  {
    col_number: 3,
    col_values: [
      'Unique places to stay',
      'Reviews',
      'Unpacked: Travel articles',
      'Travel communities',
      'Seasonal and holiday deals',
    ],
  },
  {
    col_number: 4,
    col_values: [
      'Car rental',
      'Flight Finder',
      'Restaurant reservations',
      'Travel Agents',
    ],
  },
  {
    col_number: 5,
    col_values: [
      'Curtomer Service',
      'Partner Help',
      'Careers',
      'Sustainability',
      'Press center',
      'Safety Resource Center',
      'Investor relations',
      'Terms & conditions',
    ],
  },
];

const Footer = () => {
  return (
    <footer className={styles['footer-container']}>
      <div className={`container ${styles.container}`}>
        {DUMMY_FOOTER.map((column) => (
          <ul key={column.col_number} className={styles['list-container']}>
            {column.col_values.map((listValue, index) => (
              <li key={index}>
                <a href='#top'>{listValue}</a>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
