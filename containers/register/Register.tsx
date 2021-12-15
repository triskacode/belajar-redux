import { CreateUserDto } from "@app/dto/user/create-user.dto";
import { BadRequestException } from "@app/exceptions/bad-request.exception";
import { userApi } from "@app/services/user";
import { useMountedTracker } from "@hooks/useMountTracker";
import React, { useEffect, useState } from "react";

export const Register: React.FC = () => {
  const { isMounted } = useMountedTracker();
  const [registerForm, setRegisterForm] = useState<CreateUserDto>({
    email: "",
    password: "",
  });

  const [register, { isLoading, error, isSuccess }] =
    userApi.useCreateUserMutation();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (registerForm.email !== "" && registerForm.password !== "") {
      const result = register(registerForm);

      if (!isMounted) result.abort();
    }
  };

  useEffect(() => {
    if (isSuccess)
      setRegisterForm({
        email: "",
        password: "",
      });
  }, [isSuccess]);

  return (
    <form
      onSubmit={handleRegister}
      className="w-full max-w-md mx-auto flex flex-col"
    >
      {error &&
        "status" in error &&
        (error.status === 400 ? (
          (() => {
            const badRequestException = error as BadRequestException;

            return (
              <div className="px-5 py-3 bg-rose-100 rounded-md my-3 border border-rose-400 text-rose-400 font-semibold text-lg">
                <ul className="list-disc">
                  {badRequestException.data.message.map((error, key) => (
                    <li key={key} className="ml-5">
                      <span>{error}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })()
        ) : (
          <div className="px-5 py-3 bg-rose-100 rounded-md my-3 border border-rose-400 text-rose-400 font-semibold text-lg">
            <span>Whoops, something went wrong.</span>
          </div>
        ))}

      {isSuccess && (
        <div className="px-5 py-3 bg-emerald-100 rounded-md my-3 border border-emerald-400 text-emerald-400 font-semibold text-lg">
          <span>Create user successfully.</span>
        </div>
      )}

      <input
        onChange={(e) =>
          setRegisterForm((prev) => {
            const newLoginForm: CreateUserDto = {
              ...prev,
              email: e.target.value,
            };

            return newLoginForm;
          })
        }
        value={registerForm.email}
        type="text"
        placeholder="Email"
        className="block w-full px-4 py-2 rounded-md shadow-md bg-gray-200 focus:bg-white my-2 focus:outline-none text-gray-600"
      />
      <input
        onChange={(e) =>
          setRegisterForm((prev) => {
            const newLoginForm: CreateUserDto = {
              ...prev,
              password: e.target.value,
            };

            return newLoginForm;
          })
        }
        value={registerForm.password}
        type="password"
        placeholder="Password"
        className="block w-full px-4 py-2 rounded-md shadow-md bg-gray-200 focus:bg-white my-2 focus:outline-none text-gray-600"
      />

      <button
        type="submit"
        className="block w-full px-4 py-2 rounded-md bg-blue-500 mt-3 text-white font-semibold disabled:bg-blue-400"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Register"}
      </button>
    </form>
  );
};
