import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const HomePage = ({ history }) => {
  const { user, setUser, authLoading } = useContext(AuthContext);

  if (!authLoading && !user) return <Redirect to="/login" />;

  const handleSignOut = async () => {
    localStorage.removeItem("auth_token");
    setUser(null);
    history.push("/login");
  };

  return (
    <div maxWidth="lg">
      <div className="d-flex flex-column justify-center text-center vh-100">
        <h2 className="text-4xl mb-4">Hello, {user?.name}!</h2>
        <div className="flex justify-center text-center">
          <button
            onClick={handleSignOut}
            class="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
