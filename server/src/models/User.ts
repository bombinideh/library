export interface IUser {
  user_id: number;
  name: string;
  email: string;
  password: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UserResponse extends Omit<IUser, "password"> {
  password?: IUser["password"];
}
