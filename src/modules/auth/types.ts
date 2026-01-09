import type { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type UserGetOne = inferRouterOutputs<AppRouter>["user"]["getOne"];
export type UserGetMany = inferRouterOutputs<AppRouter>["user"]["getMany"]["items"];

/**
 * User session data structure based on login API response
 */
export interface UserSessionData {
  asst_manager_id: string;
  created_date: string;
  designation_id: number;
  device_id: string;
  device_type: string;
  is_active: number;
  is_delete: number;
  profile_picture: string | null;
  profile_picture_base64: string | null;
  project_creation_permission: number;
  project_manager_id: string;
  qa_id: string;
  role_id: number;
  team_id: number;
  updated_date: string;
  user_address: string;
  user_creation_permission: number;
  user_email: string;
  user_id: number;
  user_name: string;
  user_number: string;
  user_tenure: string;
}

/**
 * Login API response structure
 */
export interface LoginResponse {
  data: UserSessionData;
  message: string;
  status: number;
}
