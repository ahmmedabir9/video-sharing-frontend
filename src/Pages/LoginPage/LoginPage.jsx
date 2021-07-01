import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import LoginComponent from "./Components/LoginComponent";
import RegisterComponent from "./Components/RegisterComponent";

const LoginPage = ({ history }) => {
  const { user, authLoading } = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false);

  const toogleRegister = () => {
    setShowRegister(!showRegister);
  };

  if (!authLoading && user) return <Redirect to="/" />;

  return (
    <div class="overflow-hidden flex items-center justify-center bg-gray-100">
      <div
        class="
        h-screen
        flex flex-col
        space-y-10
        justify-center
        items-center
      "
      >
        {showRegister ? (
          <RegisterComponent toogleRegister={toogleRegister} />
        ) : (
          <LoginComponent history={history} />
        )}

        <p>
          {showRegister ? "Already Have an ID " : "New User"} ?
          <a
            href="#!"
            onClick={toogleRegister}
            class="text-blue-700 font-medium"
          >
            {" "}
            {showRegister ? "Login" : "Register"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
