import { FC } from "react";
import { IUser } from "../models";
import { Link } from "react-router-dom";

interface ITableProps {
  data: IUser;
  handleDelete: (user: IUser) => void;
}

export const Table: FC<ITableProps> = ({ data, handleDelete }) => {
  
  return (
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
      <tbody className="mt-5">
        {
          data && Array.isArray(data) && data.map((user: IUser, index: number) => (
            <tr key={index + 1}>
              <td>{user.id}</td>
              <td>{user.name_en}</td>
              <td>{user.name_ru}</td>
              <td>{user.position}</td>
              <td>{user.department}</td>
              <td>{user.location}</td>
              <td>{user.email}</td>
              <td>{user.internal_phone}</td>
              <td>{user.mobile_phone}</td>
              <td>{user.actual_location}</td>
              <td>{user.birthday}</td>
              <td>
                <div className="d-flex align-self-center">
                  <Link to={`/users/${user.id}`} className="mr-1">
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
  )
}







