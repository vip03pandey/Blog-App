import React, { useState, useMemo, useCallback } from 'react';
import { debounce } from 'lodash';
import { PenTool, Image, Sparkles, FileText } from 'lucide-react';

const WriteArticles = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // 🧠 Debounced state setters
  const debouncedSetTitle = useMemo(
    () => debounce((val) => setTitle(val), 2000),
    []
  );

  const debouncedSetContent = useMemo(
    () => debounce((val) => setContent(val), 3000),
    []
  );

  const handleTitleChange = (e) => {
    debouncedSetTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    debouncedSetContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", { title, content });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
            <PenTool className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Tell Your Story
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Craft compelling articles that captivate your audience and share your unique perspective with the world.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-50 blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-50 blur-xl"></div>

          <div className="space-y-8 relative z-10">
            {/* Title Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <label htmlFor="title" className="text-lg font-semibold text-gray-800">
                  Article Title
                </label>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative group">
                  <input
                    type="text"
                    id="title"
                    onChange={handleTitleChange}
                    className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-800 placeholder-gray-400 group-hover:border-gray-300"
                    placeholder="Enter your compelling title here..."
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </div>
                <button
                  type="button"
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  {isGenerating ? 'Generating...' : 'Generate Title'}
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg">
                  <PenTool className="w-4 h-4 text-purple-600" />
                </div>
                <label htmlFor="content" className="text-lg font-semibold text-gray-800">
                  Article Content
                </label>
              </div>
              <div className="relative group">
                <textarea
                  id="content"
                  onChange={handleContentChange}
                  rows={25}
                  className="w-full p-6 bg-white border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 text-gray-800 placeholder-gray-400 leading-relaxed group-hover:border-gray-300"
                  placeholder="Begin writing your story here... Let your creativity flow and share your unique perspective with the world."
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
                  <Image className="w-4 h-4 text-green-600" />
                </div>
                <label htmlFor="image" className="text-lg font-semibold text-gray-800">
                  Featured Image
                </label>
              </div>
              <div className="relative group">
                <input
                  type="file"
                  id="image"
                  className="w-full md:w-2/3 p-4 bg-white border-2 border-gray-200 rounded-xl file:mr-4 file:py-3 file:px-6 file:border-0 file:bg-gradient-to-r file:from-green-500 file:to-green-600 file:text-white file:rounded-lg file:font-medium file:cursor-pointer file:transition-all file:duration-200 hover:file:from-green-600 hover:file:to-green-700 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 group-hover:border-gray-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
              <p className="text-sm text-gray-500 ml-2">
                Upload an image that represents your article (JPG, PNG, or GIF)
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-8">
              <StatefulButtonDemo />
            </div>
          </div>
        </div>

        {/* Footer Tips */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            💡 <span className="font-medium">Pro tip:</span> Use compelling headlines and engaging visuals to make your article stand out
          </p>
        </div>
      </div>
    </div>
  );
};

// Mock StatefulButton component for demonstration
const Button = ({ onClick, children, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onClick();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
      {...props}
    >
      {isLoading ? (
        <>
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          Publishing...
        </>
      ) : (
        <>
          <PenTool className="w-5 h-5" />
          {children}
        </>
      )}
    </button>
  );
};

function StatefulButtonDemo() {
  const handleClick = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 4000);
    });
  };
  
  return (
    <div className="flex items-center justify-center">
      <Button onClick={handleClick}>Publish Article</Button>
    </div>
  );
}

export default WriteArticles;