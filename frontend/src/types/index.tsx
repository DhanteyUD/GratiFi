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

export type Post = {
  id: string;
  text: string;
  media: string[];
  audience: "everyone" | "communities" | string;
  scheduledAt: string | null;
  createdAt: string;
  isPublished: boolean;
  authorId: string;
  author: {
    id: string;
    name: string;
    email: string;
    picture: string;
    user_type: "GratiStar" | "GratiFan" | string;
    createdAt: string;
    updatedAt: string;
  };
};

export type Wallet = {
  id: string;
  publicKey: string;
};
