import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const backgroundImage = "https://images.unsplash.com/photo-1653821355736-0c2598d0a63e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnQlMjBwbGFubmluZ3xlbnwwfHwwfHx8MA%3D%3D";

function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
  const storedUserRaw = localStorage.getItem("loggedInUser");
  console.log("Stored user raw:", storedUserRaw);
  if (storedUserRaw) {
    try {
      const storedUser = JSON.parse(storedUserRaw);
      console.log("Parsed user:", storedUser);
      setUser(storedUser);
    } catch {
      localStorage.removeItem("loggedInUser");
      setUser(null);
    }
  }
}, []);


  const toggleProfile = () => setShowProfile(prev => !prev);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setShowProfile(false);
    navigate("/");
  };

  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Navbar */}
      <nav style={{
        background: "rgba(0,0,0,0.5)",
        padding: "12px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: "1.1rem",
      }}>
        <div>
          <Link to="/" style={{ color: "white", textDecoration: "none", marginRight: 20 }}>Home</Link>
          <Link to="/event-planner" style={{ color: "white", textDecoration: "none", marginRight: 20 }}>Event Planner</Link>
          <Link to="/event-list" style={{ color: "white", textDecoration: "none", marginRight: 20 }}>Event List</Link>
          <Link to="/about" style={{ color: "white", textDecoration: "none" }}>About</Link>
        </div>
        <div style={{ position: "relative" }}>
          {!user ? (
            <>
              <Link to="/login" style={{ color: "white", textDecoration: "none", marginRight: 15 }}>Login</Link>
              <Link to="/signup" style={{ color: "white", textDecoration: "none" }}>Sign Up</Link>
            </>
          ) : (
            <>
              <div
                onClick={toggleProfile}
                style={{
                  cursor: "pointer",
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: "#555",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: 18,
                  userSelect: "none",
                }}
                title="User Profile"
                aria-label="User Profile"
              >
                {user.username ? user.username.charAt(0).toUpperCase() : "U"}
              </div>
              {showProfile && (
                <div style={{
                  position: "absolute",
                  right: 0,
                  marginTop: 8,
                  width: 220,
                  background: "white",
                  color: "#222",
                  borderRadius: 8,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  padding: 16,
                  zIndex: 1000,
                }}>
                  <h4 style={{ margin: "0 0 10px 0" }}>User Information</h4>
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email || "N/A"}</p>
                  <button
                    onClick={handleLogout}
                    style={{
                      marginTop: 12,
                      padding: "8px 14px",
                      backgroundColor: "#ff4d4d",
                      border: "none",
                      borderRadius: 6,
                      color: "white",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </nav>

      {/* Centered content */}
      <div style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: user ? "white" : undefined,
        textShadow: user ? "0 0 5px rgba(0,0,0,0.7)" : undefined,
      }}>
        {!user ? (
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "16px 40px",
              fontSize: "1.25rem",
              fontWeight: "bold",
              cursor: "pointer",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#ff5a5f",
              color: "white",
              boxShadow: "0 4px 14px rgba(244, 66, 72, 0.39)",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#ef891bff")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#d71c5eff")}
          >
            Get Started
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/event-planner")}
              style={{
                padding: "16px 40px",
                fontSize: "1.25rem",
                fontWeight: "bold",
                cursor: "pointer",
                borderRadius: "10px",
                border: "none",
                backgroundColor: "#ae37c9ff",
                color: "white",
                boxShadow: "0 4px 14px rgba(219, 60, 237, 0.5)",
                transition: "background-color 0.3s ease",
                marginBottom: 15,
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#6c21b8ff")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#dc3dadff")}
            >
              Plan Your Event
            </button>
            <h1 style={{ fontSize: "1.2rem", maxWidth: 360, textAlign: "center" }}>
              Need help planning? Contact us at <a href="mailto:support@eventplanner.com" style={{color: "lightblue"}}>support@eventplanner.com</a>
            </h1>
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
