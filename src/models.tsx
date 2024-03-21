export interface IProduct {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  data: object
};

export interface IUser {
  id: number;
  name_en: string;
  name_ru: string;
  position: string;
  department: string;
  location: string;
  email: string;
  internal_phone: string;
  mobile_phone: string;
  actual_location: string;
  birthday: string;
};

export interface IUserData {
  currentPage: number;
  data: IUser;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};