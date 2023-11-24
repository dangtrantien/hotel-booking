import styles from './NavbarLink.module.css';

// ==================================================

const DUMMY_NAV_LINK = [
  {
    type: 'Stays',
    icon: 'fa-bed',
    active: true,
  },
  {
    type: 'Flights',
    icon: 'fa-plane',
    active: false,
  },
  {
    type: 'Car rentals',
    icon: 'fa-car',
    active: false,
  },
  {
    type: 'Attractions',
    icon: 'fa-bed',
    active: false,
  },
  {
    type: 'Airport taxis',
    icon: 'fa-taxi',
    active: false,
  },
];

const NavbarLink = () => {
  return (
    <div className={styles['nav-link--container']}>
      <div className={`container ${styles.container}`}>
        {DUMMY_NAV_LINK.map((navItem, index) => (
          <a
            key={index}
            href='#top'
            className={
              navItem.active ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            <i className={`fa ${navItem.icon}`} />
            {navItem.type}
          </a>
        ))}
      </div>
    </div>
  );
};

export default NavbarLink;
