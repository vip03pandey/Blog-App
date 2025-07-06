const { ObjectId } = require('mongodb');
const posts=[
    {
        title: 'How to build a blog with Next.js and MongoDB',
        content: 'Large Language Models (LLMs) are a class of advanced artificial intelligence systems designed to understand and generate human-like text based on vast amounts of training data. Built upon transformer architectures, LLMs such as GPT, PaLM, and LLaMA are trained on billions of parameters and are capable of performing a wide range of natural language tasks — from answering questions, translating languages, summarizing documents, to generating creative content. Their impressive performance comes from deep learning techniques that enable them to capture intricate patterns in language, context, and meaning. However, the rise of LLMs has also sparked discussions around ethical use, misinformation, data privacy, and bias. While they offer immense potential in education, business automation, customer support, and scientific research, responsible development and deployment are crucial to ensure they benefit society without reinforcing harmful stereotypes or disinformation. As LLMs continue to evolve, the focus is gradually shifting toward more efficient models, better alignment with human intent, open-source alternatives, and methods to reduce hallucinations and improve factual accuracy. Their real-world applications — including code generation, conversational agents, legal drafting, and personalized tutoring — showcase the transformative power of language as a programmable interface. In the coming years, LLMs are likely to play a pivotal role in redefining how humans interact with machines, as well as how knowledge is created, shared, and consumed.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        author: new ObjectId('6868d42019a6852334ff5c55'),
        likes: 10,
        comments: [
          {
            user: new ObjectId('6868d42019a6852334ff5c56'),
            content: 'This is a great post! I love how you used Next.js and MongoDB to build a blog. Keep up the great work!',
            createdAt: new Date()
          },
          {
            user: new ObjectId('6868d42019a6852334ff5c57'),
            content: 'Thanks for sharing this post! I found it really helpful in getting started with Next.js and MongoDB.',
            createdAt: new Date()
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'How to build a blog with Next.js and MongoDB',
        content: 'Large Language Models (LLMs) are a class of advanced artificial intelligence systems designed to understand and generate human-like text based on vast amounts of training data. Built upon transformer architectures, LLMs such as GPT, PaLM, and LLaMA are trained on billions of parameters and are capable of performing a wide range of natural language tasks — from answering questions, translating languages, summarizing documents, to generating creative content. Their impressive performance comes from deep learning techniques that enable them to capture intricate patterns in language, context, and meaning. However, the rise of LLMs has also sparked discussions around ethical use, misinformation, data privacy, and bias. While they offer immense potential in education, business automation, customer support, and scientific research, responsible development and deployment are crucial to ensure they benefit society without reinforcing harmful stereotypes or disinformation. As LLMs continue to evolve, the focus is gradually shifting toward more efficient models, better alignment with human intent, open-source alternatives, and methods to reduce hallucinations and improve factual accuracy. Their real-world applications — including code generation, conversational agents, legal drafting, and personalized tutoring — showcase the transformative power of language as a programmable interface. In the coming years, LLMs are likely to play a pivotal role in redefining how humans interact with machines, as well as how knowledge is created, shared, and consumed.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        author: new ObjectId('6868d42019a6852334ff5c55'),
        likes: 10,
        comments: [
          {
            user: new ObjectId('6868d42019a6852334ff5c56'),
            content: 'This is a great post! I love how you used Next.js and MongoDB to build a blog. Keep up the great work!',
            createdAt: new Date()
          },
          {
            user: new ObjectId('6868d42019a6852334ff5c57'),
            content: 'Thanks for sharing this post! I found it really helpful in getting started with Next.js and MongoDB.',
            createdAt: new Date()
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'How to build a blog with Next.js and MongoDB',
        content: 'Large Language Models (LLMs) are a class of advanced artificial intelligence systems designed to understand and generate human-like text based on vast amounts of training data. Built upon transformer architectures, LLMs such as GPT, PaLM, and LLaMA are trained on billions of parameters and are capable of performing a wide range of natural language tasks — from answering questions, translating languages, summarizing documents, to generating creative content. Their impressive performance comes from deep learning techniques that enable them to capture intricate patterns in language, context, and meaning. However, the rise of LLMs has also sparked discussions around ethical use, misinformation, data privacy, and bias. While they offer immense potential in education, business automation, customer support, and scientific research, responsible development and deployment are crucial to ensure they benefit society without reinforcing harmful stereotypes or disinformation. As LLMs continue to evolve, the focus is gradually shifting toward more efficient models, better alignment with human intent, open-source alternatives, and methods to reduce hallucinations and improve factual accuracy. Their real-world applications — including code generation, conversational agents, legal drafting, and personalized tutoring — showcase the transformative power of language as a programmable interface. In the coming years, LLMs are likely to play a pivotal role in redefining how humans interact with machines, as well as how knowledge is created, shared, and consumed.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        author: new ObjectId('6868d42019a6852334ff5c55'),
        likes: 10,
        comments: [
          {
            user: new ObjectId('6868d42019a6852334ff5c56'),
            content: 'This is a great post! I love how you used Next.js and MongoDB to build a blog. Keep up the great work!',
            createdAt: new Date()
          },
          {
            user: new ObjectId('6868d42019a6852334ff5c57'),
            content: 'Thanks for sharing this post! I found it really helpful in getting started with Next.js and MongoDB.',
            createdAt: new Date()
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'How to build a blog with Next.js and MongoDB',
        content: 'Large Language Models (LLMs) are a class of advanced artificial intelligence systems designed to understand and generate human-like text based on vast amounts of training data. Built upon transformer architectures, LLMs such as GPT, PaLM, and LLaMA are trained on billions of parameters and are capable of performing a wide range of natural language tasks — from answering questions, translating languages, summarizing documents, to generating creative content. Their impressive performance comes from deep learning techniques that enable them to capture intricate patterns in language, context, and meaning. However, the rise of LLMs has also sparked discussions around ethical use, misinformation, data privacy, and bias. While they offer immense potential in education, business automation, customer support, and scientific research, responsible development and deployment are crucial to ensure they benefit society without reinforcing harmful stereotypes or disinformation. As LLMs continue to evolve, the focus is gradually shifting toward more efficient models, better alignment with human intent, open-source alternatives, and methods to reduce hallucinations and improve factual accuracy. Their real-world applications — including code generation, conversational agents, legal drafting, and personalized tutoring — showcase the transformative power of language as a programmable interface. In the coming years, LLMs are likely to play a pivotal role in redefining how humans interact with machines, as well as how knowledge is created, shared, and consumed.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        author: new ObjectId('6868d42019a6852334ff5c55'),
        likes: 10,
        comments: [
          {
            user: new ObjectId('6868d42019a6852334ff5c56'),
            content: 'This is a great post! I love how you used Next.js and MongoDB to build a blog. Keep up the great work!',
            createdAt: new Date()
          },
          {
            user: new ObjectId('6868d42019a6852334ff5c57'),
            content: 'Thanks for sharing this post! I found it really helpful in getting started with Next.js and MongoDB.',
            createdAt: new Date()
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'How to build a blog with Next.js and MongoDB',
        content: 'Large Language Models (LLMs) are a class of advanced artificial intelligence systems designed to understand and generate human-like text based on vast amounts of training data. Built upon transformer architectures, LLMs such as GPT, PaLM, and LLaMA are trained on billions of parameters and are capable of performing a wide range of natural language tasks — from answering questions, translating languages, summarizing documents, to generating creative content. Their impressive performance comes from deep learning techniques that enable them to capture intricate patterns in language, context, and meaning. However, the rise of LLMs has also sparked discussions around ethical use, misinformation, data privacy, and bias. While they offer immense potential in education, business automation, customer support, and scientific research, responsible development and deployment are crucial to ensure they benefit society without reinforcing harmful stereotypes or disinformation. As LLMs continue to evolve, the focus is gradually shifting toward more efficient models, better alignment with human intent, open-source alternatives, and methods to reduce hallucinations and improve factual accuracy. Their real-world applications — including code generation, conversational agents, legal drafting, and personalized tutoring — showcase the transformative power of language as a programmable interface. In the coming years, LLMs are likely to play a pivotal role in redefining how humans interact with machines, as well as how knowledge is created, shared, and consumed.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        author: new ObjectId('6868d42019a6852334ff5c55'),
        likes: 10,
        comments: [
          {
            user: new ObjectId('6868d42019a6852334ff5c56'),
            content: 'This is a great post! I love how you used Next.js and MongoDB to build a blog. Keep up the great work!',
            createdAt: new Date()
          },
          {
            user: new ObjectId('6868d42019a6852334ff5c57'),
            content: 'Thanks for sharing this post! I found it really helpful in getting started with Next.js and MongoDB.',
            createdAt: new Date()
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'How to build a blog with Next.js and MongoDB',
        content: 'Large Language Models (LLMs) are a class of advanced artificial intelligence systems designed to understand and generate human-like text based on vast amounts of training data. Built upon transformer architectures, LLMs such as GPT, PaLM, and LLaMA are trained on billions of parameters and are capable of performing a wide range of natural language tasks — from answering questions, translating languages, summarizing documents, to generating creative content. Their impressive performance comes from deep learning techniques that enable them to capture intricate patterns in language, context, and meaning. However, the rise of LLMs has also sparked discussions around ethical use, misinformation, data privacy, and bias. While they offer immense potential in education, business automation, customer support, and scientific research, responsible development and deployment are crucial to ensure they benefit society without reinforcing harmful stereotypes or disinformation. As LLMs continue to evolve, the focus is gradually shifting toward more efficient models, better alignment with human intent, open-source alternatives, and methods to reduce hallucinations and improve factual accuracy. Their real-world applications — including code generation, conversational agents, legal drafting, and personalized tutoring — showcase the transformative power of language as a programmable interface. In the coming years, LLMs are likely to play a pivotal role in redefining how humans interact with machines, as well as how knowledge is created, shared, and consumed.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        author: new ObjectId('6868d42019a6852334ff5c55'),
        likes: 10,
        comments: [
          {
            user: new ObjectId('6868d42019a6852334ff5c56'),
            content: 'This is a great post! I love how you used Next.js and MongoDB to build a blog. Keep up the great work!',
            createdAt: new Date()
          },
          {
            user: new ObjectId('6868d42019a6852334ff5c57'),
            content: 'Thanks for sharing this post! I found it really helpful in getting started with Next.js and MongoDB.',
            createdAt: new Date()
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'How to build a blog with Next.js and MongoDB',
        content: 'Large Language Models (LLMs) are a class of advanced artificial intelligence systems designed to understand and generate human-like text based on vast amounts of training data. Built upon transformer architectures, LLMs such as GPT, PaLM, and LLaMA are trained on billions of parameters and are capable of performing a wide range of natural language tasks — from answering questions, translating languages, summarizing documents, to generating creative content. Their impressive performance comes from deep learning techniques that enable them to capture intricate patterns in language, context, and meaning. However, the rise of LLMs has also sparked discussions around ethical use, misinformation, data privacy, and bias. While they offer immense potential in education, business automation, customer support, and scientific research, responsible development and deployment are crucial to ensure they benefit society without reinforcing harmful stereotypes or disinformation. As LLMs continue to evolve, the focus is gradually shifting toward more efficient models, better alignment with human intent, open-source alternatives, and methods to reduce hallucinations and improve factual accuracy. Their real-world applications — including code generation, conversational agents, legal drafting, and personalized tutoring — showcase the transformative power of language as a programmable interface. In the coming years, LLMs are likely to play a pivotal role in redefining how humans interact with machines, as well as how knowledge is created, shared, and consumed.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        author: new ObjectId('6868d42019a6852334ff5c55'),
        likes: 10,
        comments: [
          {
            user: new ObjectId('6868d42019a6852334ff5c56'),
            content: 'This is a great post! I love how you used Next.js and MongoDB to build a blog. Keep up the great work!',
            createdAt: new Date()
          },
          {
            user: new ObjectId('6868d42019a6852334ff5c57'),
            content: 'Thanks for sharing this post! I found it really helpful in getting started with Next.js and MongoDB.',
            createdAt: new Date()
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'How to build a blog with Next.js and MongoDB',
        content: 'Large Language Models (LLMs) are a class of advanced artificial intelligence systems designed to understand and generate human-like text based on vast amounts of training data. Built upon transformer architectures, LLMs such as GPT, PaLM, and LLaMA are trained on billions of parameters and are capable of performing a wide range of natural language tasks — from answering questions, translating languages, summarizing documents, to generating creative content. Their impressive performance comes from deep learning techniques that enable them to capture intricate patterns in language, context, and meaning. However, the rise of LLMs has also sparked discussions around ethical use, misinformation, data privacy, and bias. While they offer immense potential in education, business automation, customer support, and scientific research, responsible development and deployment are crucial to ensure they benefit society without reinforcing harmful stereotypes or disinformation. As LLMs continue to evolve, the focus is gradually shifting toward more efficient models, better alignment with human intent, open-source alternatives, and methods to reduce hallucinations and improve factual accuracy. Their real-world applications — including code generation, conversational agents, legal drafting, and personalized tutoring — showcase the transformative power of language as a programmable interface. In the coming years, LLMs are likely to play a pivotal role in redefining how humans interact with machines, as well as how knowledge is created, shared, and consumed.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        author: new ObjectId('6868d42019a6852334ff5c55'),
        likes: 10,
        comments: [
          {
            user: new ObjectId('6868d42019a6852334ff5c56'),
            content: 'This is a great post! I love how you used Next.js and MongoDB to build a blog. Keep up the great work!',
            createdAt: new Date()
          },
          {
            user: new ObjectId('6868d42019a6852334ff5c57'),
            content: 'Thanks for sharing this post! I found it really helpful in getting started with Next.js and MongoDB.',
            createdAt: new Date()
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },       
]

module.exports=posts;