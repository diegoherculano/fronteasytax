export type UserTokenDecodedType = {
  iss: string;
  sub: string;
  exp: number;
  iat: number;
  roles: Role[];
};

type Role = 'ADMIN' | 'CLIENTE';
