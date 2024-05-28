import React, { useState, useEffect } from 'react';
import NavBar from '../common/NavBar';
import Card from './Card';

export default function NewsFeed({ onClose }) {
    const [selectedCountry, setSelectedCountry] = useState('in'); // default to 'in'
    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async (country) => {
        const API_URL = `https://newsapi.org/v2/top-headlines?country=${country}&category=technology&apiKey=bdcb10d2d61f43f982f9fb2d7e311e6d`;
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setCardData(data.articles);
        } catch (error) {
            console.error("Error fetching news data:", error);
        } finally {
            setLoading(false); // Set loading to false once the data is fetched
        }
    };

    useEffect(() => {
        setLoading(true); // Set loading to true when the selected country changes
        const timer = setTimeout(() => {
            fetchData(selectedCountry);
        }, 1000); // Fetch data after a 5-second delay

        return () => clearTimeout(timer); // Clear timeout if the component unmounts or country changes
    }, [selectedCountry]);

    const countries = [
        // { code: "ae", name: "United Arab Emirates" },
        // { code: "ar", name: "Argentina" },
        // { code: "at", name: "Austria" },
        // { code: "au", name: "Australia" },
        // { code: "be", name: "Belgium" },
        // { code: "bg", name: "Bulgaria" },
        // { code: "br", name: "Brazil" },
        // { code: "ca", name: "Canada" },
        // { code: "ch", name: "Switzerland" },
        { code: "cn", name: "China" },
        // { code: "co", name: "Colombia" },
        // { code: "cu", name: "Cuba" },
        // { code: "cz", name: "Czech Republic" },
        // { code: "de", name: "Germany" },
        // { code: "eg", name: "Egypt" },
        // { code: "fr", name: "France" },
        { code: "gb", name: "United Kingdom" },
        // { code: "gr", name: "Greece" },
        { code: "hk", name: "Hong Kong" },
        // { code: "hu", name: "Hungary" },
        { code: "id", name: "Indonesia" },
        // { code: "ie", name: "Ireland" },
        // { code: "il", name: "Israel" },
        { code: "in", name: "India" },
        { code: "it", name: "Italy" },
        { code: "jp", name: "Japan" },
        { code: "kr", name: "South Korea" },
        // { code: "lt", name: "Lithuania" },
        // { code: "lv", name: "Latvia" },
        // { code: "ma", name: "Morocco" },
        { code: "mx", name: "Mexico" },
        { code: "my", name: "Malaysia" },
        // { code: "ng", name: "Nigeria" },
        { code: "nl", name: "Netherlands" },
        { code: "no", name: "Norway" },
        { code: "nz", name: "New Zealand" },
        { code: "ph", name: "Philippines" },
        { code: "pl", name: "Poland" },
        { code: "pt", name: "Portugal" },
        { code: "ro", name: "Romania" },
        // { code: "rs", name: "Serbia" },
        { code: "ru", name: "Russia" },
        { code: "sa", name: "Saudi Arabia" },
        { code: "se", name: "Sweden" },
        { code: "sg", name: "Singapore" },
        // { code: "si", name: "Slovenia" },
        // { code: "sk", name: "Slovakia" },
        { code: "th", name: "Thailand" },
        { code: "tr", name: "Turkey" },
        { code: "tw", name: "Taiwan" },
        { code: "ua", name: "Ukraine" },
        { code: "us", name: "United States" },
        // { code: "ve", name: "Venezuela" },
        { code: "za", name: "South Africa" }
    ];

    return (
        <div className='flex w-[100vw] h-[100vh] glass-effect items-center justify-center'>
            <div className='w-[95vw] h-[90vh] animated-bg overflow-auto custom-scrollbar'>
                <div className='w-[92.5vw] mx-4 sticky top-1 z-40 glass-effect rounded-lg flex items-center'>
                    <div>
                        <img src='/favicon.png' alt='logo' width={100} />
                    </div>
                    <div className="my-auto absolute right-0 flex gap-3">
                        <select 
                            name="country" 
                            id="country-select" 
                            className='w-48 rounded-md flex items-center justify-center custom-scrollbar bg-transparent border'
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                        >
                            {countries.map((country) => (
                                <option key={country.code} value={country.code} className='px-6'>{country.name}</option>
                            ))}
                        </select>
                        <button onClick={onClose} className='mx-4 border-2 px-4 rounded-md text-[#ef4444] uppercase hover:bg-[#dc2626] hover:text-[#fafafa]'>Close</button>
                    </div>
                </div>
                {loading ? (
                    <div className='text-white text-center m-auto relative flex justify-center items-center h-[70%] '>
                        <img src="/Animation-loading.gif" className='' alt="loading ..." />
                    </div>
                ) : (
                    <Card data={{ articles: cardData }} />
                )}
            </div>
        </div>
    );
}
