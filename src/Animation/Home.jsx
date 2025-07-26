// Home.jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h2>🏠 Home Page</h2>
      <p>Welcome to the home page.</p>
      <Link to="/about">Go to About →</Link>
    </div>
  );
}
