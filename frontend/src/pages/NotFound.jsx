import { Link } from "react-router-dom";
import { LuShieldAlert } from "react-icons/lu";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-6" style={{ backgroundColor: "var(--color-bg)" }}>
      <div>
        <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-6" style={{ backgroundColor: "rgba(239,68,68,0.1)" }}>
          <LuShieldAlert className="text-3xl" style={{ color: "var(--color-danger)" }} />
        </div>
        <h1 className="text-5xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>404</h1>
        <p className="text-sm mb-8" style={{ color: "var(--color-muted)" }}>This route isn't in our threat model — the page you're looking for doesn't exist.</p>
        <Link to="/dashboard" className="btn-primary">Back to Dashboard</Link>
      </div>
    </div>
  );
}
