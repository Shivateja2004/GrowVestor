
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen, Video, Bookmark, FileText, PlayCircle, BookmarkPlus, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

// Mock learning content
const courses = [
  {
    id: 1,
    title: "Investing 101: Getting Started",
    description: "Learn the fundamentals of investing in the stock market for beginners.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    duration: "45 minutes",
    level: "beginner",
    author: "Sarah Johnson",
    category: "basics",
    lessons: 5,
    saved: false
  },
  {
    id: 2,
    title: "Understanding Stock Market Terms",
    description: "Master essential stock market terminology to understand financial news and reports.",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    duration: "30 minutes",
    level: "beginner",
    author: "Michael Chen",
    category: "basics",
    lessons: 4,
    saved: true
  },
  {
    id: 3,
    title: "Technical Analysis Fundamentals",
    description: "Learn how to analyze stock charts and identify trading patterns.",
    image: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    duration: "60 minutes",
    level: "intermediate",
    author: "David Wilkins",
    category: "analysis",
    lessons: 7,
    saved: false
  },
  {
    id: 4,
    title: "Value Investing Strategies",
    description: "Discover how to identify undervalued stocks using Warren Buffett's approach.",
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    duration: "75 minutes",
    level: "advanced",
    author: "Emma Rodriguez",
    category: "strategies",
    lessons: 8,
    saved: false
  },
  {
    id: 5,
    title: "Portfolio Diversification",
    description: "Learn how to build a balanced portfolio to manage risk and maximize returns.",
    image: "https://images.unsplash.com/photo-1606189934846-a527add8a77b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    duration: "50 minutes",
    level: "intermediate",
    author: "Robert Patel",
    category: "strategies",
    lessons: 6,
    saved: true
  },
  {
    id: 6,
    title: "Reading Financial Statements",
    description: "How to analyze income statements, balance sheets, and cash flow statements.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff5872?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    duration: "65 minutes",
    level: "intermediate",
    author: "Samantha Lee",
    category: "analysis",
    lessons: 9,
    saved: false
  }
];

const articles = [
  {
    id: 1,
    title: "How to Read a P/E Ratio",
    excerpt: "The price-to-earnings ratio is a crucial metric for valuing stocks. Learn what it means and how to use it.",
    author: "Sarah Johnson",
    readTime: "5 min read",
    category: "basics",
    level: "beginner"
  },
  {
    id: 2,
    title: "Understanding Market Capitalization",
    excerpt: "What does market cap tell you about a company, and why is it important for your investment decisions?",
    author: "Michael Chen",
    readTime: "7 min read",
    category: "basics",
    level: "beginner"
  },
  {
    id: 3,
    title: "The Power of Compound Interest",
    excerpt: "Discover how compound interest can dramatically grow your investments over time.",
    author: "David Wilkins",
    readTime: "4 min read",
    category: "basics",
    level: "beginner"
  },
  {
    id: 4,
    title: "Risk vs. Reward: Finding the Balance",
    excerpt: "How to balance potential investment returns with your personal risk tolerance.",
    author: "Emma Rodriguez",
    readTime: "8 min read",
    category: "strategies",
    level: "intermediate"
  },
  {
    id: 5,
    title: "Technical Indicators Every Investor Should Know",
    excerpt: "A guide to essential technical analysis indicators that can improve your trading decisions.",
    author: "Robert Patel",
    readTime: "10 min read",
    category: "analysis",
    level: "advanced"
  }
];

const videos = [
  {
    id: 1,
    title: "Stock Market Basics for Beginners",
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    duration: "12:35",
    views: "245K",
    level: "beginner",
    category: "basics"
  },
  {
    id: 2,
    title: "How to Read Stock Charts",
    thumbnail: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    duration: "18:22",
    views: "157K",
    level: "intermediate",
    category: "analysis"
  },
  {
    id: 3,
    title: "Building a Dividend Portfolio",
    thumbnail: "https://images.unsplash.com/photo-1606189934846-a527add8a77b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    duration: "24:15",
    views: "98K",
    level: "intermediate",
    category: "strategies"
  },
  {
    id: 4,
    title: "Warren Buffett's Investment Strategy",
    thumbnail: "https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    duration: "32:08",
    views: "320K",
    level: "advanced",
    category: "strategies"
  }
];

