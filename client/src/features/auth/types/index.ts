export interface User {
  user_id: number;
  name: string;
  email: string;
  password: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export type UserResponse = Omit<User, "password">;

export interface AuthUserResponse {
  user: UserResponse;
  token: string;
}
