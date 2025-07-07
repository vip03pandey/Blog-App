import React, { useEffect, useState } from "react";
import { Label } from "../Components/ui/label";
import { Input } from "../Components/ui/input";
import { cn } from "../lib/utils";
import axios from "axios";
import { toast } from 'sonner';

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const UserDetail = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    avatar: "",
  });

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch user details from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) return;

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { name, email, bio, avatar } = res.data;
        setFormData((prev) => ({
          ...prev,
          name,
          email,
          bio: bio || "",
          avatar: avatar || "/default-avatar.png",
        }));
      } catch (err) {
        console.error("Failed to load user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataImg = new FormData();
    formDataImg.append("image", file);

    setUploading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, formDataImg);
      setFormData((prev) => ({
        ...prev,
        avatar: res.data.imageUrl,
      }));
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("userToken");
  
      const updatedData = {
        name: formData.name,
        bio: formData.bio,
        avatar: formData.avatar,
      };
      
      if (formData.password.trim() !== "") {
        updatedData.password = formData.password;
      }
      console.log("Updated data sent:", updatedData);
  
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile", err);
      toast.error("Failed to update profile.");
    }
  };
  

  if (loading) return <div className="p-10 text-lg">Loading...</div>;

  return (
    <div className="bg-white max-w-screen h-screen mt-0 p-8 overflow-y-auto">
      <h1 className="text-2xl md:text-4xl font-bold mb-5">Update Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto border-1 border-gray-300 rounded-md p-6">
        <LabelInputContainer>
          <Label htmlFor="avatar" className="!text-black !ml-0">Avatar</Label>
          <img
            src={formData.avatar}
            alt="avatar"
            className="w-16 h-16 rounded-full object-cover border mx-auto"
            onError={(e) => { e.target.src = "/default-avatar.png"; }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-sm mx-auto"
          />
        </LabelInputContainer>
        {uploading && <p className="text-sm text-gray-500">Uploading...</p>}

        <LabelInputContainer>
          <Label htmlFor="email" className="!text-black !ml-0">Email Address</Label>
          <Input id="email" value={formData.email} disabled />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="name" className="!text-black !ml-0">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="bio" className="!text-black !ml-0">Bio</Label>
          <textarea
            id="bio"
            name="bio"
            className="border border-gray-300 rounded-md p-2 text-sm"
            rows={4}
            value={formData.bio}
            onChange={handleChange}
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="password" className="!text-black !ml-0">New Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </LabelInputContainer>

        <button
          type="submit"
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white"
        >
          Save Changes →
          <BottomGradient />
        </button>
      </form>
    </div>
  );
};

export default UserDetail;
