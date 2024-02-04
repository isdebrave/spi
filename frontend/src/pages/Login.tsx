import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = () => {
    if (email.trim() === "") {
      return alert("이메일을 적어주세요.");
    }
    if (password.trim() === "") {
      return alert("비밀번호를 적어주세요.");
    }

    axios
      .post("/auth/login", { email, password })
      .then(() => {
        localStorage.setItem("auth", "true");
        navigate("/");
      })
      .catch((error) => alert(error.response.data));
  };

  return (
    <div className="container mx-auto h-full flex flex-col justify-center items-center">
      <div className="w-full max-w-80 p-4 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">로그인</h1>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="이메일"
            className="p-2 text-lg outline-none rounded-lg border focus:border-sky-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="p-2 text-lg outline-none rounded-lg border focus:border-sky-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={onSubmit}
            className="text-white p-2 rounded-lg bg-sky-500 hover:brightness-95 font-semibold"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
