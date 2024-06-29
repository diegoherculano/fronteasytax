import { ClientType } from './ClientType';

export type TransactionsType = {
  success: boolean;
  message: string;
  data: ClientType[];
};
