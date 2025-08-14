import React, { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { FiMail, FiMessageSquare, FiUser, FiSend } from 'react-icons/fi';

export default function Contact() {
  // Form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Simulate form submission
    setTimeout(() => {
      // For demo purposes, we're just logging and setting the submission state
      console.log('Form submitted:', formState);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <Layout
      title="Contact Us | Nano-Banana AI Image Editing"
      description="Get in touch with the Nano-Banana team for questions, feedback, or collaboration opportunities regarding our AI image editing resources."
      keywords="nano-banana contact, contact us, feedback, questions, support, nano-banana AI"
    >
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-primary-50">
              Have questions or feedback? We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
                
                <p className="text-gray-700 mb-8">
                  Whether you have questions about Nano-Banana, feedback on our tutorials, or are interested in collaboration opportunities, we're here to help.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4">Common Questions</h3>
                  <ul className="space-y-3">
                    <li>
                      <strong className="text-gray-900">Looking for tutorials?</strong>
                      <p className="text-gray-700">
                        Check our <Link href="/tutorials" className="text-primary-600 hover:text-primary-800">tutorials section</Link> first.
                      </p>
                    </li>
                    <li>
                      <strong className="text-gray-900">Have a specific question?</strong>
                      <p className="text-gray-700">
                        Our <Link href="/faq" className="text-primary-600 hover:text-primary-800">FAQ page</Link> might have the answer.
                      </p>
                    </li>
                    <li>
                      <strong className="text-gray-900">Want to see examples?</strong>
                      <p className="text-gray-700">
                        Browse our <Link href="/examples" className="text-primary-600 hover:text-primary-800">examples gallery</Link>.
                      </p>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <FiMail className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="ml-3 text-gray-700">
                      <p className="font-medium text-gray-900">Email</p>
                      <p>info@nano-banana.run</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Form */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                
                {isSubmitted ? (
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-green-700">
                          Thank you for your message! We'll get back to you as soon as possible.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-red-700">{error}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="block w-full pl-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Your name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiMail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="block w-full pl-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          placeholder="your.email@example.com"
                          value={formState.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <select
                          name="subject"
                          id="subject"
                          className="block w-full py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          value={formState.subject}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Please select a subject</option>
                          <option value="General Question">General Question</option>
                          <option value="Technical Support">Technical Support</option>
                          <option value="Tutorial Feedback">Tutorial Feedback</option>
                          <option value="Partnership Inquiry">Partnership Inquiry</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute top-3 left-3 flex items-center pointer-events-none">
                          <FiMessageSquare className="h-5 w-5 text-gray-400" />
                        </div>
                        <textarea
                          name="message"
                          id="message"
                          rows={5}
                          className="block w-full pl-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Your message"
                          value={formState.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <FiSend className="mr-2" />
                        )}
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            'name': 'Nano-Banana Contact Page',
            'description': 'Get in touch with the Nano-Banana team for questions, feedback, or collaboration opportunities regarding our AI image editing resources.',
            'url': 'https://nano-banana.run/contact',
            'mainEntity': {
              '@type': 'Organization',
              'name': 'Nano-Banana.Run',
              'email': 'info@nano-banana.run'
            }
          })
        }}
      />
    </Layout>
  );
}
