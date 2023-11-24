import { useState, useEffect } from 'react';

import useHttp from '../../hooks/use-http';
import { host } from '../../store/store';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

// ==================================================

const UserList = () => {
  const sendRequest = useHttp();

  const [totalUser, setTotalUser] = useState(0);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [page, setPage] = useState(1);

  // Tổng số page
  let totalPage = 1;

  if (totalUser > 9) {
    while (totalPage <= Math.round(totalUser / 9)) {
      totalPage++;
    }
  }

  const pageChangeHandler = (direction) => {
    if (direction === 'next') {
      setPage((prev) => (prev === totalPage ? 1 : prev + 1));
    } else {
      setPage((prev) => (prev === 1 ? totalPage : prev - 1));
    }
  };

  // Render value theo page
  useEffect(() => {
    sendRequest({
      url: `${host}/admin/users?page=${page}&limit=9`,
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        setTotalUser(result.total);
        setCurrentUsers(result.data);
      })
      .catch((err) => console.log(err));
  }, [sendRequest, page]);

  return (
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
            <div>Username</div>
          </th>
          <th>
            <div>Email</div>
          </th>
          <th>
            <div>Full Name</div>
          </th>
          <th>
            <div>Phone Number</div>
          </th>
          <th>
            <div>Card Number</div>
          </th>
        </tr>
      </thead>
      <tbody>
        {currentUsers.map((user) => (
          <tr key={user._id}>
            <td>
              <input type='checkbox' />
            </td>
            <td>{user._id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.fullName}</td>
            <td>{user.phoneNumber}</td>
            <td>{user.cardNumber}</td>
          </tr>
        ))}

        <tr>
          <td colSpan={7} />
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={6} />
          <td>
            <div className='pagination'>
              <p>
                1{currentUsers.length > 1 ? `-${currentUsers.length}` : ''} of{' '}
                {totalUser}
              </p>

              <button
                type='button'
                onClick={pageChangeHandler.bind(null, 'prev')}
              >
                <FaAngleLeft />
              </button>

              <button
                type='button'
                onClick={pageChangeHandler.bind(null, 'next')}
              >
                <FaAngleRight />
              </button>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default UserList;
