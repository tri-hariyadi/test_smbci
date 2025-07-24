export interface IApiRequestParams {
  url: string;
  payload?: ILooseObject;
  isMultipart?: boolean;
  isErrorless?: boolean;
}

export interface IApi<T = Any> {
  Response: {
    status: boolean;
    message: string;
    data?: T;
  };

  AuthResponse: {
    access_token: string;
  };

  LoginRequest: {
    email: string;
    password: string;
  };

  RegisterRequest: {
    full_name: string;
    email: string;
    password: string;
  };

  UserProfile: {
    user_id: number;
    full_name: string;
    email: string;
    role: string;
  };

  Books: {
    id: number;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    category: string;
    published_year: number;
    cover_url: string;
    total_copies: number;
    available_copies: number;
    created_at: string;
  };

  RentBook: {
    id: number;
    status: 'BORROWED' | 'RETURNED' | 'LATE';
    book: {
      book_id: number;
      isbn: string;
      title: string;
      author: string;
      publisher: string;
      cover_url: string;
    };
    due_date: string;
    rent_date: string;
    return_date: string | null;
  };

  RentBookRequest: {
    id?: number;
    user_id: number;
    book_id: number;
    due_date: Date;
    return_date?: Date;
    status?: 'BORROWED' | 'RETURNED' | 'LATE';
  };
}
