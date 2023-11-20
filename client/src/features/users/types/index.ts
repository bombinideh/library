import { UserResponse } from "@/features/auth/types";
import { GetManyQueryResponse } from "@/types/api";

export type UsersResponse = GetManyQueryResponse<UserResponse>;
