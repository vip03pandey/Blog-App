import React, { useState, useMemo } from 'react';
import { debounce } from 'lodash';
import { PenTool, Image, Sparkles, FileText } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';



const WriteArticles = ({ user }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);
  const navigate = useNavigate();

  const debouncedSetTitle = useMemo(() => debounce((val) => setTitle(val), 1000), []);
  const debouncedSetContent = useMemo(() => debounce((val) => setContent(val), 1000), []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    debouncedSetTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value); 
    debouncedSetContent(e.target.value);
  };

  const storedUser = JSON.parse(localStorage.getItem('userInfo')); 

  const uploadImageToCloudinary = async () => {
    const formData = new FormData();
    formData.append('image', imageFile);
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.imageUrl;
  };

  const generateTitle = async () => {
    if (!content.trim()) {
      toast.error('Please write some content first to generate a title.');
      return;
    }

    setIsGeneratingTitle(true);
    try {
      const token = localStorage.getItem('userToken');
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/post/generateTitle`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (res.data.title) {
        setTitle(res.data.title);
      }
    } catch (err) {
      console.error('Error generating title:', err);
      toast.error('Failed to generate title. Please try again.');
    } finally {
      setIsGeneratingTitle(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('userToken');
      let imageUrl = '';
      if (imageFile) imageUrl = await uploadImageToCloudinary();

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/post`,
        { title, content, image: imageUrl, author: storedUser._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Post created:', res.data);
      toast.success('Article published successfully!');
      setTitle('');
      setContent('');
      setImageFile(null);
      navigate('/article/' + res.data._id);
    } catch (err) {
      toast.error('Error creating post:');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
            <PenTool className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Tell Your Story
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Craft compelling articles that captivate your audience and share your unique perspective with the world.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-50 blur-xl" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-50 blur-xl" />

          <div className="space-y-8 relative z-10">
            {/* Title Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <label htmlFor="title" className="text-lg font-semibold text-gray-800">Article Title</label>
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                  className="flex-1 p-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                  placeholder="Enter your compelling title here..."
                />
                <button
                  onClick={generateTitle}
                  disabled={isGeneratingTitle || !content.trim()}
                  className="px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                >
                  {isGeneratingTitle ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate Title
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-500 ml-2">
                💡 Write your content first, then click "Generate Title" for AI-powered suggestions
              </p>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <PenTool className="w-4 h-4 text-purple-600" />
                </div>
                <label htmlFor="content" className="text-lg font-semibold text-gray-800">Article Content</label>
              </div>
              <textarea
                id="content"
                rows={15}
                value={content}
                onChange={handleContentChange}
                className="w-full p-6 bg-white border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                placeholder="Begin writing your story here..."
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Image className="w-4 h-4 text-green-600" />
                </div>
                <label htmlFor="image" className="text-lg font-semibold text-gray-800">Featured Image</label>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full md:w-2/3 p-4 bg-white border-2 border-gray-200 rounded-xl file:mr-4 file:py-3 file:px-6 file:border-0 file:bg-gradient-to-r file:from-green-500 file:to-green-600 file:text-white file:rounded-lg file:font-medium file:cursor-pointer hover:file:from-green-600 hover:file:to-green-700"
              />
              <p className="text-sm text-gray-500 ml-2">Upload an image that represents your article (JPG, PNG, or GIF)</p>
            </div>

            <div className="pt-6 flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg flex items-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Publishing...
                  </>
                ) : (
                  <>
                    <PenTool className="w-5 h-5" />
                    Publish Article
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          💡 <span className="font-medium">Pro tip:</span> Use compelling headlines and visuals to make your article stand out.
        </div>
      </div>
    </div>
  );
};

export default WriteArticles;