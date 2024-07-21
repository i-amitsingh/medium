import { useState, useEffect } from "react";
import { getPosts } from "../api";
import * as jwt_decode from "jwt-decode";
import BlogCard from "../components/BlogCard";

function Profile() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function loadUserData() {
      const token = sessionStorage.getItem("user");
      const decoded = jwt_decode.jwtDecode(token);
      const allPosts = await getPosts();
      const userPosts = allPosts.filter((post) => post.author === decoded._id);
      setPosts(userPosts);
      setUser(decoded);
      let date = new Date(decoded.joinDate);
      let formattedDate = date.toDateString().slice(4, 15);
      setUser({ ...decoded, joinDate: formattedDate });
    }
    loadUserData();
  });

  return (
    <div className="min-h-screen min-w-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">{user.name}</h1>
        <div className="text-center mb-6">
          <h2 className="text-xl text-gray-700 mb-2">Email: {user.email}</h2>
          <h3 className="text-xl text-gray-700 mb-2">
            Joined: {user.joinDate}
          </h3>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Your Posts</h2>
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} isMine={true} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
