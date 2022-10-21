import axios from "axios";
import { Grid, CardMedia, Typography, Button, Stack, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const [blogPost, setblogPost] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();

  const getData = async () => {
    try {
      setisLoading(true);
      const res = await axios.get(`api/blogs/${id}`);
      const data = await res.data;
      setblogPost({
        ...data,
      });
      console.log(data);
      setisLoading(false);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {!error ? (
        <Box>
          <>
            <img
              style={{
                objectFit: "cover",
                width: "100%",
                height: "400px",
              }}
              src={blogPost.image}
              alt="Loading .."
            />
            <Box sx={{ mx: 6, my: 3 }} flex>
              <Stack flexDirection="row">
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {blogPost.title}
                </Typography>

                <Typography
                  sx={{ fontsize: 2, ml: "auto", textDecoration: "underline" }}
                  variant="h5"
                >
                  {blogPost.author}
                </Typography>
              </Stack>
              <Typography
                sx={{ my: 3, textAlign: "left", whiteSpace: "pre-line" }}
              >
                {blogPost.description}
              </Typography>
            </Box>
          </>
        </Box>
      ) : error ? (
        <h4> There is an error</h4>
      ) : (
        <h4>Loading ...</h4>
      )}
    </>
  );
};

export default BlogDetail;
