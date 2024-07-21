import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { updatePost, deletePost } from "../api";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function BlogCard({ post, isMine, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [content, setContent] = useState(post.content);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const author = post.author;
  const dateCreated = post.dateCreated;

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await updatePost(post._id, {
        title,
        description,
        content,
        author,
        dateCreated,
      });
      if (onUpdate) onUpdate();
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update the post:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(post._id);
        if (onDelete) onDelete();
        navigate("/profile");
      } catch (error) {
        console.error("Failed to delete the post:", error);
      }
    }
  };

  const date = new Date(post.dateCreated);
  const stringDate = date.toDateString();

  return (
    <div className="block w-[90vw] md:w-[80vw] lg:w-[80vw] mx-auto my-4 p-6 bg-white text-black hover:bg-gray-100 transition duration-300 ease-in-out rounded-lg shadow-sm border-2">
      {isEditing ? (
        <div>
          <labe className="p-2 text-xl text-blue-600 italic font-semibold">
            Title :{" "}
          </labe>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl font-bold mb-2 w-full border-b border-gray-300 px-4 py-2"
          />
          <labe className="p-2 text-xl text-blue-600 italic font-semibold">
            Description :{" "}
          </labe>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-base mb-4 w-full border-b border-gray-300 px-4 py-2"
          />
          <labe className="p-2 text-xl text-blue-600 italic font-semibold">
            Content :{" "}
          </labe>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="text-base mb-4 w-full border-b border-gray-300 px-4 py-2"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              {isUpdating ? "Updating..." : "Update"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <Link to={`/readblog/${post._id}`} className="block w-full">
            {!isMine && (
              <p className="text-blue-500 font-semibold">{post.authorID}</p>
            )}
            <p className="text-xl font-bold mb-2">{post.title}</p>
            <p className="text-base mb-4 text-gray-700">{post.description}</p>
            <p className="text-sm text-gray-500">{stringDate.slice(4, 15)}</p>
          </Link>
          {isMine && (
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out flex items-center gap-1"
              >
                Edit
                <FaEdit />
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out flex items-center gap-1"
              >
                Delete
                <MdDelete />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BlogCard;
