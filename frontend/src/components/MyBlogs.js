import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";

const MyBlogs = () => {
  const [userBlogs, setuserBlogs] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const userId = localStorage.getItem("userId");
  const apiRequest = async () => {
    const res = await axios
      .get(`api/users/${userId}`)
      .catch((err) => console.error(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    apiRequest().then((res) => {
      setuserBlogs(res.reverse());
    });
  }, [refresh]);

  return (
    <>
      {userBlogs.length > 0 ? (
        userBlogs.map((item, idx) => {
          return (
            <BlogCard
              refresh={refresh}
              setRefresh={setRefresh}
              key={idx}
              id={item._id}
              title={item.title}
              description={item.description}
              author={item.user}
              image={item.image}
            />
          );
        })
      ) : (
        <h3>You don't have any blogs.</h3>
      )}
    </>
  );
};

export default MyBlogs;
