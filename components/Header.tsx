import React from "react";
import Link from "next/link";
import { useAuth } from "@hooks/useAuth";
import { useAppDispatch } from "@app/store";
import { logout } from "@app/features/auth.slice";

interface HeaderProps {
  className?: string;
}

const HeaderElement: React.FC<HeaderProps> = ({ className }) => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  return (
    <header
      className={`${
        className ?? ""
      } w-full flex items-center justify-between py-3`}
    >
      <div>
        <h1 className="text-lg font-bold uppercase text-gray-600 tracking-wide">
          Brand
        </h1>
      </div>
      <div>
        <ul className="flex justify-center items-center space-x-3 uppercase">
          {user ? (
            <>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <span
                  onClick={() => dispatch(logout())}
                  className="cursor-pointer"
                >
                  Logout
                </span>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export const Header = React.memo(HeaderElement);
