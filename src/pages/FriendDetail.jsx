import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import friendsData from '../data/friends.json';

const FriendDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    const selectedFriend = friendsData.find(f => f.id === parseInt(id));
    if (selectedFriend) {
      setFriend(selectedFriend);
    }
  }, [id]);

  const handleInteraction = (type) => {
    const newEvent = {
      id: Date.now(),
      friendId: friend.id,
      friendName: friend.name,
      type: type,
      date: new Date().toISOString(),
      title: `${type} with ${friend.name}`,
      picture: friend.picture
    };

    const existingTimeline = JSON.parse(localStorage.getItem('keenkeeper_timeline')) || [];
    const updatedTimeline = [newEvent, ...existingTimeline]; 
    localStorage.setItem('keenkeeper_timeline', JSON.stringify(updatedTimeline));

    toast.success(`${type} logged with ${friend.name}!`, {
      icon: type === 'Call' ? '📞' : type === 'Text' ? '💬' : '🎥'
    });
  };

  if (!friend) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#1e3932]"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      
      <button onClick={() => navigate(-1)} className="mb-6 text-gray-500 hover:text-[#1e3932] flex items-center gap-2 font-medium transition-colors text-sm">
        <i className="fas fa-arrow-left"></i> Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
        
        <div className="lg:col-span-4 lg:row-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center h-full">
          <img src={friend.picture} alt={friend.name} className="w-24 h-24 rounded-full object-cover mb-4 shadow-sm border-2 border-white" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">{friend.name}</h2>
          
          <div className="flex flex-col items-center gap-1.5 mb-4">
            <span className={`text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider ${
                friend.status === 'on-track' ? 'bg-[#e2f5ec] text-[#16a34a]' : 
                friend.status === 'overdue' ? 'bg-[#ff4d4f] text-white' : 
                'bg-[#fef3c7] text-[#f59e0b]'
              }`}>
              {friend.status.replace('-', ' ')}
            </span>
            {friend.tags.map((tag, index) => (
              <span key={index} className="bg-[#e2f5ec] text-[#1e3932] text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>

          <p className="text-gray-500 italic mb-2 text-sm leading-relaxed">"{friend.bio}"</p>
          <p className="text-xs text-gray-400 font-medium">Preferred: {friend.email}</p>
        </div>

       <div className="lg:col-span-8 lg:row-span-1 grid grid-cols-3 gap-4 h-full">
          <div className="bg-white py-5 px-2 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center h-full">
            <h3 className="text-3xl font-bold text-[#1e3932] mb-1">{friend.days_since_contact}</h3>
            <p className="text-gray-500 text-xs font-medium">Days Since Contact</p>
          </div>
          <div className="bg-white py-5 px-2 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center h-full">
            <h3 className="text-3xl font-bold text-[#1e3932] mb-1">{friend.goal}</h3>
            <p className="text-gray-500 text-xs font-medium">Goal (Days)</p>
          </div>
          <div className="bg-white py-5 px-2 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center h-full">
            <h3 className="text-xl font-bold text-[#1e3932] mb-1">
              {new Date(friend.next_due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </h3>
            <p className="text-gray-500 text-xs font-medium">Next Due</p>
          </div>
        </div>
        
        <div className="lg:col-span-8 lg:row-span-1 bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center h-full">
          <div>
            <h4 className="text-[#1e3932] font-semibold text-base mb-1">Relationship Goal</h4>
            <p className="text-gray-500 text-sm">Connect every <span className="font-bold text-gray-800">{friend.goal} days</span></p>
          </div>
          <button className="text-xs border border-gray-200 px-4 py-2 rounded-md bg-gray-50 hover:bg-gray-100 font-medium transition-colors text-gray-700">
            Edit
          </button>
        </div>

        <div className="lg:col-span-4 lg:row-span-1 flex flex-col gap-3 h-full justify-between">
          <button className="flex-1 w-full bg-white border border-gray-100 hover:bg-gray-50 text-gray-700 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm text-sm">
            <i className="far fa-bell text-gray-400"></i> Snooze 2 Weeks
          </button>
          <button className="flex-1 w-full bg-white border border-gray-100 hover:bg-gray-50 text-gray-700 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm text-sm">
            <i className="fas fa-archive text-gray-400"></i> Archive
          </button>
          <button className="flex-1 w-full bg-white border border-gray-100 hover:bg-red-50 text-[#ff4d4f] rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm text-sm">
            <i className="far fa-trash-alt"></i> Delete
          </button>
        </div>
        
        <div className="lg:col-span-8 lg:row-span-1 bg-white p-5 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col justify-center">
          <h4 className="text-[#1e3932] font-semibold text-base mb-4">Quick Check-In</h4>
          <div className="grid grid-cols-3 gap-4 h-full">
            <button 
              onClick={() => handleInteraction('Call')}
              className="flex flex-col items-center justify-center gap-2 py-6 border border-gray-100 rounded-xl hover:border-[#1e3932] hover:bg-gray-50 transition-colors text-gray-700 bg-[#fbfbfb] shadow-sm h-full"
            >
              <i className="fas fa-phone-alt text-xl mb-1"></i>
              <span className="font-medium text-sm">Call</span>
            </button>
            
            <button 
              onClick={() => handleInteraction('Text')}
              className="flex flex-col items-center justify-center gap-2 py-6 border border-gray-100 rounded-xl hover:border-[#1e3932] hover:bg-gray-50 transition-colors text-gray-700 bg-[#fbfbfb] shadow-sm h-full"
            >
              <i className="fas fa-comment-dots text-xl mb-1"></i>
              <span className="font-medium text-sm">Text</span>
            </button>
            
            <button 
              onClick={() => handleInteraction('Video')}
              className="flex flex-col items-center justify-center gap-2 py-6 border border-gray-100 rounded-xl hover:border-[#1e3932] hover:bg-gray-50 transition-colors text-gray-700 bg-[#fbfbfb] shadow-sm h-full"
            >
              <i className="fas fa-video text-xl mb-1"></i>
              <span className="font-medium text-sm">Video</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FriendDetail;