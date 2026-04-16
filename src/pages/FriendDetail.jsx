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
    <div className="w-full">
      
      <button onClick={() => navigate(-1)} className="mb-8 text-gray-500 hover:text-[#1e3932] flex items-center gap-2 font-medium transition-colors">
        <i className="fas fa-arrow-left"></i> Back to Dashboard
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
            <img src={friend.picture} alt={friend.name} className="w-32 h-32 rounded-full object-cover mb-4 shadow-sm border-4 border-white" />
            <h2 className="text-2xl font-bold text-gray-800 mb-3">{friend.name}</h2>
            
            <span className={`text-[10px] font-bold px-5 py-1.5 rounded-full uppercase tracking-wider mb-5 ${
                friend.status === 'on-track' ? 'bg-[#e2f5ec] text-[#16a34a]' : 
                friend.status === 'overdue' ? 'bg-[#fee2e2] text-[#ef4444]' : 
                'bg-[#fef3c7] text-[#f59e0b]'
              }`}>
              {friend.status.replace('-', ' ')}
            </span>

            <div className="flex flex-wrap justify-center gap-1.5 mb-6 w-full">
              {friend.tags.map((tag, index) => (
                <span key={index} className="bg-gray-50 border border-gray-100 text-gray-500 text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-gray-500 italic mb-4 text-sm leading-relaxed">"{friend.bio}"</p>
            <p className="text-xs text-gray-400 font-medium">Preferred: {friend.email}</p>
          </div>

          <div className="flex flex-col gap-3">
            <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors shadow-sm text-sm">
              <i className="far fa-bell"></i> Snooze 2 Weeks
            </button>
            <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors shadow-sm text-sm">
              <i className="fas fa-archive text-gray-400"></i> Archive
            </button>
            <button className="w-full bg-white border border-red-100 hover:bg-red-50 text-red-500 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors shadow-sm text-sm">
              <i className="far fa-trash-alt"></i> Delete
            </button>
          </div>
        </div>

        <div className="w-full lg:w-2/3 flex flex-col gap-6">
      
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <h3 className="text-4xl font-bold text-[#1e3932] mb-2">{friend.days_since_contact}</h3>
              <p className="text-gray-500 text-sm font-medium">Days Since Contact</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <h3 className="text-4xl font-bold text-[#1e3932] mb-2">{friend.goal}</h3>
              <p className="text-gray-500 text-sm font-medium">Goal (Days)</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-[#1e3932] mb-2">
                {new Date(friend.next_due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </h3>
              <p className="text-gray-500 text-sm font-medium">Next Due</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
            <div>
              <h4 className="text-[#1e3932] font-semibold mb-1">Relationship Goal</h4>
              <p className="text-gray-500 text-sm">Connect every <span className="font-bold text-gray-800">{friend.goal} days</span></p>
            </div>
            <button className="text-sm border border-gray-200 px-5 py-2 rounded-lg hover:bg-gray-50 font-medium transition-colors shadow-sm text-gray-700">
              Edit
            </button>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h4 className="text-[#1e3932] font-semibold mb-5">Quick Check-In</h4>
            <div className="grid grid-cols-3 gap-4">
              <button 
                onClick={() => handleInteraction('Call')}
                className="flex flex-col items-center justify-center gap-3 py-6 border border-gray-100 rounded-xl hover:border-[#1e3932] hover:bg-[#f0f9f6] transition-colors text-gray-600 hover:text-[#1e3932] group"
              >
                <div className="w-12 h-12 rounded-full bg-gray-50 group-hover:bg-white flex items-center justify-center transition-colors">
                  <i className="fas fa-phone-alt text-xl text-[#3b82f6]"></i>
                </div>
                <span className="font-medium text-sm">Call</span>
              </button>
              
              <button 
                onClick={() => handleInteraction('Text')}
                className="flex flex-col items-center justify-center gap-3 py-6 border border-gray-100 rounded-xl hover:border-[#1e3932] hover:bg-[#f0f9f6] transition-colors text-gray-600 hover:text-[#1e3932] group"
              >
                <div className="w-12 h-12 rounded-full bg-gray-50 group-hover:bg-white flex items-center justify-center transition-colors">
                  <i className="fas fa-comment-dots text-xl text-[#10b981]"></i>
                </div>
                <span className="font-medium text-sm">Text</span>
              </button>
              
              <button 
                onClick={() => handleInteraction('Video')}
                className="flex flex-col items-center justify-center gap-3 py-6 border border-gray-100 rounded-xl hover:border-[#1e3932] hover:bg-[#f0f9f6] transition-colors text-gray-600 hover:text-[#1e3932] group"
              >
                <div className="w-12 h-12 rounded-full bg-gray-50 group-hover:bg-white flex items-center justify-center transition-colors">
                  <i className="fas fa-video text-xl text-[#8b5cf6]"></i>
                </div>
                <span className="font-medium text-sm">Video</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FriendDetail;