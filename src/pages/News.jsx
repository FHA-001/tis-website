import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import FadeIn from '../components/FadeIn';
import { SCHOOL } from '../lib/constants';

const CATEGORY_COLORS = {
  'Academics': 'bg-blue-100 text-blue-700 border-blue-200',
  'Admissions': 'bg-green-100 text-green-700 border-green-200',
  'Sports': 'bg-orange-100 text-orange-700 border-orange-200',
  'Events': 'bg-purple-100 text-purple-700 border-purple-200',
  'Facilities': 'bg-teal-100 text-teal-700 border-teal-200',
  'Other': 'bg-gray-100 text-gray-700 border-gray-200'
};

const HARDCODED_POSTS = [
  {
    id: '1',
    title: "Triton Students Visit to NAS Library & Museum",
    excerpt: "Students along with the Chairman, Principal, Director and Teacher of the TIS visited the TY Danjuma Science Museum.",
    content: "Triton International School students were invited to witness the launching of the TY Danjuma Science Museum and Library for the National Academy of Science.",
    published_date: "2026-06-29",
    category: "Academics",
    image_url: "https://i.ibb.co/Y7CrJSXz/TY-DANJUMA-SCIENCE-MUSEUEM.jpg"
  },
  {
    id: '2',
    title: "DG NBBRI and Prof. Matawal at TIS",
    excerpt: "The Present DG and Past Immediate DG of NBBRI paid a visit to Triton International School.",
    content: "The Present DG and Past Immediate DG of NBBRI paid a visit to Triton International School and advised the students on the importance and uses of studying Science and Engineering.",
    published_date: "2026-06-29",
    category: "Other",
    image_url: "https://i.ibb.co/7dGhVL1X/a651e32a-b5e8-4f0c-b3c7-d9122aff950a.jpg"
  },
  {
    id: '3',
    title: "Annual Children's Day Celebration",
    excerpt: "Students, teachers, and parents came together for a colourful Children's Day celebration.",
    content: "Triton International School's Annual Children's Day was a spectacular success! Featuring athletics, football, relays, and much more.",
    published_date: "2026-06-29",
    category: "Events",
    image_url: "https://i.ibb.co/zh6n9K2c/childrens-day.jpg"
  }
];

export default function News() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.title = `News & Updates - ${SCHOOL.name}`;
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `Stay informed about the latest happenings, events, and achievements at ${SCHOOL.name}. Read news about academics, sports, admissions, and school activities.`);
    }

    async function fetchNews() {
      const { data } = await supabase
        .from('news_posts')
        .select('*')
        .order('published_date', { ascending: false })
        .limit(20);
      
      if (data && data.length > 0) {
        setPosts(data);
      } else {
        setPosts(HARDCODED_POSTS);
      }
      setLoading(false);
    }
    fetchNews();
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <div className="w-full bg-surface pb-24 min-h-screen">
      {/* Hero */}
      <section className="bg-primary py-20 px-4 sm:px-6 lg:px-8 text-center text-white relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546410531-b845eab0b73c?w=1600&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <FadeIn className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold mb-6">
            News & Updates
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Stay informed about the latest happenings, events, and achievements.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search news or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 border-none rounded-full leading-5 bg-white text-navy placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-success shadow-xl"
            />
          </div>
        </FadeIn>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {loading ? (
          <div className="space-y-8">
            {/* Featured Skeleton */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm flex flex-col lg:flex-row gap-8 animate-pulse">
              <div className="lg:w-1/2 h-64 lg:h-96 bg-gray-200 rounded-2xl" />
              <div className="lg:w-1/2 flex flex-col justify-center space-y-4">
                <div className="h-6 w-24 bg-gray-200 rounded-full" />
                <div className="h-10 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-1/4 bg-gray-200 rounded" />
                <div className="h-24 w-full bg-gray-200 rounded" />
                <div className="h-10 w-32 bg-gray-200 rounded-full mt-4" />
              </div>
            </div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 text-muted bg-white rounded-3xl border border-gray-100 shadow-sm">
            <Search className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-heading font-bold text-navy mb-2">No news found</h3>
            <p>We couldn't find anything matching "{searchTerm}".</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-4 text-primary font-semibold hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <FadeIn>
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col lg:flex-row mb-12 group">
                  <div className="lg:w-1/2 relative overflow-hidden">
                    <img 
                      src={featuredPost.image_url || 'https://images.unsplash.com/photo-1546410531-b845eab0b73c?w=800&q=80'} 
                      alt={featuredPost.title} 
                      className="w-full h-64 lg:h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full font-bold text-sm text-primary shadow-md border border-white/50 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      Featured
                    </div>
                  </div>
                  
                  <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4 text-sm font-medium">
                      <span className={`px-3 py-1 rounded-full border ${CATEGORY_COLORS[featuredPost.category] || CATEGORY_COLORS['Other']}`}>
                        {featuredPost.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-muted">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.published_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-navy mb-4 leading-tight group-hover:text-primary transition-colors">
                      <Link to={`/news/${featuredPost.id}`}>{featuredPost.title}</Link>
                    </h2>
                    
                    <p className="text-muted text-lg leading-relaxed mb-8">
                      {featuredPost.excerpt}
                    </p>
                    
                    <Link 
                      to={`/news/${featuredPost.id}`} 
                      className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-heading font-bold hover:bg-primary-dark transition-colors w-fit shadow-md"
                    >
                      Read Full Story <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Grid Posts */}
            {gridPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gridPosts.map((post, i) => (
                  <FadeIn key={post.id} delay={i * 100}>
                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group">
                      {post.image_url && (
                        <div className="h-48 relative overflow-hidden">
                          <img 
                            src={post.image_url} 
                            alt={post.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                      )}
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${CATEGORY_COLORS[post.category] || CATEGORY_COLORS['Other']}`}>
                            {post.category}
                          </span>
                          <span className="text-xs font-medium text-muted">
                            {new Date(post.published_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-heading font-bold text-navy mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                          <Link to={`/news/${post.id}`}>{post.title}</Link>
                        </h3>
                        
                        <p className="text-muted text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <Link 
                          to={`/news/${post.id}`} 
                          className="inline-flex items-center gap-1 text-primary font-bold text-sm hover:text-primary-dark mt-auto w-fit group/link"
                        >
                          Read more <ChevronRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
