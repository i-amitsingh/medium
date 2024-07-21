import { getPosts } from "../api";
import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function loadAllPosts() {
      const data = await getPosts();
      data.sort((a, b) => {
        return new Date(b.dateCreated) - new Date(a.dateCreated);
      });
      setPosts(data);
    }
    loadAllPosts();
  }, []);

  return (
    <div>
      {posts.map((post, index) => {
        return (
          <div key={index} className="flex justify-center p-1">
            <BlogCard post={post} isMine={false} />
          </div>
        );
      })}
    </div>
  );
}

export default Home;
