import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to display fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 text-red-900 p-4">
          <h1 className="text-3xl font-bold mb-4">Something went wrong.</h1>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
