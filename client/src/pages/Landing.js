import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function LandingPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>Welcome to RBAC App</h1>
      <p>This is a public landing page</p>
      <nav>
        <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Sign Up</Link>
      </nav>
    </div>
  );
}
