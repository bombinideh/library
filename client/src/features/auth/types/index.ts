export interface User {
  user_id: number;
  name: string;
  email: string;
  password: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface AuthUserResponse {
  user: User;
  token: string;
}
