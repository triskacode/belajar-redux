import { selectAuthToken, selectAuthUser } from "@app/features/auth.slice";
import { useAppSelector } from "@app/store";
import { useMemo } from "react";

export function useAuth() {
  const user = useAppSelector(selectAuthUser);
  const token = useAppSelector(selectAuthToken);

  const userOptimized = useMemo(() => user, [user]);
  const tokenOptimized = useMemo(() => token, [token]);

  return {
    user: userOptimized,
    token: tokenOptimized,
  };
}
