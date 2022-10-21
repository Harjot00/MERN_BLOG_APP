import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const [loading, setisLoading] = useState(false);
  const [error, setError] = useState(false);
  const sendRequest = async () => {
    setisLoading(!loading);

    const res = await axios
      .get("api/allBlogs")

      .catch((err) => {
        console.log(err);
        setError(true);
        setisLoading(false);
      });
    const data = await res.data;

    setisLoading(false);
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs([...data.reverse()]));
  }, []);

  switch (loading) {
    case true:
      return <h4>Loading...</h4>;
    case false:
      switch (error) {
        case true:
          return <h4>Sorry an error happened</h4>;
        case false:
          return (
            <>
              {blogs &&
                blogs.map((item, idx) => {
                  return (
                    <BlogCard
                      key={idx}
                      id={item._id}
                      title={item.title}
                      description={item.description}
                      author={item.user}
                      image={item.image}
                    />
                  );
                })}
            </>
          );
        default:
          return <></>;
      }

    default:
      <></>;
  }
};

export default Blogs;
