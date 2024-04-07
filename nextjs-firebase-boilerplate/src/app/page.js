'use client'

import { get } from 'http';
import Image from 'next/image'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'


const api = {
  key: "5562618e1a35485d804214524240604",
  base: "https://api.weatherapi.com/v1/current.json"
};


export default function Home() {

  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [city, setCity] = useState('');

  useEffect(() => {
    fetchWeatherData('London'); // Default city
  }, []);

  const fetchWeatherData = (cityName) => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${api.key}&q=${cityName}&aqi=no`)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data); // Set the fetched data
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // Ensure loading state is set to false even in case of an error
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      fetchWeatherData(city);
    };


  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-8 md:p-16 lg:p-24">
      <div className="mb-32 text-center lg:mb-0 lg:text-left">
        {/* Display weather data if available */}
        {weatherData && (
          <div style={{ backgroundColor: 'white', color: 'black', fontFamily: 'Courier New', fontSize: '2rem', padding: '10px', borderRadius: '5px' }}>
            <h2>The weather condition in {weatherData.location.name} is {weatherData.current.condition.text}, with a temperature of {weatherData.current.temp_f}°F</h2>
          </div>
        )}
        </div>

        
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
           
          
        </a>
      </div>
    </main>
  )
}
