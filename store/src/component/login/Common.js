import React, { useState } from "react";
import Login from "@component/login/Login";
import Register from "@component/login/Register";
import ResetPassword from "@component/login/ResetPassword";

const Common = ({ setModalOpen }) => {
  const [mode, setMode] = useState("login");
  const handleToggle = () => {
    if (mode === "register") {
      setMode("login");
    } else {
      setMode("register");
    }
  };

  const renderForm = () => {
    if (mode === "forgot") {
      return <ResetPassword setMode={setMode} setModalOpen={setModalOpen} />;
    } else if (mode === "register") {
      return <Register setMode={setMode} setModalOpen={setModalOpen} />;
    } else {
      return <Login setMode={setMode} setModalOpen={setModalOpen} />;
    }
  };

  return (
    <div className="overflow-hidden bg-white mx-auto">
      {renderForm()}
      <div className="text-center text-sm text-gray-900 mt-4">
        <div className="text-gray-500 mt-2.5">
          {mode === "register"
            ? "Already have an account?"
            : mode === "login"
            ? "Don't have an account?"
            : null}
          {mode !== "forgot" && (
            <button
              onClick={handleToggle}
              className="text-gray-800 hover:text-emerald-500 font-bold mx-2"
            >
              {mode === "register" ? "Login" : "Register"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Common;
