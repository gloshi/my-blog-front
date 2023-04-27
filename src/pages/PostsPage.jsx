import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import Post from "../components/Post";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  const fetchMyPosts = async () => {
    try {
      const { data } = await axios.get("/posts/user/me");
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMyPosts();
  }, []);

  return (
    <div className="w-1/2 mx-auto py-10 flex flex-col gap-10">
      {posts?.map((post, i) => (
        <Post post={post} key={i} />
      ))}
    </div>
  );
};

export default PostsPage;
