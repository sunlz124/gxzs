import { reqError, test, UserInfo } from "@/api";
import { Button } from "antd";
import { useState } from "react";

const Index = () => {
  const [res, setRes] = useState<UserInfo | null>(null);
  return (
    <div>
      <div className="bg-red-400">Hello World</div>
      <div onClick={async () => {}}></div>
      <Button
        onClick={async () => {
          const res = await test({ id: "111" });
          console.log(9999, res);
          setRes(res);
        }}
      >
        请求1
      </Button>
      <Button
        onClick={async () => {
          const res = await reqError({ id: "111" });
          console.log(res);
        }}
      >
        请求2
      </Button>
      <div className="text-red-400">请求结果:</div>
      {res && (
        <>
          <div>请求结果:{res.age}</div>
          <div>请求结果:{res.name}</div>
        </>
      )}
    </div>
  );
};
export default Index;
