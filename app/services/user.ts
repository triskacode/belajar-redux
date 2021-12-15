import { BaseQuery } from "@app/config/base-query";
import { UserEntity } from "@app/domain/user.entity";
import { CreateUserDto } from "@app/dto/user/create-user.dto";
import { RootState } from "@app/store";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["User"],
  baseQuery: BaseQuery.initiate({
    baseUrl: process.env.API_BASE_URL + "/users",
    prepareHeaders: (headers, { getState }) => {
      const authToken = (getState() as RootState).auth.token?.accessToken;

      if (authToken) headers.set("Authorization", `Bearer ${authToken}`);

      return headers;
    },
  }),
  endpoints: (build) => ({
    createUser: build.mutation<UserEntity, CreateUserDto>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User", id: "LIST"  }],
    }),
  }),
});
