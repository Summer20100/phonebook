import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { secret } from "../data/_secret";
import { faker } from '@faker-js/faker';
import { IUser } from "../models";
import { DB_URL_USERS } from "../data/_secret";
import { useRead } from '../hooks/useRead';

function Card() {
  const { id } = useParams();
  const idNumb = parseInt(id);

  console.log(typeof idNumb);
  const { users, loading, error } = useRead(idNumb, DB_URL_USERS);
  
  let randomAvatar = faker.image.avatar();
  let randomWord = faker.lorem.words(3);
 
  return (
      <>
        {
          users.map(user => (
            <div className="card m-2 align-items-center" key={ user.id }>
              <img src={ randomAvatar } className="card-img-top" alt={ randomWord } />
              <div className="card-body">
                <div className="card-title fw-bold fs-4">{ user.name_en }</div>

                <div>
                  <div className="d-inline-flex mb-2">
                    <div className="card-text mr-3 fw-medium pt-1">Ф.И.О.:</div>
                    <div className="fs-5">{ user.name_ru }</div>
                  </div>
                </div>

                <div>
                  <div className="d-inline-flex mb-2">
                    <div className="card-text mr-3 fw-medium pt-1">Должность:</div>
                    <div className="fs-5">{ user.position }</div>
                  </div>
                </div>

                <div>
                  <div className="d-inline-flex mb-2">
                    <div className="card-text mr-3 fw-medium pt-1">Отдел:</div>
                    <div className="fs-5">{ user.department }</div>
                  </div>
                </div>

                <div>
                  <div className="d-inline-flex mb-2">
                    <div className="card-text mr-3 fw-medium pt-1">Локация:</div>
                    <div className="fs-5">{ user.location }</div>
                  </div>
                </div>

                <div>
                  <div className="d-inline-flex mb-2">
                    <div className="card-text mr-3 fw-medium pt-1">E-mail:</div>
                    <div className="fs-5">{ user.email }</div>
                  </div>
                </div>

                <div>
                  <div className="d-inline-flex mb-2">
                    <div className="card-text mr-3 fw-medium pt-1">Внутренний телефон:</div>
                    <div className="fs-5">{ user.internal_phone }</div>
                  </div>
                </div>

                <div>
                  <div className="d-inline-flex mb-2">
                    <div className="card-text mr-3 fw-medium pt-1">Мобильный телефон:</div>
                    <div className="fs-5">{ user.mobile_phone }</div>
                  </div>
                </div>

                <div>
                  <div className="d-inline-flex mb-2">
                    <div className="card-text mr-3 fw-medium pt-1">Фактическое расположение:</div>
                    <div className="fs-5">{ user.actual_location }</div>
                  </div>
                </div>

                <div>
                  <div className="d-inline-flex mb-2">
                    <div className="card-text mr-3 fw-medium pt-1">День Рождения:</div>
                    <div className="fs-5">{ user.birthday }</div>
                  </div>
                </div>

              </div>
            </div>
          ))}
      </>
  )
}

export default Card