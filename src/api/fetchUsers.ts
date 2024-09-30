import { userPaginationSchema } from "../types";
import { axiosInstance } from "./common";

export const fetchUsers = async (query?: string, page?: number) => {
  const response = await axiosInstance.get("/search/users", {
    params: { q: query, page },
  });

  try {
    const validatedData = await userPaginationSchema.validate(response.data, {
      abortEarly: false,
    });

    return validatedData;
  } catch (error) {
    console.error("Validation error:", error);
    throw error;
  }
};
