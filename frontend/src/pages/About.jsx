import { Link } from "react-router-dom";

function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-12  bg-gray-100">
      <div className="flex flex-col w-full px-20 py-6 pb-12 bg-white rounded shadow-md">
        <h1 className="mb-4 text-3xl font-bold text-center">About Us</h1>
        <p className="mb-4 text-lg">
          Welcome to our Medium BlogApp, a platform where you can share your
          stories, ideas, thoughts and{" "}
          <Link
            className="text-blue-500 underline hover:text-blue-600"
            to="/createblog"
          >
            CreateBlog
          </Link>{" "}
          with the world . Our mission is to create a space where writers and
          readers can connect and engage with content that matters.
        </p>
        <h2 className="mb-2 text-2xl font-semibold">Our Vision</h2>
        <p className="mb-4 text-lg">
          We believe in the power of words and the impact they can have on the
          world. Our vision is to empower individuals to share their unique
          perspectives and to create a community where diverse voices are heard
          and celebrated.
        </p>
        <h2 className="mb-2 text-2xl font-semibold">Meet the Team</h2>
        <p className="mb-4 text-lg">
          Our team is made up of passionate writers, developers, and designers
          who are dedicated to creating a seamless and enjoyable experience for
          our users. We are constantly working to improve the platform and to
          provide the best possible service.
        </p>
        <h2 className="mb-2 text-2xl font-semibold">Join Us</h2>
        <p className="mb-4 text-lg">
          Whether you're a seasoned writer or just starting out, we welcome you
          to join our community. Share your stories, engage with other writers,
          and be part of a platform that values creativity and expression.
        </p>
        <p className="text-lg">
          Thank you for being part of our journey. We look forward to seeing the
          incredible content you'll create!
        </p>
      </div>
    </div>
  );
}

export default About;
