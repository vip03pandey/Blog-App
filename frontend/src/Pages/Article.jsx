import React from 'react'
// import { FollowerPointerCard } from '../Components/ui/following-pointer';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
  
  export function FollowingPointerDemo({filterByUser}) {
    // const filtered = filterByUser
    // ? articles.filter(article => article.authorId === filterByUser)
    // : articles;
      return (
        <div className="relative flex min-h-screen w-full items-center justify-center bg-white px-4 sm:px-6 lg:px-8">

              <div className='w-full max-w-3xl py-8'>           
                  <div className='flex flex-col gap-4 '>              
                      {blog.map((blogContent)=>(
                        <Link key={blogContent.id} to={`/article/${blogContent.id}`} className="mx-auto w-full border-b-1 rounded-2xl z-10">
                          <div key={blogContent.id} className="mx-auto w-full border-b-1 rounded-2xl z-10">               
                                  <div className='bg-white flex flex-col rounded-2xl border border-zinc-100 transition duration-200 hover:shadow-xl p-4'>                     
                                      <div className='flex flex-row justify-between items-start gap-4'>                         
                                          <div className='flex-1'>                             
                                              <div className="flex items-center gap-2 mb-2">
                                                  <span className="text-sm text-gray-600">{blogContent.author}</span>
                                              </div>
                                              <h1 className='text-sm md:text-2xl font-bold text-black leading-tight mb-2'>{blogContent.title}</h1>
                                          </div>                         
                                          <img src={blogContent.image} alt="thumbnail" className='w-[140px] h-[105px] object-cover rounded'/>                     
                                      </div>                     
                                      <div className='flex flex-row items-center gap-4 text-sm text-gray-500'>                         
                                          <div className="flex items-center gap-1">
                                              <span className="text-orange-500">★</span>
                                              <span>{blogContent.date}</span>
                                          </div>
                                          <div className="flex items-center gap-1">
                                              <span>👏</span>
                                              <span>{blogContent.likes || '8.5K'}</span>
                                          </div>
                                          <div className="flex items-center gap-1">
                                              <span>💬</span>
                                              <span>{blogContent.comments || '194'}</span>
                                          </div>
                                          <div className="ml-auto flex items-center gap-2">
                                              <button className="p-2 hover:bg-gray-100 rounded-full">
                                                  <span className="text-gray-400">⊖</span>
                                              </button>
                                              <button className="p-2 hover:bg-gray-100 rounded-full">
                                                  <span className="text-gray-400">🔖</span>
                                              </button>
                                              <button className="p-2 hover:bg-gray-100 rounded-full">
                                                  <span className="text-gray-400">⋯</span>
                                              </button>
                                          </div>
                                      </div>                   
                                  </div>               
                              {/* </FollowerPointerCard>                */}
                          </div>
                          </Link>
                      ))}           
                  </div>           
              </div>       
          </div>     
      );   
  }
  

const blog = [{
    id:1,
    slug: "amazing-tailwindcss-grid-layouts",
    author: "Manu Arora",
    date: "28th March, 2023",
    title: "Amazing Tailwindcss Grid Layout Examples",
    description:
      "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
    image: "https://f5b623aa.delivery.rocketcdn.me/wp-content/uploads/2023/06/page-4.jpg",
    userAvtaar: "/manu.png",
    likes:10,
  },{
    id:2,
    slug: "amazing-tailwindcss-grid-layouts",
    author: "Manu Arora",
    date: "28th March, 2023",
    title: "Amazing Tailwindcss Grid Layout Examples",
    description:
      "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
    image: "https://f5b623aa.delivery.rocketcdn.me/wp-content/uploads/2023/06/page-4.jpg",
    userAvtaar: "/manu.png",
    likes:10,},
  {
      id:3,
      slug: "amazing-tailwindcss-grid-layouts",
      author: "Manu Arora",
      date: "28th March, 2023",
      title: "This Little-Known PDF Parsing Library Will Save Enterprises Millions",
      description:
        "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
      image: "https://f5b623aa.delivery.rocketcdn.me/wp-content/uploads/2023/06/page-4.jpg",
      userAvtaar: "/manu.png",
      likes:10,},
      {
          id:4,
          slug: "amazing-tailwindcss-grid-layouts",
          author: "Manu Arora",
          date: "28th March, 2023",
          title: "This new IDE from Google is an absolute game changer",
          description:
            "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
          image: "https://f5b623aa.delivery.rocketcdn.me/wp-content/uploads/2023/06/page-4.jpg",
          userAvtaar: "/manu.png",
          likes:10,},
          {
              id:5,
              slug: "amazing-tailwindcss-grid-layouts",
              author: "Manu Arora",
              date: "28th March, 2023",
              title: "I Did a 2-Minute Plank Every Day for 31 Days — Here’s What Happened",
              description:
                "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
              image: "https://f5b623aa.delivery.rocketcdn.me/wp-content/uploads/2023/06/page-4.jpg",
              userAvtaar: "/manu.png",
              likes:10,},
            {
                id:6,
                slug: "amazing-tailwindcss-grid-layouts",
                author: "Manu Arora",
                date: "28th March, 2023",
                title: "Amazing Tailwindcss Grid Layout Examples",
                description:
                  "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
                image: "https://f5b623aa.delivery.rocketcdn.me/wp-content/uploads/2023/06/page-4.jpg",
                userAvtaar: "/manu.png",
                likes:10,},
                {
                    id:7,
                    slug: "amazing-tailwindcss-grid-layouts",
                    author: "Manu Arora",
                    date: "28th March, 2023",
                    title: "Amazing Tailwindcss Grid Layout Examples",
                    description:
                      "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
                    image: "https://f5b623aa.delivery.rocketcdn.me/wp-content/uploads/2023/06/page-4.jpg",
                    userAvtaar: "/manu.png",
                    likes:10,},
                    {
                        id:8,
                        slug: "amazing-tailwindcss-grid-layouts",
                        author: "Manu Arora",
                        date: "28th March, 2023",
                        title: "Amazing Tailwindcss Grid Layout Examples",
                        description:
                          "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
                        image: "https://f5b623aa.delivery.rocketcdn.me/wp-content/uploads/2023/06/page-4.jpg",
                        userAvtaar: "/manu.png",
                        likes:10,}
];

const TitleComponent = ({
  title,
  avatar
}) => (
  <div className="flex items-center space-x-2">
    <img
      src={avatar}
      height="20"
      width="20"
      alt="thumbnail"
      className="rounded-full border-2 border-white" />
    <p>{title}</p>
  </div>
);
