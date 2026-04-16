import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import friendsData from '../data/friends.json';

const Home = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [interactionsCount, setInteractionsCount] = useState(0);

  // (Loading animation)
  useEffect(() => {
    const timer = setTimeout(() => {
      setFriends(friendsData);
      
      const savedEvents = JSON.parse(localStorage.getItem('keenkeeper_timeline')) || [];
      setInteractionsCount(savedEvents.length);

      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  
  const totalFriends = friends.length;
  const onTrackCount = friends.filter(f => f.status === 'on-track').length;
  const needAttentionCount = friends.filter(f => f.status === 'overdue' || f.status === 'almost due').length;


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#1e3932]"></div>
      </div>
    );
  }

  return (
    <div className="w-full">

      <div className="text-center mb-16 mt-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B0F19] mb-4">
          Friends to keep close in your life
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto mb-8 text-sm md:text-base">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <button className="bg-[#1e3932] hover:bg-[#152a24] text-white px-6 py-2.5 rounded-md font-medium transition-colors shadow-sm flex items-center gap-2 mx-auto">
          <i className="fas fa-plus"></i> Add a Friend
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
          <h3 className="text-3xl font-bold text-[#1e3932] mb-1">{totalFriends}</h3>
          <p className="text-gray-500 text-sm font-medium">Total Friends</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
          <h3 className="text-3xl font-bold text-[#1e3932] mb-1">{onTrackCount}</h3>
          <p className="text-gray-500 text-sm font-medium">On Track</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
          <h3 className="text-3xl font-bold text-[#1e3932] mb-1">{needAttentionCount}</h3>
          <p className="text-gray-500 text-sm font-medium">Need Attention</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
          <h3 className="text-3xl font-bold text-[#1e3932] mb-1">{interactionsCount}</h3>
          <p className="text-gray-500 text-sm font-medium">Interactions</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0B0F19] mb-6">Your Friends</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {friends.map((friend) => (
            <Link 
              to={`/friend/${friend.id}`} 
              key={friend.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center flex flex-col items-center group"
            >
              <img 
                src={friend.picture} 
                alt={friend.name} 
                className="w-20 h-20 rounded-full object-cover mb-3 shadow-sm group-hover:scale-105 transition-transform"
              />
              
              <h3 className="text-lg font-bold text-gray-800">{friend.name}</h3>
              <p className="text-xs text-gray-400 mb-4">{friend.days_since_contact}d ago</p>
              
              <span className={`text-[10px] font-bold px-5 py-1.5 rounded-full uppercase tracking-wider mb-4 ${
                friend.status === 'on-track' ? 'bg-[#e2f5ec] text-[#16a34a]' : 
                friend.status === 'overdue' ? 'bg-[#fee2e2] text-[#ef4444]' : 
                'bg-[#fef3c7] text-[#f59e0b]'
              }`}>
                {friend.status.replace('-', ' ')}
              </span>

              <div className="flex flex-wrap justify-center gap-1.5 mt-auto w-full">
                {friend.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-50 border border-gray-100 text-gray-500 text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
              
            </Link>
          ))}

        </div>
      </div>

    </div>
  );
};

export default Home;