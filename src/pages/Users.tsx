import { useEffect, useState, useRef } from "react"
import { DB_URL_USERS } from "../data/_secret";
import { IUser } from "../models";
import { Link } from 'react-router-dom';
import { useDelete } from "../hooks/useDelete";

function Users() {
  const hasMounted = useRef(false);
  const [users, setUsers] = useState<IUser[]>([]);

  const [id, setId] = useState(0);

  console.log(id)

  //useDelete(id, DB_URL_USERS);

  //console.log(status);
  if (!hasMounted.current && id !== 0) {
    hasMounted.current = true;
    const { loading, error, status } = useDelete(id, DB_URL_USERS);
  }

  
  useEffect(() => {
    // if (!hasMounted.current) {
      // hasMounted.current = true;
      fetch(DB_URL_USERS)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (Object.keys(data).length === 0 && data.constructor === Object) {
            console.log('Empty data received');
          } else {
            setUsers(data);
          }
        })
        .catch(error => console.error('Error fetching data:', error));
    // }
  }, [users]);
  
  const handleDelete = (user: IUser) => {
    setId(user.id);
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">User name (en)</th>
            <th scope="col">Имя</th>
            <th scope="col">Должность</th>
            <th scope="col">Отдел</th>
            <th scope="col">Локация</th>
            <th scope="col">E-mail</th>
            <th scope="col">Внутренний телефон</th>
            <th scope="col">Мобильный телефон</th>
            <th scope="col">Фактическое расположение</th>
            <th scope="col">День Рождения</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user: IUser, index) => (
              <tr key={index + 1}>
                <td>{user.id}</td>
                <td>{user.name_en}</td>
                <td>{user.name_ru}</td>
                <td>{user.position}</td>
                <td>{user.department}</td>
                <td>{user.location}</td>
                <td>{user.email}</td>
                <td>{user.internal_phone}</td>
                <td>
                  <input type="tel" value={user.mobile_phone} />
                </td>
                <td>{user.actual_location}</td>
                <td>{user.birthday}</td>
                <td>
                  <div className="d-flex align-self-center">
                    <Link to={`/users/${ user.id }`} className="mr-1">
                      <button type="button" className="btn btn-outline-success">R</button>
                    </Link>
                    <Link to="#" className="mr-1">
                      <button type="button" className="btn btn-outline-danger" onClick={(e) => handleDelete(user)}> D </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default Users