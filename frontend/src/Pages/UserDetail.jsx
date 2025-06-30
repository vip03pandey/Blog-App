import React, { useState } from "react";
import { Label } from "../Components/ui/label";
import { Input } from "../Components/ui/input";
import { cn } from "../lib/utils";

const user = {
  id: 1,
  name: "Manu Arora",
  email: "manu@gmail.com",
  avatar:
    "https://cdn.prod.website-files.com/63bc83b29094ec80844b6dd5/6526dc79dea0f080d2d61d6f_Starting-with-large-language-models.webp",
  bio: "I am a software engineer and a writer.",
};

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
    name: user.name,
    email: user.email,
    password: "",
    bio: user.bio,
    avatar: user.avatar,
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setUploading(true);
//     const formDataImg = new FormData();
//     formDataImg.append("image", file);

//     try {
//       const res = await fetch("/api/upload", {
//         method: "POST",
//         body: formDataImg,
//       });
//       const data = await res.json();
//       setFormData((prev) => ({ ...prev, avatar: data.imageUrl }));
//     } catch (err) {
//       console.error("Image upload error", err);
//     } finally {
//       setUploading(false);
//     }
//   };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated user data:", formData);
    alert("Profile updated!");
    // Call backend API to save
  };

  return (
    <div className="bg-white max-w-screen h-screen mt-0 p-8 overflow-y-auto">
        <h1 className="text-2xl md:text-4xl font-bold mb-5">Update Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto border-1 border-gray-300 rounded-md p-6">
        {/* Avatar Upload Section */}
        {/* <div className="flex items-center space-x-4"> */}
        <LabelInputContainer>
        <Label htmlFor="avataar" className="!text-black !ml-0">Change Avatar</Label>
          <img
            src={formData.avatar}
            alt="avatar"
            className="w-16 h-16 rounded-full object-cover border mx-auto"
          />
          <input
            type="file"
            accept="image/*"
            // onChange={handleImageUpload}
            className="text-sm mx-auto"
          ></input>
        {/* </div> */}
        </LabelInputContainer>
        {uploading && <p className="text-sm text-gray-500">Uploading...</p>}

        <LabelInputContainer>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" value={formData.email} disabled />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="bio">Bio</Label>
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
          <Label htmlFor="password">New Password</Label>
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
