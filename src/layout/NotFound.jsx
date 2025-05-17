import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center justify-center p-4">
			<div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center">
				<div className="text-6xl mb-4">🌿</div>
				<h1 className="text-4xl font-bold text-green-800 mb-2">404</h1>
				<h2 className="text-2xl font-medium text-green-700 mb-6">Page Not Found</h2>
				<p className="text-gray-600 mb-8">
					The page you're looking for doesn't exist or has been moved.
				</p>
				<Link
					to="/auth"
					className="inline-block bg-green-600 text-white py-3 px-6 rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-200"
				>
					Return to Homepage
				</Link>
			</div>
		</div>
	);
};

export default NotFound;