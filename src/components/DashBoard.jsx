import React from 'react';
import KwuoLoader from './KwuoLoader';

const Dashboard = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
			<div className="max-w-screen-xl mx-auto">
				<header className="bg-white rounded-2xl p-6 shadow-md flex justify-between items-center mb-6">
					<div className="flex items-center space-x-2">
						<span className="text-3xl font-bold text-green-700">Kwuo<span className="text-green-500">🌿</span></span>
					</div>
					<div className="flex items-center space-x-4">
						<button className="bg-green-100 text-green-800 px-4 py-2 rounded-full hover:bg-green-200 transition">
							Profile
						</button>
						<button className="bg-red-100 text-red-800 px-4 py-2 rounded-full hover:bg-red-200 transition">
							Logout
						</button>
					</div>
				</header>

				<main className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="col-span-2">
						<div className="bg-white rounded-2xl p-6 shadow-md mb-6">
							<h2 className="text-xl font-semibold text-green-800 mb-4">Welcome to Kwuo🌿 Dashboard</h2>
							<p className="text-gray-600">
								This is a placeholder dashboard. Replace this content with your actual dashboard components.
							</p>
						</div>

						<div className="bg-white rounded-2xl p-6 shadow-md">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-xl font-semibold text-green-800">Recent Activity</h2>
								<span className="text-green-600 text-sm">View All</span>
							</div>

							<div className="space-y-4">
								{[1, 2, 3].map((item) => (
									<div key={item} className="border-b border-green-100 pb-4">
										<div className="flex justify-between">
											<span className="font-medium">Activity Item {item}</span>
											<span className="text-sm text-gray-500">Just now</span>
										</div>
										<p className="text-sm text-gray-600">
											This is a placeholder for activity item description.
										</p>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="col-span-1">
						<div className="bg-white rounded-2xl p-6 shadow-md mb-6">
							<h2 className="text-xl font-semibold text-green-800 mb-4">Quick Stats</h2>

							<div className="space-y-4">
								<div className="bg-green-50 p-4 rounded-xl">
									<div className="text-sm text-green-700">Total Users</div>
									<div className="text-2xl font-bold text-green-800">1,234</div>
								</div>

								<div className="bg-green-50 p-4 rounded-xl">
									<div className="text-sm text-green-700">Active Sessions</div>
									<div className="text-2xl font-bold text-green-800">56</div>
								</div>

								<div className="bg-green-50 p-4 rounded-xl">
									<div className="text-sm text-green-700">New Today</div>
									<div className="text-2xl font-bold text-green-800">12</div>
								</div>
							</div>
						</div>

						<div className="bg-white rounded-2xl p-6 shadow-md">
							<h2 className="text-xl font-semibold text-green-800 mb-4">Loader Demo</h2>
							<div className="flex flex-col items-center space-y-6">
								<div>
									<p className="text-center mb-2 text-sm text-gray-600">Small</p>
									<KwuoLoader size="small" text="Loading..." />
								</div>
								<div>
									<p className="text-center mb-2 text-sm text-gray-600">Medium</p>
									<KwuoLoader size="medium" text="Please wait..." />
								</div>
								<div>
									<p className="text-center mb-2 text-sm text-gray-600">Large</p>
									<KwuoLoader size="large" text="Processing..." />
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default Dashboard;