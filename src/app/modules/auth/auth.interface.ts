export type TLoginRequest = {
  email: string;
  password: string;
};

export type TRegisterRequest = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
};

export type TRefreshTokenRequest = {
  refreshToken: string;
};

export type TAuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
};
