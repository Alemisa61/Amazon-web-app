import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";

export default function ProtectedRoute({ children, message, relead }) {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useContext(DataContext);
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate("/signup", { state: { message, relead } });
    }
  }, [user]);

  return children;
}
