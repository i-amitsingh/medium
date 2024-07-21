import { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!name || !email || !message) {
      setError("All fields are required.");
      return;
    }

    // Simulate form submission
    try {
      // Here you can add your form submission logic, e.g., sending data to an API
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError(
        "An error occurred while sending your message. Please try again."
      );
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 bg-gray-100">
      <div className="flex flex-col w-full max-w-3xl p-4 bg-white rounded shadow-md">
        <h1 className="mb-4 text-3xl font-bold text-center">Contact Us</h1>
        <p className="mb-4 text-lg text-center">
          We'd love to hear from you! Whether you have a question, feedback, or
          just want to say hello, feel free to get in touch using the form
          below.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <label className="mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 mb-4 border rounded"
          />
          <label className="mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 mb-4 border rounded"
          />
          <label className="mb-2">Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-2 mb-4 border rounded"
            rows="5"
          />
          {error && <p className="mb-4 text-red-500">{error}</p>}
          {success && (
            <p className="mb-4 text-green-500">
              Your message has been sent successfully!
            </p>
          )}
          <button
            type="submit"
            className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold shadow-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
