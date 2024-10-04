import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    profilePicture: "/default-avatar.png",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLink, setImageLink] = useState("");

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/profile/${token}`
      );
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load profile");
      setLoading(false);
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user.profilePicture]);

  const handleImageLinkChange = (e) => {
    setImageLink(e.target.value);
  };

  const handleImageLinkSubmit = async (e) => {
    e.preventDefault();
    if (!imageLink) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/profile/${token}`,
        { profilePicture: imageLink },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response, "nnnnn");

      setUser({ ...user, profilePicture: response.data.profilePicture });
      setImageLink("");
    } catch (err) {
      console.log(err);

      console.error("Failed to update profile picture:", err);
    }
  };

  const handleDeleteImage = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:3000/profile/${token}/image`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Delete response:", response);
      setUser({ ...user, profilePicture: "/default-avatar.png" });
    } catch (err) {
      console.error("Failed to delete profile picture:", err);
      if (err.response) {
        console.error("Error response:", err.response.data);
        console.error("Error status:", err.response.status);
      }
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">{error}</div>;

  return (
    <div className="min-h-screen text-white bg-black">
      <div className="max-w-4xl px-4 py-8 mx-auto">
        <h1 className="mb-8 text-3xl font-bold">Profile</h1>
        <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg md:flex-row">
          <div className="mb-6 md:mb-0 md:mr-8">
            <div className="relative">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="object-cover w-32 h-32 border-4 border-gray-600 rounded-full"
              />
              {user.profilePicture !== "/default-avatar.png" && (
                <button
                  onClick={handleDeleteImage}
                  className="absolute top-0 right-0 px-2 py-1 text-xs text-white bg-red-600 rounded-full hover:bg-red-700"
                >
                  Delete
                </button>
              )}
            </div>
            <form onSubmit={handleImageLinkSubmit} className="mt-4">
              <input
                type=" text"
                value={imageLink}
                onChange={handleImageLinkChange}
                placeholder="Enter image URL"
                className="w-full px-3 py-2 text-black bg-white rounded"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 mt-2 text-white transition duration-300 bg-blue-600 rounded hover:bg-blue-700"
              >
                Update Profile Picture
              </button>
            </form>
          </div>
          <div className="text-center md:text-left">
            <h2 className="mb-2 text-2xl font-bold">{user.userName}</h2>
            <p className="mb-4 text-gray-400">{user.email}</p>
            {/* <button className="px-4 py-2 text-white transition duration-300 bg-gray-600 rounded hover:bg-gray-700">
              Edit Profile
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
