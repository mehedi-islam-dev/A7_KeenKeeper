import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Timeline = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('keenkeeper_timeline')) || [];
    setEvents(savedEvents);
  }, []);

  const filteredEvents = filter === 'All' ? events : events.filter(e => e.type === filter);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getIcon = (type) => {
    switch (type) {
      case 'Call': return <i className="fas fa-phone-alt text-xl text-[#3b82f6]"></i>;
      case 'Text': return <i className="fas fa-comment-dots text-xl text-[#10b981]"></i>;
      case 'Video': return <i className="fas fa-video text-xl text-[#8b5cf6]"></i>;
      default: return <i className="fas fa-check text-xl text-gray-500"></i>;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-[60vh]">
      
      <div className="mb-8 flex flex-col gap-4 mt-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0B0F19]">Timeline</h1>
   
        <div>
          <select 
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-[#3b82f6] focus:border-[#3b82f6] block p-2.5 outline-none shadow-sm cursor-pointer w-40 font-medium transition-colors"
          >
            <option value="All">Filter Timeline</option>
            <option value="Call">Calls</option>
            <option value="Text">Texts</option>
            <option value="Video">Video Calls</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {filteredEvents.length === 0 ? (
          <div className="p-12 text-center text-gray-500 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-5xl mb-4 text-gray-200"><i className="fas fa-inbox"></i></div>
            <p className="text-lg font-medium text-gray-600">No interactions found.</p>
            <p className="text-sm mt-1">Go to a friend's profile to log a call, text, or video.</p>
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div key={event.id} className="p-5 flex items-center gap-5 bg-white border-2 border-dashed border-[#3b82f6]/40 rounded-xl hover:border-[#3b82f6] transition-colors shadow-sm group">
            
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors">
                {getIcon(event.type)}
              </div>
              
              <div className="grow">
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-0.5">
                  {event.type} <span className="font-normal text-gray-500 text-sm md:text-base">with</span> {event.friendName}
                </h3>
                <p className="text-xs text-gray-400 font-medium">{formatDate(event.date)}</p>
              </div>

              <Link to={`/friend/${event.friendId}`} className="shrink-0 hidden sm:block hover:scale-105 transition-transform">
                <img src={event.picture} alt={event.friendName} className="w-11 h-11 rounded-full object-cover shadow-sm border-2 border-white" />
              </Link>
              
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Timeline;