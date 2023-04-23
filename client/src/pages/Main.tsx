import { Link, useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/login");
  }

  return (
    <div>
      <ul>
        <li>
          Go to <Link to="register">Register</Link>
        </li>
        <li>
          Go to <Link to="login">Login</Link>
        </li>
        <li>
          Go to <Link to="user">User</Link>
        </li>
      </ul>
      <h1>Main</h1>
    </div>
  );
}

export default Main;
