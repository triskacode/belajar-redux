import { Register } from "@containers/register/Register";
import { guest } from "@hooks/guest";
import { HomeLayout } from "@layouts/HomeLayout";
import type { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <HomeLayout title="Register">
      <div className="flex-grow w-full h-0 flex justify-center items-center">
        <Register />
      </div>
    </HomeLayout>
  );
};

export default guest(Page);
