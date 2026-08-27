import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { useToast } from '../components/Toast';

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const { login } = useStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast('Passwords do not match', 'error');
      return;
    }
    
    // Simulate auth
    const user = { name: isLogin ? 'User' : formData.name, email: formData.email };
    login(user);
    toast(isLogin ? 'Logged in successfully!' : 'Account created successfully!', 'success');
    navigate('/');
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-zinc-100 w-full max-w-md">
        <h1 className="text-3xl font-black text-zinc-900 mb-2 uppercase tracking-widest text-center">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="text-zinc-500 text-center mb-8">
          {isLogin ? 'Enter your details to access your account' : 'Sign up to discover exclusive collections'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="login-name" className="block text-sm font-bold text-zinc-700 mb-1">Full Name</label>
              <input id="login-name" required name="name" type="text" onChange={handleChange} className="w-full border p-3 rounded-md focus:ring-2 focus:ring-blue-700 outline-none transition-all" />
            </div>
          )}
          <div>
            <label htmlFor="login-email" className="block text-sm font-bold text-zinc-700 mb-1">Email Address</label>
            <input id="login-email" required name="email" type="email" onChange={handleChange} className="w-full border p-3 rounded-md focus:ring-2 focus:ring-blue-700 outline-none transition-all" />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-sm font-bold text-zinc-700 mb-1">Password</label>
            <input id="login-password" required name="password" type="password" onChange={handleChange} className="w-full border p-3 rounded-md focus:ring-2 focus:ring-blue-700 outline-none transition-all" />
          </div>
          {!isLogin && (
            <div>
              <label htmlFor="login-confirm-password" className="block text-sm font-bold text-zinc-700 mb-1">Confirm Password</label>
              <input id="login-confirm-password" required name="confirmPassword" type="password" onChange={handleChange} className="w-full border p-3 rounded-md focus:ring-2 focus:ring-blue-700 outline-none transition-all" />
            </div>
          )}

          <button type="submit" className="w-full bg-blue-700 text-white py-4 rounded-full font-black uppercase tracking-widest hover:bg-blue-700 transition-colors mt-6">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-zinc-600 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button onClick={() => setIsLogin(!isLogin)} className="text-blue-700 font-bold hover:underline">
              {isLogin ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
