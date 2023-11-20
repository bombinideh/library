import { UserResponse } from "@/features/users/types";

export interface AuthUserResponse {
  user: UserResponse;
  token: string;
}
