import { auth } from "@hooks/auth";
import { useAuth } from "@hooks/useAuth";
import { HomeLayout } from "@layouts/HomeLayout";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const Page: NextPage = () => {
  const [socket, setSocket] = useState<Socket>();
  const { token } = useAuth();

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL! + "/chat", {
      query: {
        "access-token": token?.accessToken,
      },
    });

    setSocket(socket);

    const handleConnect = () => {
      socket.emit("connect-to-server");
    };

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);

      socket.emit("disconnect-from-server");
      socket.disconnect();
      setSocket(undefined);
    };
  }, [token]);

  useEffect(() => {
    const handleOnConnected = () => {
      console.log("websocket connected");
    };
    const handleOnMessage = (data: unknown) => {
      console.log("event message", data);
    };
    const handleOnException = (err: unknown) => {
      console.log(err);
    };

    if (socket) {
      socket.on("connect", handleOnConnected);
      socket.on("message", handleOnMessage);
      socket.on("exception", handleOnException);
    }

    return () => {
      if (socket) {
        socket.off("connect", handleOnConnected);
        socket.off("message", handleOnMessage);
        socket.off("exception", handleOnException);
      }
    };
  }, [socket]);

  const testSend = () => {
    if (socket) {
      socket.emit("message", { message: "hay boy" });
    }
  };

  return (
    <HomeLayout title="Login">
      <div className="flex-grow w-full h-0 flex flex-col justify-center items-center">
        chat
        <button onClick={testSend}>send</button>
      </div>
    </HomeLayout>
  );
};

export default auth(Page);
