export type AuthType = {
  success: boolean;
  message: string;
  data: Data;
};

type Data = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};
