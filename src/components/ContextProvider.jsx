import React, { createContext, useContext, useState } from 'react';
import KwuoLoader from './KwuoLoader';

// Create loading context
const LoadingContext = createContext({
	isLoading: false,
	message: 'Loading...',
	startLoading: () => { },
	stopLoading: () => { },
	setLoadingMessage: () => { },
});

// Loading provider component
export const LoadingProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState('Loading...');
	const [loadingTimeout, setLoadingTimeout] = useState(null);

	const startLoading = (msg = 'Loading...', minimumTime = 500) => {
		setIsLoading(true);
		setMessage(msg);

		// Ensure loader shows for at least minimumTime milliseconds
		if (loadingTimeout) clearTimeout(loadingTimeout);
		const timeout = setTimeout(() => {
			setIsLoading(false);
		}, minimumTime);
		setLoadingTimeout(timeout);
	};

	const stopLoading = () => {
		if (loadingTimeout) clearTimeout(loadingTimeout);
		setLoadingTimeout(null);
		setIsLoading(false);
	};

	const setLoadingMessage = (msg) => {
		setMessage(msg);
	};

	return (
		<LoadingContext.Provider
			value={{
				isLoading,
				message,
				startLoading,
				stopLoading,
				setLoadingMessage,
			}}
		>
			{children}
			{isLoading && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-2xl p-8 shadow-2xl">
						<KwuoLoader text={message} size="large" />
					</div>
				</div>
			)}
		</LoadingContext.Provider>
	);
};

// Custom hook for using the loading context
export const useLoading = () => useContext(LoadingContext);