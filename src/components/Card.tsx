import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { faker } from '@faker-js/faker';
import { DB_URL_USERS } from "../data/_secret";
import { useRead } from '../hooks/useRead';
import { Loader } from '../components/Loader';
import { ErrorMesage } from '../components/ErrorMesage';

function Card() {
  const { id } = useParams();
  const idNumb = id ? parseInt(id) : 0;
  const { users, loading, error, readItm } = useRead();
  const navigate = useNavigate();

  let randomAvatar = faker.image.avatar();
  let randomWord = faker.lorem.words(3);

  const goBack = () => navigate(-1);

  useEffect(() => {
    readItm(idNumb, DB_URL_USERS);
  }, [DB_URL_USERS])

  return (
    <>
      {loading && <Loader />}
      {error && <ErrorMesage error={error} />}
      <button onClick={ goBack }> BACK</button>
      <div className="card m-2 align-items-center" key={users.id}>
        <img src={randomAvatar} className="card-img-top" alt={randomWord} />
        <div className="card-body">
          <div className="card-title fw-bold fs-4">{users.name_en}</div>

          <div>
            <div className="d-inline-flex mb-2">
              <div className="card-text mr-3 fw-medium pt-1">Ф.И.О.:</div>
              <div className="fs-5">{users.name_ru}</div>
            </div>
          </div>

          <div>
            <div className="d-inline-flex mb-2">
              <div className="card-text mr-3 fw-medium pt-1">Должность:</div>
              <div className="fs-5">{users.position}</div>
            </div>
          </div>

          <div>
            <div className="d-inline-flex mb-2">
              <div className="card-text mr-3 fw-medium pt-1">Отдел:</div>
              <div className="fs-5">{users.department}</div>
            </div>
          </div>

          <div>
            <div className="d-inline-flex mb-2">
              <div className="card-text mr-3 fw-medium pt-1">Локация:</div>
              <div className="fs-5">{users.location}</div>
            </div>
          </div>

          <div>
            <div className="d-inline-flex mb-2">
              <div className="card-text mr-3 fw-medium pt-1">E-mail:</div>
              <div className="fs-5">{users.email}</div>
            </div>
          </div>

          <div>
            <div className="d-inline-flex mb-2">
              <div className="card-text mr-3 fw-medium pt-1">Внутренний телефон:</div>
              <div className="fs-5">{users.internal_phone}</div>
            </div>
          </div>

          <div>
            <div className="d-inline-flex mb-2">
              <div className="card-text mr-3 fw-medium pt-1">Мобильный телефон:</div>
              <div className="fs-5">{users.mobile_phone}</div>
            </div>
          </div>

          <div>
            <div className="d-inline-flex mb-2">
              <div className="card-text mr-3 fw-medium pt-1">Фактическое расположение:</div>
              <div className="fs-5">{users.actual_location}</div>
            </div>
          </div>

          <div>
            <div className="d-inline-flex mb-2">
              <div className="card-text mr-3 fw-medium pt-1">День Рождения:</div>
              <div className="fs-5">{users.birthday}</div>
            </div>
          </div>

        </div>
      </div>

    </>
  )
}

export default Card