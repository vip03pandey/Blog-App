import React, { useState, useMemo, useCallback } from 'react';
import { debounce } from 'lodash';

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
    console.log("Form submitted", { title, content,image });
  };

  return (
    <div className="mt-10 mx-auto max-w-4xl bg-white p-6 rounded-xl shadow-sm">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center">
        Tell your Story
      </h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            Title
          </label>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              id="title"
              onChange={handleTitleChange}
              className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your Title"
            />
            <button
              type="button"
              disabled={isGenerating}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? 'Generating...' : 'Generate Title'}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2">
          <label htmlFor="content" className="text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            onChange={handleContentChange}
            rows={25}
            className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write your story..."
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col gap-2">
          <label htmlFor="image" className="text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-500 file:text-white file:rounded-md"
          />
        </div>

        <div className="text-center pt-4">
          {/* <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Publish Article
          </button> */}
          <StatefulButtonDemo />
        </div>
      </form>
    </div>
  );
};


export default WriteArticles;


import { Button } from '../Components/ui/stateful-button';
function StatefulButtonDemo() {
  const handleClick = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 4000);
    });
  };
  return (
    <div className="flex h-40 w-full items-center justify-center ">
      <Button onClick={handleClick}>Publish Article</Button>
    </div>
  );
}