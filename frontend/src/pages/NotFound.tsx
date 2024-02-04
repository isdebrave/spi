import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col justify-center items-center gap-3">
      <h1 className="text-3xl font-bold">존재하지 않는 페이지입니다.</h1>
      <button
        onClick={() => navigate(-1)}
        className="text-sky-500 hover:opacity-80"
      >
        돌아가기
      </button>
    </div>
  );
};

export default NotFound;
