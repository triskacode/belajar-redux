import { CreateAccessTokenDto } from "@app/dto/auth/create-access-token.dto";
import { authApi } from "@app/services/auth";
import { useMountedTracker } from "@hooks/useMountTracker";
import React, { useState } from "react";

export const Login: React.FC = () => {
  const { isMounted } = useMountedTracker();
  const [loginForm, setLoginForm] = useState<CreateAccessTokenDto>({
    email: "",
    password: "",
  });

  const [login, { isLoading, error }] = authApi.useGetAccessTokenMutation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (loginForm.email !== "" && loginForm.password !== "") {
      const result = login(loginForm);

      if (!isMounted) result.abort();
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-md mx-auto flex flex-col"
    >
      {error &&
        "status" in error &&
        (error.status === 401 ? (
          <div className="px-5 py-3 bg-rose-100 rounded-md my-3 border border-rose-400 text-rose-400 font-semibold text-lg">
            <span>Invalid email or password.</span>
          </div>
        ) : (
          <div className="px-5 py-3 bg-rose-100 rounded-md my-3 border border-rose-400 text-rose-400 font-semibold text-lg">
            <span>Whoops, something went wrong.</span>
          </div>
        ))}

      <input
        onChange={(e) =>
          setLoginForm((prev) => {
            const newLoginForm: CreateAccessTokenDto = {
              ...prev,
              email: e.target.value,
            };

            return newLoginForm;
          })
        }
        type="text"
        placeholder="Email"
        className="block w-full px-4 py-2 rounded-md shadow-md bg-gray-200 focus:bg-white my-2 focus:outline-none text-gray-600"
      />
      <input
        onChange={(e) =>
          setLoginForm((prev) => {
            const newLoginForm: CreateAccessTokenDto = {
              ...prev,
              password: e.target.value,
            };

            return newLoginForm;
          })
        }
        type="password"
        placeholder="Password"
        className="block w-full px-4 py-2 rounded-md shadow-md bg-gray-200 focus:bg-white my-2 focus:outline-none text-gray-600"
      />

      <button
        type="submit"
        className="block w-full px-4 py-2 rounded-md bg-blue-500 mt-3 text-white font-semibold disabled:bg-blue-400"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Login"}
      </button>
    </form>
  );
};
