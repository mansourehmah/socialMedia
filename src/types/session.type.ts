export type SessionType = {
  session: Session;
  user: User;
};

type Session = {
  expiresAt: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  ipAddress: string;
  userAgent: string;
  userId: string;
  id: string;
};

type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  location?: string;
  website?: string;
  followers?: number;
  following?: number;
  createdAt: string;
  updatedAt: string;
};
