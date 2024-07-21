import { getPost } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

function ReadBlog() {
  const [post, setPost] = useState(null);
  let params = useParams();
  let id = params.id;
  let navigate = useNavigate();

  useEffect(() => {
    async function loadPost() {
      const data = await getPost(id);
      let date = new Date(data.dateCreated);
      data.dateCreated = date.toDateString().slice(4, 15);
      setPost(data);
    }
    loadPost();
  }, [id]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto my-8 p-8 bg-white border-2 shadow-sm rounded-lg text-black w-[90vw]">
      <button
        className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
        onClick={() => navigate(-1)}
      >
        <IoMdArrowRoundBack className="mr-1" />
        Go Back
      </button>
      <h2 className="text-3xl font-bold mb-4 border-b pb-2">{post.title}</h2>
      <p className="text-lg mb-2 italic text-gray-600">{post.description}</p>
      <p className="text-md mb-2 ">
        Author: <span className="font-semibold ">{post.authorID}</span>
      </p>
      <div className="text-md leading-relaxed text-gray-800">
        {post.content}
      </div>
      <p className="text-md mt-4">
        Date: <span className="font-semibold">{post.dateCreated}</span>
      </p>
    </div>
  );
}

export default ReadBlog;
