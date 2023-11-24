import { useState, useEffect } from 'react';

import Card from '../UI/Card';
import useHttp from '../../hooks/use-http';
import { host } from '../../store/store';

import styles from './RecentTransaction.module.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

// ==================================================

const RecentTransaction = () => {
  const sendRequest = useHttp();

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    sendRequest({
      url: `${host}/admin/recentTransactions`,
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        // Chỉ lấy số phòng
        const newResult = result.map((resData) => {
          const roomNumberList = [];

          resData.room?.map((r) => roomNumberList.push(r.roomNumber));

          return { ...resData, room: roomNumberList };
        });

        return setTransactions(newResult);
      })
      .catch((err) => console.log(err));
  }, [sendRequest]);

  return (
    <Card className={styles['card-container']}>
      <h2>Latest Transactions</h2>

      <table>
        <thead>
          <tr>
            <th>
              <div>
                <input type='checkbox' />
              </div>
            </th>
            <th>
              <div>ID</div>
            </th>
            <th>
              <div>User</div>
            </th>
            <th>
              <div>Hotel</div>
            </th>
            <th>
              <div>Room</div>
            </th>
            <th>
              <div>Date</div>
            </th>
            <th>
              <div>Price</div>
            </th>
            <th>
              <div>Payment Method</div>
            </th>
            <th>
              <div>Status</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>
                <input type='checkbox' />
              </td>
              <td>{transaction._id}</td>
              <td>{transaction.user?.username}</td>
              <td>{transaction.hotel?.name}</td>
              <td>{transaction.room.join(', ')}</td>
              <td>
                {transaction.dateStart} - {transaction.dateEnd}
              </td>
              <td>${transaction.price}</td>
              <td>{transaction.payment}</td>
              <td>
                <div
                  className={
                    transaction.status === 'Booked'
                      ? 'status booked'
                      : transaction.status === 'Checkin'
                      ? 'status checkin'
                      : 'status checkout'
                  }
                >
                  {transaction.status}
                </div>
              </td>
            </tr>
          ))}

          <tr>
            <td colSpan={9} />
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={7} />
            <td colSpan={2}>
              <div className='pagination'>
                <p>
                  1{transactions.length > 1 ? `-${transactions.length}` : ''} of{' '}
                  {transactions.length}
                </p>

                <button type='button' disabled>
                  <FaAngleLeft />
                </button>

                <button type='button' disabled>
                  <FaAngleRight />
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </Card>
  );
};

export default RecentTransaction;
