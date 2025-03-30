import React from "react";
import DisplayStatus from "./DisplayStatus";

function AuthMessage({ type, message }) {
  return <DisplayStatus type={type} message={message} />;
}

export default AuthMessage;
