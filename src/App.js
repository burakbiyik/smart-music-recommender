import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  const [search, setSearch] = useState("");
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);

  const fetchData = async () => {
    try {
      // Arama sorgusunu uygun şekilde kodla
      const encodedSearch = encodeURIComponent(search.trim());
      
      if (encodedSearch === "") {
        setArtists([]); // Boş arama yapılırsa sonuçları temizle
        setTracks([]); // Boş arama yapılırsa sonuçları temizle
        return;
      }
  
      const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodedSearch}&type=artist,track`,
        {
          headers: {
            // curl -X POST "https://accounts.spotify.com/api/token" \ -H "Content-Type: application/x-www-form-urlencoded" \ -d "grant_type=client_credentials&client_id=f7656932beb540ba863bcb0145280ef7&client_secret=f96f32c103d04045bc2ea7b8bbb4848d"
            Authorization: 'Bearer BQCExCVpOq8jv6lIqfF8eA0dysgPAbJaTLbe6St8dRo_G_jLkKmaQ4di2AoGwr_tYoePszBVlhX_7ge-cK2QPwnp5rRx52b919cqQExuj_9omVnx1sM',
          },
        }
      );
      if (response.data && response.data.artists && response.data.artists.items) {
        setArtists(response.data.artists.items);
      }
      if (response.data && response.data.tracks && response.data.tracks.items) {
        setTracks(response.data.tracks.items);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  };

  return (
    <div className="App w-full my-2 mx-auto">
      <div className="relative w-full min-w-[200px] h-10">
        <input onChange={(e) => setSearch(e.target.value)} type="text" id="default-input" placeholder=" " className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"/>
        <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
          Search
        </label>
        <div className="flex justify-center">
          <Slider {...settings} className="w-full">
            {artists && artists.map((artist) => (
              <div key={artist.id} className="m-2">
                <div className="flex flex-col items-center">
                  {artist.images && artist.images.length > 0 && (
                    <a href={artist.external_urls.spotify}>
                      <img src={artist.images[0].url} alt={artist.name} style={{ maxWidth: '200px' }} />
                    </a>
                  )}
                  <a href={artist.external_urls.spotify}>
                    <h1 className="text-5xl font-bold">{artist.name}</h1>
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="flex justify-center my-20">
          <Slider {...settings} className="w-full">
            {tracks && tracks.map((track) => (
              <div key={track.id} className="m-2">
                <div className="flex flex-col items-center">
                  {track.album.images && track.album.images.length > 0 && (
                    <a href={track.external_urls.spotify}>
                      <img src={track.album.images[0].url} alt={track.name} style={{ maxWidth: '200px' }} />
                    </a>
                  )}
                  <a href={track.external_urls.spotify}>
                    <h1 className="text-5xl font-bold">{track.name}</h1>
                  </a>
                  <p className="text-lg">{track.artists.map(artist => artist.name).join(', ')}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default App;

