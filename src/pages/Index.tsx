import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Lightbulb, 
  TrendingUp, 
  BarChart2,
  ChevronRight,
  ArrowRight,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  const features = [
    {
      title: "Search any company",
      description: "Get detailed financial data and analysis for any publicly traded company.",
      icon: <Search className="h-8 w-8 text-primary" />,
      link: "/search"
    },
    {
      title: "AI Investment Suggestions",
      description: "Receive personalized investment suggestions powered by advanced AI algorithms.",
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      link: "/suggestions"
    },
    {
      title: "Track Risk Levels",
      description: "Monitor and assess risk levels for potential and current investments.",
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      link: "/risk"
    },
    {
      title: "Compare Similar Companies",
      description: "Side-by-side comparison of financial metrics for multiple companies.",
      icon: <BarChart2 className="h-8 w-8 text-primary" />,
      link: "/compare"
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 fade-in">
                GrowVestor
              </h1>
              <p className="text-xl md:text-2xl font-light mb-8 max-w-lg fade-in">
                Your AI-powered investment advisor to help you make smarter financial decisions
              </p>
              <div className="flex flex-wrap gap-4 fade-in">
                <Link to="/search">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                    Start Exploring
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/learn">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="w-full h-64 md:h-96 bg-blue-600 rounded-lg shadow-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" 
                    alt="Financial data visualization" 
                    className="w-full h-full object-cover mix-blend-overlay opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4/5 h-3/4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div className="h-3 w-20 bg-white/30 rounded-full"></div>
                        <div className="flex space-x-2">
                          <div className="h-3 w-3 bg-white/30 rounded-full"></div>
                          <div className="h-3 w-3 bg-white/30 rounded-full"></div>
                          <div className="h-3 w-3 bg-white/30 rounded-full"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-24 bg-white/20 rounded-md"></div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-16 bg-white/20 rounded-md"></div>
                          <div className="h-16 bg-white/20 rounded-md"></div>
                        </div>
                        <div className="h-10 bg-white/20 rounded-md"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Market Ticker */}
      <div className="bg-gray-900 text-white py-4 overflow-hidden">
        <div className="whitespace-nowrap animate-ticker inline-block">
          <div className="inline-flex space-x-8">
            {[
              { symbol: "AAPL", price: "$178.72", change: "+1.2%" },
              { symbol: "MSFT", price: "$412.31", change: "+0.8%" },
              { symbol: "GOOG", price: "$142.56", change: "-0.3%" },
              { symbol: "AMZN", price: "$182.32", change: "+1.5%" },
              { symbol: "META", price: "$474.85", change: "+2.1%" },
              { symbol: "TSLA", price: "$219.53", change: "-0.7%" },
              { symbol: "NVDA", price: "$878.38", change: "+3.2%" },
              { symbol: "BRK.A", price: "$614,929", change: "+0.4%" },
              { symbol: "JPM", price: "$197.45", change: "+0.6%" },
              { symbol: "V", price: "$276.39", change: "+0.9%" }
            ].map((stock, index) => (
              <div key={index} className="inline-flex items-center">
                <span className="font-semibold">{stock.symbol}</span>
                <span className="ml-2">{stock.price}</span>
                <span className={`ml-2 ${stock.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                  {stock.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Smart features for smarter investments</h2>
            <p className="mt-4 text-lg text-gray-600">
              Our platform provides powerful tools to help you make informed investment decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link to={feature.link} key={index} className="hover:no-underline">
                <Card className="hover-scale h-full border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                    <div className="mt-4 flex items-center text-primary">
                      <span className="text-sm font-medium">Learn more</span>
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Trusted by investors</h2>
            <p className="mt-4 text-lg text-gray-600">
              Join thousands of investors making smarter financial decisions with SmartInvest Buddy
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary">10K+</p>
              <p className="mt-2 text-gray-600">Active Users</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">5K+</p>
              <p className="mt-2 text-gray-600">Companies Analyzed</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">$2.5M</p>
              <p className="mt-2 text-gray-600">Investments Made</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">94%</p>
              <p className="mt-2 text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-3xl font-bold">Ready to make smarter investment decisions?</h2>
              <p className="mt-4 text-lg text-blue-100">
                Get started with SmartInvest Buddy today and transform your financial future.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/search">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                  Search Companies
                  <Search className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />

      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Index;
