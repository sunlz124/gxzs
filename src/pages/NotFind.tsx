import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>{location.pathname}</p>
    </div>
  );
};
export default NotFound;
