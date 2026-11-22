import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

function NotFoundPage() {
  useDocumentTitle("Page Not Found | StudyFlow");

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">

        <p className="text-7xl font-bold text-green-700">
          404
        </p>

        <h1 className="text-2xl font-bold text-gray-900 mt-4">
          Page Not Found
        </h1>

        <p className="text-gray-500 mt-3">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Back to Dashboard
        </Link>

      </div>
    </div>
  );
}

export default NotFoundPage;