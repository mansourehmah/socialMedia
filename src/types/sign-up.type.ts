export type SignUpType = {
  token: string;
  user: User;
};

type User = {
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  id: string;
};
