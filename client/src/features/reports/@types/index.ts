import { GetManyQueryResponse } from "@/@types/api";
import { User } from "@/features/users/@types";

export interface Report {
  log_id: number;
  user_id: User["user_id"];
  description: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  created_at: Date;
}

export interface ReportResponse extends Report {
  user_name: User["name"];
}

export type ReportsResponse = GetManyQueryResponse<ReportResponse>;
