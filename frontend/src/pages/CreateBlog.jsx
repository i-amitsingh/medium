import { createPost } from "../api";
import { useState } from "react";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!title || !description || !content) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    const submitObject = {
      title,
      description,
      content,
      author: null,
      dateCreated: new Date(),
    };

    try {
      await createPost(submitObject);
      setSuccess(true);
      setTitle("");
      setDescription("");
      setContent("");
    } catch (err) {
      setError("An error occurred while creating the post. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 bg-gray-100">
      {success && (
        <div className="w-full max-w-md p-4 mb-4 text-green-900 bg-green-100 border border-green-200 rounded-lg shadow-md">
          <div className="flex items-start justify-between">
            <span className="font-semibold">Post created successfully!</span>
            <button
              className="text-green-900 focus:outline-none"
              onClick={() => setSuccess(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md p-4 bg-white rounded shadow-md"
      >
        <h1 className="mb-4 text-2xl font-bold text-center">
          Create a New Post
        </h1>
        <label className="mb-2">Post Title:</label>
        <input
          type="text"
          name="title"
          maxLength={100}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 mb-4 border rounded"
        />
        <label className="mb-2">Post Description:</label>
        <input
          type="text"
          name="description"
          maxLength={200}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 mb-4 border rounded"
        />
        <label className="mb-2">Post Content:</label>
        <textarea
          name="content"
          value={content}
          maxLength={5000}
          onChange={(e) => setContent(e.target.value)}
          className="p-2 mb-4 border rounded"
          rows="5"
        />
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <button
          type="submit"
          className={`py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold shadow-md ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;
