import { FaHome, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="text-center max-w-lg">
        {/* 404 */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-green-600">
          404
        </h1>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold mt-4 text-base-content">
          Page Not Found
        </h2>

        <p className="text-base-content/60 mt-4">
          Sorry, the page you're looking for doesn't exist or may have been
          moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
          <Link
            to="/"
            className="btn bg-green-600 hover:bg-green-700 text-white border-none"
          >
            <FaHome />
            Go Home
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline border-green-600 text-green-600 hover:bg-green-600 hover:border-green-600 hover:text-white"
          >
            <FaArrowLeft />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
