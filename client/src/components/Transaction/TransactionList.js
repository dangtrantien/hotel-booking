import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import useHttp from '../../hooks/use-http';
import { host } from '../../store/store';

// ==================================================

const TransactionList = () => {
  const sendRequest = useHttp();
  const userId = useSelector((state) => state.user._id);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    sendRequest({
      url: `${host}/hotels/transactions?userId=${userId}`,
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        const newResult = result.map((resData) => {
          const newRoomList = resData.room?.map((r) => r.roomNumber);

          return { ...resData, room: newRoomList };
        });

        return setTransactions(newResult);
      })
      .catch((err) => console.log(err));
  }, [sendRequest, userId]);

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Hotel</th>
          <th>Room</th>
          <th>Date</th>
          <th>Price</th>
          <th>Payment Method</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={index}>
            <td>{String(index + 1).padStart(2, '0')}</td>
            <td>{transaction.hotel?.name}</td>
            <td>{transaction.room.join(', ')}</td>
            <td>
              {transaction.dateStart} - {transaction.dateEnd}
            </td>
            <td>${transaction.price}</td>
            <td>{transaction.payment}</td>
            <td>
              <p
                className={
                  transaction.status === 'Booked'
                    ? 'status booked'
                    : transaction.status === 'Checkin'
                    ? 'status checkin'
                    : 'status checkout'
                }
              >
                {transaction.status}
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionList;
