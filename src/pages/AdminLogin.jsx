import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      navigate("/admin-dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Gym Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
            alt="Gym"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 text-center">
          <h1
            className="text-6xl font-black text-white mb-4"
            style={{
              WebkitTextStroke: "1px #FFD600",
              paintOrder: "stroke fill",
              textShadow: "0 0 30px rgba(255, 214, 0, 0.3)",
            }}
          >
            INSHAPE FITNESS
          </h1>
          <div className="w-32 h-1 bg-[#FFD600] rounded-full mb-6" />
          <p className="text-xl text-[#FFD600] font-semibold">Admin Portal</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#0a0a0a] px-6 py-12">
        <div className="w-full max-w-[400px]">
          {/* Title Section */}
          <div style={{ marginBottom: "32px" }}>
            <h2 className="text-3xl font-black text-white mb-3 tracking-tight">
              ADMIN LOGIN
            </h2>
            <div className="w-20 h-1 bg-[#FFD600]" />
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/30 text-red-300 px-4 py-3.5 rounded-xl text-sm flex items-center gap-3 backdrop-blur-sm shadow-lg shadow-red-500/5 animate-in fade-in slide-in-from-top-2 duration-300"
              style={{ marginBottom: "20px" }}
            >
              <div className="shrink-0 w-5 h-5 bg-red-500/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Input Fields Group */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div>
                <label className="block text-gray-400 mb-1.5 text-xs font-bold uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1a1a1a] text-white text-base border border-zinc-800 rounded-lg focus:border-[#FFD600] focus:ring-2 focus:ring-[#FFD600]/20 focus:outline-none transition-all duration-200 placeholder:text-gray-600"
                  placeholder="admin@inshape.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1.5 text-xs font-bold uppercase tracking-wider">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1a1a1a] text-white text-base border border-zinc-800 rounded-lg focus:border-[#FFD600] focus:ring-2 focus:ring-[#FFD600]/20 focus:outline-none transition-all duration-200 placeholder:text-gray-600"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Button with clear separation */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FFD600] hover:bg-[#e6c200] text-black font-bold py-3.5 uppercase tracking-wider transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
              style={{ marginTop: "24px" }}
            >
              {loading ? "LOGGING IN..." : "LOGIN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
``;
