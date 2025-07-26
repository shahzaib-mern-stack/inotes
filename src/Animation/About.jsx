// About.jsx
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div style={{ padding: 20 }}>
      <h2>ℹ️ About Page</h2>
      <p>This is the about page.</p>
      <Link to="/">← Back to Home</Link>
    </div>
  );
}
