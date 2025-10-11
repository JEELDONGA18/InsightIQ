// src/pages/Employee/Profile.js
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

// Sample employee profile data
const initialProfile = {
  name: "John Doe",
  email: "john.doe@company.com",
  phone: "+91 9876543210",
  notifications: true,
};

const Profile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "notifications") {
      setProfile((prev) => ({ ...prev, notifications: checked }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  // Save profile updates
  const handleSaveProfile = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", profile);
    alert("Profile updated successfully!");
  };

  // Save password updates
  const handleSavePassword = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("New password and confirmation do not match!");
      return;
    }
    console.log("Password updated:", passwords);
    alert("Password updated successfully!");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      <Sidebar role="employee" />

      <main className="flex-1 p-4 md:ml-64 overflow-x-hidden">
        <div className="w-full max-w-[800px] mx-auto border border-gray-800 p-5 rounded-xl shadow-md m-2 space-y-6">

          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Profile & Settings</h2>

          {/* Personal Info Form */}
          <form
            onSubmit={handleSaveProfile}
            className="bg-gray-900 p-6 rounded-xl shadow-[0_0_20px_rgba(0,255,255,0.4)] flex flex-col gap-4"
          >
            <h3 className="text-lg font-semibold text-cyan-400">Personal Information</h3>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="p-2 rounded-md bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
              required
            />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-2 rounded-md bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
              required
            />
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="p-2 rounded-md bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
            />
            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                name="notifications"
                checked={profile.notifications}
                onChange={handleChange}
                className="w-4 h-4 accent-cyan-400"
              />
              <span>Enable Notifications</span>
            </label>

            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-cyan-500/30 hover:bg-cyan-500/50 rounded-md text-cyan-200 transition shadow-[0_0_10px_rgba(0,255,255,0.4)]"
            >
              Save Info
            </button>
          </form>

          {/* Password Update Form */}
          <form
            onSubmit={handleSavePassword}
            className="bg-gray-900 p-6 rounded-xl shadow-[0_0_20px_rgba(0,255,255,0.4)] flex flex-col gap-4"
          >
            <h3 className="text-lg font-semibold text-cyan-400">Change Password</h3>
            <input
              type={showPassword ? "text" : "password"}
              name="current"
              value={passwords.current}
              onChange={handlePasswordChange}
              placeholder="Current Password"
              className="p-2 rounded-md bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
              required
            />
            <input
              type={showPassword ? "text" : "password"}
              name="new"
              value={passwords.new}
              onChange={handlePasswordChange}
              placeholder="New Password"
              className="p-2 rounded-md bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
              required
            />
            <input
              type={showPassword ? "text" : "password"}
              name="confirm"
              value={passwords.confirm}
              onChange={handlePasswordChange}
              placeholder="Confirm New Password"
              className="p-2 rounded-md bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
              required
            />
            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="w-4 h-4 accent-cyan-400"
              />
              <span>Show Passwords</span>
            </label>

            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-cyan-500/30 hover:bg-cyan-500/50 rounded-md text-cyan-200 transition shadow-[0_0_10px_rgba(0,255,255,0.4)]"
            >
              Update Password
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;