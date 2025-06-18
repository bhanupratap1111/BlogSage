import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext.jsx';
import toast from 'react-hot-toast';

function NewsLetter() {
  const { axios } = useAppContext();
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/newsletter/subscribe', { email });
      if (data.success) {
        toast.success(data.message);
        setEmail('');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('Subscription failed');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>

        <h1 className='md:text-4xl text-2xl font-semibold'>Never Miss a Blog!</h1>

        <p className='md:text-lg text-gray-500/70 pb-8'>Subscribe to get the latest blog, new tech, and exclusive news.</p>

        <form className='flex items-center justify-between max-w-2xl w-full md:h-13 h-12' onSubmit={handleSubscribe}>

        <input 
        type="email"
        className='border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500'
        placeholder= 'Enter your email id' 
        required 
        value={email}
        onChange={e => setEmail(e.target.value)}
        />

        <button 
        type='submit' 
        className='md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none'>Subscribe</button>
        </form>

    </div>
  )
}

export default NewsLetter