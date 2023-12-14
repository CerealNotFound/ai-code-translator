import { useState } from "react";
// import { socket } from "@/utils/socket";

const Collaborate = () => {
  const [ws, setWs] = useState<WebSocket | undefined>(undefined);

  return (
    <>
      {ws ? (
        <div>
          <div
            onClick={() => {
              socket(ws ? true : false);
            }}
            className="absolute cursor-pointer right-10 top-10 rounded-md bg-[#371f1f] px-4 py-2 text-neutral-200"
          >
            Disconnect
          </div>
        </div>
      ) : (
        <>
          <div
            onClick={() => {
              socket(ws ? true : false);
            }}
            className="absolute cursor-pointer right-10 top-10 rounded-md bg-[#1f3725] px-4 py-2 text-neutral-200"
          >
            Collaborate
          </div>
          <input type="text" />
        </>
      )}
    </>
  );
};

export default Collaborate;
