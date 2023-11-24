import InfoBoardItem from './InfoBoardItem';
import { host } from '../../store/store';

import styles from './InfoBoard.module.css';
import { HiOutlineUser, HiOutlineShoppingCart } from 'react-icons/hi';
import { TbCoin } from 'react-icons/tb';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';

// ==================================================

const infoList = [
  {
    id: 'i1',
    url: `${host}/admin/users?page=1&limit=9`,
    title: 'Users',
    icon: (
      <div
        style={{ backgroundColor: 'rgba(255, 201, 201, 0.5)' }}
        className={styles['icon-container']}
      >
        <HiOutlineUser style={{ color: '#e03131' }} />
      </div>
    ),
    isMoney: false,
  },
  {
    id: 'i2',
    url: `${host}/admin/transactions?page=1&limit=9`,
    title: 'Orders',
    icon: (
      <div
        style={{ backgroundColor: 'rgba(255, 236, 153, 0.5)' }}
        className={styles['icon-container']}
      >
        <HiOutlineShoppingCart style={{ color: '#f08c00' }} />
      </div>
    ),
    isMoney: false,
  },
  {
    id: 'i3',
    url: `${host}/admin/earnings`,
    title: 'Earnings',
    icon: (
      <div
        style={{ backgroundColor: 'rgba(178, 242, 187, 0.5)' }}
        className={styles['icon-container']}
      >
        <TbCoin style={{ color: '#2f9e44' }} />
      </div>
    ),
    isMoney: true,
  },
  {
    id: 'i4',
    url: `${host}/admin/balances`,
    title: 'Balance',
    icon: (
      <div
        style={{ backgroundColor: 'rgba(238, 190, 250, 0.5)' }}
        className={styles['icon-container']}
      >
        <MdOutlineAccountBalanceWallet style={{ color: '#9c36b5' }} />
      </div>
    ),
    isMoney: true,
  },
];

const InfoBoard = () => {
  return (
    <div className={styles.container}>
      {infoList.map((info) => (
        <InfoBoardItem
          key={info.id}
          url={info.url}
          title={info.title}
          icon={info.icon}
          isMoney={info.isMoney}
        />
      ))}
    </div>
  );
};

export default InfoBoard;
