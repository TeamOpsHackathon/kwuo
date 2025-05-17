import React from "react";
import { Link } from "react-router-dom";

const AuthLayout = ({
  title,
  children,
  footerText,
  footerLink,
  footerHref,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center">
        <div className="text-6xl mb-6">🌿</div>
        <h1 className="text-3xl font-bold text-green-800 mb-6">{title}</h1>

        <div>{children}</div>

        {footerText && footerLink && footerHref && (
          <p className="mt-8 text-gray-600">
            {footerText}{" "}
            <Link
              to={footerHref}
              className="text-green-700 font-semibold hover:underline"
            >
              {footerLink}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
