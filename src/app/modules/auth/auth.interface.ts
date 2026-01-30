export type TLoginRequest = {
  email: string;
  password: string;
};

export type TAuthResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
  };
};
