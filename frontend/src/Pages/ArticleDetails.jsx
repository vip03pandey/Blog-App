import React, { useState, useMemo } from 'react';
import { debounce } from 'lodash';
import { Copy, Check } from 'lucide-react';

const ArticleDetails = ({ articleId }) => {
  const currDate = Date.now();
  const [inputComment, setInputComment] = useState("");
  const [comment, setComment] = useState("");
  const [copied, setCopied] = useState(false);
  
  const debouncedSetComment = useMemo(
    () =>
      debounce((val) => {
        setComment(val);
      }, 2000),
    []
  );
  
  const handleInputChange = (e) => {
    setInputComment(e.target.value);
    debouncedSetComment(e.target.value);
  };

  const handleCopyLink = async () => {
    try {
      const articleUrl = `${window.location.origin}/article/${articles.id}`;
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div>
      <div className="mt-10 mx-auto max-w-3xl bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-snug">
          {articles.title}
        </h1>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={articles.userAvtaar}
              alt={articles.author}
              className="h-10 w-10 rounded-full object-cover border border-gray-300"
            />
            <span className="text-sm text-gray-700 font-medium">{articles.author}</span>
            <span className="text-sm text-gray-500">{articles.date}</span>
          </div>
          
          <button
            onClick={handleCopyLink}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 text-sm font-medium"
            title="Copy article link"
          >
            {copied ? (
              <>
                <Check size={16} className="text-green-600" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
        
        <div className='flex items-center justify-center'>
          <img src={articles.image} alt="" className='max-w-2xl max-h-2xl w-[80%]'/>
        </div>
        
        <p className="text-gray-700 text-base leading-relaxed text-justify mt-8">{articles.content}</p>
      </div>

      <div className="mt-10 mx-auto max-w-3xl bg-white p-6 rounded-xl shadow-sm">
        <h1 className='text-1xl md:text-2xl font-extrabold text-gray-900 mb-4 leading-relaxed text-justify'>Responses</h1>
        <div className="flex flex-col gap-4 mt-4">
          <label htmlFor="comments">Write your Comments</label>
          <textarea
            id="comments"
            value={inputComment}
            onChange={handleInputChange}
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write your Comments..."
          ></textarea>
          <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition w-[20%] mx-auto">Submit</button>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center space-x-4">
                <img src={comment.image} alt="" className="h-10 w-10 rounded-full object-cover border border-gray-300"/>
                <div className="flex flex-col items-start">
                  <span className="text-sm text-gray-700 font-medium">{comment.name}</span>
                  <span className="text-sm text-gray-500">{comment.date}</span>
                </div>
              </div>
              <p className="text-gray-700 text-base leading-relaxed text-justify">{comment.comments}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const articles = {
  id: 1,
  slug: "amazing-tailwindcss-grid-layouts",
  author: "Vipul Pandey",
  date: "28th March, 2023",
  title: "Amazing Tailwindcss Grid Layout Examples.Amazing Tailwindcss Grid Layout Examples.",
  content:
    "Large Language Models (LLMs) are a class of advanced artificial intelligence systems designed to understand and generate human-like text based on vast amounts of training data. Built upon transformer architectures, LLMs such as GPT, PaLM, and LLaMA are trained on billions of parameters and are capable of performing a wide range of natural language tasks — from answering questions, translating languages, summarizing documents, to generating creative content. Their impressive performance comes from deep learning techniques that enable them to capture intricate patterns in language, context, and meaning. However, the rise of LLMs has also sparked discussions around ethical use, misinformation, data privacy, and bias. While they offer immense potential in education, business automation, customer support, and scientific research, responsible development and deployment are crucial to ensure they benefit society without reinforcing harmful stereotypes or disinformation. As LLMs continue to evolve, the focus is gradually shifting toward more efficient models, better alignment with human intent, open-source alternatives, and methods to reduce hallucinations and improve factual accuracy. Their real-world applications — including code generation, conversational agents, legal drafting, and personalized tutoring — showcase the transformative power of language as a programmable interface. In the coming years, LLMs are likely to play a pivotal role in redefining how humans interact with machines, as well as how knowledge is created, shared, and consumed.",
  image:
    "https://cdn.prod.website-files.com/63bc83b29094ec80844b6dd5/6526dc79dea0f080d2d61d6f_Starting-with-large-language-models.webp",
  userAvtaar:
    "https://cdn-imgix.headout.com/tour/7064/TOUR-IMAGE/b2c74200-8da7-439a-95b6-9cad1aa18742-4445-dubai-img-worlds-of-adventure-tickets-02.jpeg?auto=format&w=900&h=562.5&q=90&ar=16%3A10&crop=faces%2Ccenter&fit=crop",
  likes: 10,
};

const comments = [
  {
    id: 1,
    name: "Vipul Pandey",
    comments: "Amazing Tailwindcss Grid Layout Examples.Amazing Tailwindcss Grid Layout Examples.Amazing Tailwindcss Grid Layout Examples.Amazing Tailwindcss Grid Layout Examples",
    date: "28th March, 2023",
    image: "https://cdn-imgix.headout.com/tour/7064/TOUR-IMAGE/b2c74200-8da7-439a-95b6-9cad1aa18742-4445-dubai-img-worlds-of-adventure-tickets-02.jpeg?auto=format&w=900&h=562.5&q=90&ar=16%3A10&crop=faces%2Ccenter&fit=crop",
  },
  {
    id: 2,
    name: "Vipul Pandey",
    comments: "Amazing Tailwindcss Grid Layout Examples.Amazing Tailwindcss Grid Layout Examples",
    date: "28th March, 2023",
    image: "https://cdn-imgix.headout.com/tour/7064/TOUR-IMAGE/b2c74200-8da7-439a-95b6-9cad1aa18742-4445-dubai-img-worlds-of-adventure-tickets-02.jpeg?auto=format&w=900&h=562.5&q=90&ar=16%3A10&crop=faces%2Ccenter&fit=crop",
  },
  {
    id: 3,
    name: "Vipul Pandey",
    comments: "Amazing Tailwindcss Grid Layout Examples.Amazing Tailwindcss Grid Layout Examples",
    date: "28th March, 2023",
  }
];

export default ArticleDetails;