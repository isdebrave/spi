import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useContent from "../hooks/useContent";

const Home = () => {
  const { data, setLastId } = useContent();
  const navigate = useNavigate();
  const [node, setNode] = useState<HTMLDivElement>();
  const ref = useCallback((node: HTMLDivElement) => setNode(node), []);

  const accessTokenHandler = () => {
    axios
      .get("/auth/accessToken")
      .then(() => alert("유효한 토큰이므로 이후 진행이 가능합니다."))
      .catch((error) => {
        alert(error.response.data);
        localStorage.removeItem("auth");
        navigate("/auth/login");
      });
  };

  useEffect(() => {
    if (data.length === 0) return;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLastId(data[data.length - 1].id);
          observer.unobserve(node);
        }
      },
      { threshold: 0 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [data, setLastId, node]);

  return (
    <div className="container h-full p-4 mx-auto flex flex-col items-center">
      <button
        className="bg-sky-500 rounded-lg p-2 text-white hover:brightness-95 mb-4"
        onClick={accessTokenHandler}
      >
        accessToken이 필요한 컨텐츠
        <span className="text-sm font-semibold"> (etc. 게시글 등록)</span>
      </button>
      {data.map((item, idx) => (
        <div
          ref={data.length - 1 === idx ? ref : null}
          key={item.id}
          className="mb-4"
        >
          <div className="w-[100px] h-[100px] flex">
            <img
              src={`${axios.defaults.baseURL}/${item.src}`}
              alt="Image"
              className="w-full object-cover rounded-lg"
            />
          </div>
          <div className="text-center font-semibold">{item.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Home;
