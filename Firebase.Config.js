// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // <-- import what you need

const firebaseConfig = {
	apiKey: "AIzaSyAcQl9FSa82DGx2qh-sV9KBcn-eQ1CcCNU",
	authDomain: "kwuoya.firebaseapp.com",
	projectId: "kwuoya",
	storageBucket: "kwuoya.firebasestorage.app",
	messagingSenderId: "239608020369",
	appId: "1:239608020369:web:a253b27e155882a7af6e30",
	measurementId: "G-8Q3YF8S187"
};

// Initialize Firebase app only once
const app = initializeApp(firebaseConfig);

// Optional: only in browser environments
if (typeof window !== "undefined") {
	getAnalytics(app);
}

// Export initialized services
export const auth = getAuth(app);
// export more like firestore, storage, etc. as needed
