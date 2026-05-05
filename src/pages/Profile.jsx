import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/common/LoadingScreen";

// Using proxy to connect to local node backend

function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(`/auth/profile`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();
        
        if (response.ok && data.success) {
          setUserData(data.data);
        } else {
          localStorage.removeItem("token");
          navigate("/signin");
        }
      } catch (err) {
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return <LoadingScreen />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">User Dashboard / Profile</h1>
      
      {error && <div className="mb-4 rounded bg-red-50 p-4 text-red-600">{error}</div>}
      
      {userData && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">{userData.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email Address</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">{userData.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Member Since</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {new Date(userData.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100 flex gap-4">
            <button 
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
