import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { SEO } from '../components/SEO';

export function Contact() {
 const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
 const [isSent, setIsSent] = useState(false);

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 // Simulate API call
 setTimeout(() => {
 setIsSent(true);
 setFormData({ name: '', email: '', subject: '', message: '' });
 setTimeout(() => setIsSent(false), 5000);
 }, 800);
 };

  const contactSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Clothify | Customer Support & Inquiries",
    "description": "Get in touch with Clothify for any questions about our premium clothing, ethical fashion practices, or your orders. We're here to help!",
    "url": "https://dummy-mauve.vercel.app/contact-clothify""
  });

 return (
 <div className="bg-slate-50 min-h-screen py-16 relative overflow-hidden">
  <SEO title="Contact Clothify | Customer Support & Inquiries" description="Get in touch with Clothify for any questions about our premium clothing, ethical fashion practices, or your orders. We're here to help!" schemaMarkup={contactSchema} canonicalUrl="https://dummy-mauve.vercel.app/contact-clothify"/>
  {/* Decorative background blobs */}
  <div className="absolute top-10 left-10 w-[40vw] h-[40vw] bg-teal-100/40 rounded-full blur-3xl pointer-events-none"></div>
  <div className="absolute bottom-10 right-10 w-[50vw] h-[50vw] bg-amber-100/40 rounded-full blur-3xl pointer-events-none"></div>
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 
 <div className="text-center mb-16">
 <motion.h1 
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-4xl md:text-5xl font-bold font-serif text-zinc-900 mb-4"
 >
 Contact Clothify Support
 </motion.h1>
 <motion.p 
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-zinc-500 text-sm max-w-xl mx-auto"
 >
 Have a question about an order, styling advice, or just want to say hi? We'd love to hear from you.
 </motion.p>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
 {/* Contact Info */}
 <motion.div 
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ delay: 0.2 }}
 className="space-y-10"
 >
 <div>
 <h2 className="text-2xl font-serif font-bold text-zinc-900 mb-6">Contact Information</h2>
 <div className="space-y-6">
 <div className="flex items-start">
 <MapPin className="w-5 h-5 text-black mt-1 mr-4 flex-shrink-0" />
 <div>
 <h4 className="font-semibold text-sm text-zinc-900 mb-1">Flagship Store</h4>
 <p className="text-sm text-zinc-500 leading-relaxed">
 123 Fashion Avenue<br />
 Suite 400<br />
 New York, NY 10001
 </p>
 </div>
 </div>
 <div className="flex items-start">
 <Phone className="w-5 h-5 text-black mt-1 mr-4 flex-shrink-0" />
 <div>
 <h4 className="font-semibold text-sm text-zinc-900 mb-1">Phone</h4>
 <p className="text-sm text-zinc-500">1-800-CLOTHIFY (Toll Free)</p>
 </div>
 </div>
 <div className="flex items-start">
 <Mail className="w-5 h-5 text-black mt-1 mr-4 flex-shrink-0" />
 <div>
 <h4 className="font-semibold text-sm text-zinc-900 mb-1">Email</h4>
 <p className="text-sm text-zinc-500">support@clothify.com</p>
 </div>
 </div>
 <div className="flex items-start">
 <Clock className="w-5 h-5 text-black mt-1 mr-4 flex-shrink-0" />
 <div>
 <h4 className="font-semibold text-sm text-zinc-900 mb-1">Hours</h4>
 <p className="text-sm text-zinc-500">Mon - Fri: 9:00 AM - 6:00 PM EST</p>
 </div>
 </div>
 </div>
 </div>

 {/* Map Placeholder */}
 <div className="w-full h-64 bg-zinc-100 rounded-sm relative overflow-hidden group">
 <img 
 src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" 
 alt="Clothify customer support team ready to help" 
 loading="lazy"
 onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800' }}
 className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 transition-opacity duration-500"
 />
 <div className="absolute inset-0 flex items-center justify-center">
 <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-sm shadow-lg text-xs font-semibold tracking-wider text-black uppercase">
 View on Google Maps
 <a
  href="https://maps.google.com/..."
  target="_blank"
  rel="noopener noreferrer"
>
  {/* Map image and overlay */}
</a>
 </div>
 </div>
 </div>
 </motion.div>

 {/* Contact Form */}
 <motion.div 
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ delay: 0.3 }}
 className="bg-zinc-50 p-8 rounded-sm border border-zinc-200 "
 >
 <h2 className="text-2xl font-serif font-bold text-zinc-900 mb-6">Send a Message</h2>
 <form onSubmit={handleSubmit} className="space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div>
 <label htmlFor="name" className="block text-xs font-medium text-zinc-700 uppercase tracking-widest mb-2">Name</label>
 <input
 type="text"
 id="name"
 required
 value={formData.name}
 onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
 className="w-full bg-white border border-zinc-200 rounded-sm py-2.5 px-4 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-black :ring-white transition-shadow"
 />
 </div>
 <div>
 <label htmlFor="email" className="block text-xs font-medium text-zinc-700 uppercase tracking-widest mb-2">Email</label>
 <input
 type="email"
 id="email"
 required
 value={formData.email}
 onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
 className="w-full bg-white border border-zinc-200 rounded-sm py-2.5 px-4 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-black :ring-white transition-shadow"
 />
 </div>
 </div>
 <div>
 <label htmlFor="subject" className="block text-xs font-medium text-zinc-700 uppercase tracking-widest mb-2">Subject</label>
 <input
 type="text"
 id="subject"
 required
 value={formData.subject}
 onChange={(e) => setFormData(p => ({ ...p, subject: e.target.value }))}
 className="w-full bg-white border border-zinc-200 rounded-sm py-2.5 px-4 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-black :ring-white transition-shadow"
 />
 </div>
 <div>
 <label htmlFor="message" className="block text-xs font-medium text-zinc-700 uppercase tracking-widest mb-2">Message</label>
 <textarea
 id="message"
 required
 rows={5}
 value={formData.message}
 onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
 className="w-full bg-white border border-zinc-200 rounded-sm py-2.5 px-4 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-black :ring-white transition-shadow resize-none"
 />
 </div>
 
 <button
 type="submit"
 className="w-full bg-black text-white hover:bg-zinc-800 :bg-zinc-200 transition-colors py-3.5 text-sm font-semibold tracking-wide rounded-sm"
 >
 {isSent ? 'Message Sent!' : 'Send Message'}
 </button>
 {isSent && (
 <p className="text-center text-sm text-green-600 mt-4">
 Thank you for reaching out. We will get back to you shortly.
 </p>
 )}
 </form>
 </motion.div>
 </div>
 </div>
 </div>
 );
}
