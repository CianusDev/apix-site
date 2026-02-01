"use server";
import { api, processApiData } from "@/config/axios";
import { APIResponse } from "@/config/types";

const endpoint = "/users";

export async function getUsers(): Promise<APIResponse> {
  const handle = api.get(endpoint);
  const result = await processApiData(handle);
  return result;
}
