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
          <div style={{ color: 'silver', fontFamily: 'Courier New', fontSize: '2rem', padding: '10px', borderRadius: '5px' }}>
            <h2>The weather condition in {weatherData.location.name} is {weatherData.current.condition.text}, with a temperature of {weatherData.current.temp_f}°F</h2>
          </div>
        )}
        </div>
      <div className="mb-40 grid text-center lg:mb-0 lg:grid-cols-0 lg:text-left">
        <a
          href="https://shop.merch.google/shop/apparel/mens"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Best Outfits{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-70`}>
            Find in-depth information based on the time, weather, and area.
          </p>
        </a>
      </div>
    </main>
  )
}