const Learn = () => {
  const [coursesList, setCoursesList] = useState(courses);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const toggleSaved = (courseId) => {
    setCoursesList(coursesList.map(course => 
      course.id === courseId ? {...course, saved: !course.saved} : course
    ));
  };

  // Filter function for courses
  const filteredCourses = coursesList.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    
    return matchesSearch && matchesLevel && matchesCategory;
  });

  // Filter function for articles
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === 'all' || article.level === levelFilter;
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
    
    return matchesSearch && matchesLevel && matchesCategory;
  });

  // Filter function for videos
  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === 'all' || video.level === levelFilter;
    const matchesCategory = categoryFilter === 'all' || video.category === categoryFilter;
    
    return matchesSearch && matchesLevel && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold">Learning Center</h1>
            <p className="mt-2">Build your investment knowledge with tutorials, articles, and videos</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                Learning Resources
              </CardTitle>
              <CardDescription>
                Filter resources by level, category, or search by keyword
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search topics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Experience Level</label>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant={levelFilter === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLevelFilter('all')}
                    >
                      All Levels
                    </Button>
                    <Button 
                      variant={levelFilter === 'beginner' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLevelFilter('beginner')}
                    >
                      Beginner
                    </Button>
                    <Button 
                      variant={levelFilter === 'intermediate' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLevelFilter('intermediate')}
                    >
                      Intermediate
                    </Button>
                    <Button 
                      variant={levelFilter === 'advanced' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLevelFilter('advanced')}
                    >
                      Advanced
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant={categoryFilter === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCategoryFilter('all')}
                    >
                      All Categories
                    </Button>
                    <Button 
                      variant={categoryFilter === 'basics' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCategoryFilter('basics')}
                    >
                      Basics
                    </Button>
                    <Button 
                      variant={categoryFilter === 'analysis' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCategoryFilter('analysis')}
                    >
                      Analysis
                    </Button>
                    <Button 
                      variant={categoryFilter === 'strategies' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCategoryFilter('strategies')}
                    >
                      Strategies
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Tabs */}
          <Tabs defaultValue="courses">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="courses" className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Courses
              </TabsTrigger>
              <TabsTrigger value="articles" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Articles
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center">
                <Video className="h-4 w-4 mr-2" />
                Videos
              </TabsTrigger>
            </TabsList>

            {/* Courses Tab */}
            <TabsContent value="courses">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48 w-full overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-white bg-opacity-70 hover:bg-white hover:bg-opacity-100"
                          onClick={() => toggleSaved(course.id)}
                        >
                          {course.saved ? (
                            <Bookmark className="h-5 w-5 text-blue-600 fill-blue-600" />
                          ) : (
                            <BookmarkPlus className="h-5 w-5 text-gray-700" />
                          )}
                        </Button>
                      </div>
                      <Badge className="absolute bottom-2 left-2 bg-blue-700">
                        {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription>{course.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{course.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <Tag className="h-4 w-4 mr-1" />
                          {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                        </div>
                      </div>
                    </CardContent>
                    <div className="px-6 pb-6">
                      <Button className="w-full">Start Learning</Button>
                    </div>
                  </Card>
                ))}
              </div>
              
              {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No courses found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Articles Tab */}
            <TabsContent value="articles">
              <div className="space-y-6">
                {filteredArticles.map((article) => (
                  <Card key={article.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{article.title}</CardTitle>
                          <CardDescription className="mt-1">{article.author}</CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="capitalize">
                            {article.category}
                          </Badge>
                          <Badge className="capitalize bg-blue-700">
                            {article.level}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {article.readTime}
                        </div>
                        <Button variant="outline">Read Article</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredArticles.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No articles found</h3>
                    <p className="text-gray-600">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredVideos.map((video) => (
                  <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <PlayCircle className="h-16 w-16 text-white opacity-80" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded">
                        {video.duration}
                      </div>
                      <Badge className="absolute top-2 left-2 bg-blue-700">
                        {video.level.charAt(0).toUpperCase() + video.level.slice(1)}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle>{video.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <Video className="h-4 w-4 mr-1" />
                          {video.views} views
                        </div>
                        <div className="flex items-center">
                          <Tag className="h-4 w-4 mr-1" />
                          {video.category.charAt(0).toUpperCase() + video.category.slice(1)}
                        </div>
                      </div>
                    </CardContent>
                    <div className="px-6 pb-6">
                      <Button className="w-full">Watch Video</Button>
                    </div>
                  </Card>
                ))}
                
                {filteredVideos.length === 0 && (
                  <div className="col-span-2 text-center py-12">
                    <Video className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No videos found</h3>
                    <p className="text-gray-600">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Learn;
