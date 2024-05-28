import React from 'react';
import ReadMoreButton from './ReadMoreButton';

export default function Card({ data }) {
    return (
        <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
                {data.articles.map((article, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden w-full">
                        <div className="h-48">
                            <img src={article.urlToImage || 'https://via.placeholder.com/300'} alt="article image" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                            <span className="inline-block bg-teal-500 text-white text-xs uppercase font-semibold rounded-full px-2 py-1">{article.source.name}</span>
                            <h4 className="mt-2 text-xl font-semibold text-gray-800 truncate h-[40px]">{article.title}</h4>
                            <p className="mt-2 text-gray-600 truncate">{article.description || 'No description available'}</p>
                            <div className="flex items-center mt-4">
                                <img src="https://via.placeholder.com/40" alt="user" className="w-8 h-8 rounded-full mr-2" />
                                <div className='w-[60%] truncate '>
                                    <h5 className="font-semibold text-gray-700 truncate">{article.author || 'Unknown Author'}</h5>
                                    <small className="text-gray-600">{new Date(article.publishedAt).toLocaleDateString()}</small>
                                </div>
                                <ReadMoreButton Link={article.url} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
