import axios from "axios";
import { useEffect, useState } from "react";

interface DataType {
  id: string;
  src: string;
  title: string;
}

const useContent = () => {
  const [lastId, setLastId] = useState("-1");
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    axios
      .get(`/?lastId=${lastId}`)
      .then((response) => setData((cur) => [...cur, ...response.data]))
      .catch((error) => alert(error.response.data));
  }, [lastId, setData]);

  return { data, setLastId };
};

export default useContent;
