import { useState } from 'react';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-8">
      <div className="grain-overlay" />
      <div className="max-w-md w-full space-y-12 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-container/10 mb-6">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="font-headline text-4xl text-white mb-2">The Curator</h1>
          <p className="font-label text-stone-500 uppercase tracking-widest text-[10px]">Access Control</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          {error && <p className="text-red-500 text-xs font-label uppercase tracking-widest text-center">{error}</p>}
          
          <div className="space-y-6">
            <div className="relative group">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                className="peer w-full bg-transparent border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 px-0 py-4 transition-all duration-300 text-on-surface"
                required
              />
              <label className="absolute top-4 left-0 text-[10px] uppercase tracking-[0.2em] text-neutral-500 pointer-events-none transition-all duration-300 peer-focus:-top-2 peer-focus:text-secondary peer-[:not(:placeholder-shown)]:-top-2">Admin Email</label>
            </div>

            <div className="relative group">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                className="peer w-full bg-transparent border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 px-0 py-4 transition-all duration-300 text-on-surface"
                required
              />
              <label className="absolute top-4 left-0 text-[10px] uppercase tracking-[0.2em] text-neutral-500 pointer-events-none transition-all duration-300 peer-focus:-top-2 peer-focus:text-secondary peer-[:not(:placeholder-shown)]:-top-2">Access Key</label>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full group flex items-center justify-between bg-primary-container text-white px-12 py-5 font-bold tracking-[0.2em] text-xs uppercase hover:bg-red-700 transition-all duration-500"
          >
            Authenticate
            <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300 w-5 h-5" />
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
