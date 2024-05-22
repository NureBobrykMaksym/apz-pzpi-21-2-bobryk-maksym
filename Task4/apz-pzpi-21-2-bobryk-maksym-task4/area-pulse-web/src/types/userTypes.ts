export interface IUser {
  user: {
    id: number;
    email: string;
    username: string;
    bio: string;
    image: string;
    token: string;
  };
}

export interface ICreateUser {
  user: { email: string; password: string; username: string };
}

export interface ILoginUser {
  user: { email: string; password: string };
}

export interface IUpdateUser {
  user: { bio?: string; image?: string };
}
