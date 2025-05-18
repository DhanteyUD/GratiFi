export type User = {
  id: string;
  name: string;
  email: string;
  picture: string;
  user_type: string;
  createdAt: string;
  updatedAt: string;
  Wallet: Wallet[];
};

export type Wallet = {
  id: string;
  publicKey: string;
};
