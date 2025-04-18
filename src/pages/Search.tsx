
import React, { useState } from 'react';
import { 
  Search as SearchIcon, 
  TrendingUp, 
  LineChart, 
  PieChart,
  DollarSign,
  Users,
  Briefcase,
  BarChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  Legend,
} from 'recharts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock financial data
const mockStockData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 700 },
  { name: 'Jun', value: 900 },
  { name: 'Jul', value: 1000 },
  { name: 'Aug', value: 1200 },
  { name: 'Sep', value: 1100 },
  { name: 'Oct', value: 1300 },
  { name: 'Nov', value: 1500 },
  { name: 'Dec', value: 1400 },
];

const mockFinancialData = [
  { name: 'Q1 2022', Revenue: 5000, Profit: 2000 },
  { name: 'Q2 2022', Revenue: 5500, Profit: 2200 },
  { name: 'Q3 2022', Revenue: 6000, Profit: 2400 },
  { name: 'Q4 2022', Revenue: 6200, Profit: 2600 },
  { name: 'Q1 2023', Revenue: 6500, Profit: 2800 },
  { name: 'Q2 2023', Revenue: 7000, Profit: 3000 },
  { name: 'Q3 2023', Revenue: 7200, Profit: 3200 },
  { name: 'Q4 2023', Revenue: 7500, Profit: 3500 },
];

const mockCompanies = [
  {
    name: 'Apple Inc.',
    ticker: 'AAPL',
    industry: 'Technology',
    marketCap: '$2.8T',
    description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.',
    logo: 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png',
    stockPrice: '$178.72',
    priceChange: '+1.2%',
    metrics: {
      peRatio: '28.5',
      eps: '$6.14',
      dividendYield: '0.5%',
      beta: '1.2',
    },
    riskScore: 35,
    aiSuggestion: 'Invest',
    aiReasoning: [
      'Strong cash position and consistent revenue growth',
      'Loyal customer base and ecosystem lock-in',
      'Continued innovation in product development',
      'Expanding services segment with high margins'
    ]
  },
  {
    name: 'Microsoft Corporation',
    ticker: 'MSFT',
    industry: 'Technology',
    marketCap: '$2.9T',
    description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide.',
    logo: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
    stockPrice: '$412.31',
    priceChange: '+0.8%',
    metrics: {
      peRatio: '34.2',
      eps: '$11.58',
      dividendYield: '0.7%',
      beta: '0.9',
    },
    riskScore: 30,
    aiSuggestion: 'Invest',
    aiReasoning: [
      'Cloud business (Azure) showing strong growth',
      'Diverse revenue streams across enterprise and consumer segments',
      'Strong position in AI development and implementation',
      'Stable management and strategic vision'
    ]
  }
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Mock search functionality
    if (searchQuery.toLowerCase().includes('apple')) {
      setSelectedCompany(mockCompanies[0]);
    } else if (searchQuery.toLowerCase().includes('microsoft')) {
      setSelectedCompany(mockCompanies[1]);
    } else if (searchQuery.trim() !== '') {
      // If no specific match but search isn't empty, show first company as example
      setSelectedCompany(mockCompanies[0]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Search Companies</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Find detailed financial data and AI-powered insights for any publicly traded company
            </p>
            
            <form onSubmit={handleSearch} className="flex max-w-md mx-auto">
              <Input
                type="text"
                placeholder="Search company name or ticker (try 'Apple' or 'Microsoft')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-gray-900 border-0 focus-visible:ring-2 focus-visible:ring-white"
              />
              <Button type="submit" className="ml-2">
                <SearchIcon className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
          </div>
        </div>
      </div>

      {selectedCompany ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Company Overview */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <img 
                  src={selectedCompany.logo} 
                  alt={`${selectedCompany.name} logo`} 
                  className="w-16 h-16 object-contain mr-4"
                />
                <div>
                  <h2 className="text-2xl font-bold">{selectedCompany.name}</h2>
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">{selectedCompany.ticker}</Badge>
                    <Badge variant="secondary">{selectedCompany.industry}</Badge>
                  </div>
                </div>
              </div>
              <div className="md:ml-auto mt-4 md:mt-0">
                <div className="text-2xl font-bold">{selectedCompany.stockPrice}</div>
                <div className={`text-sm font-medium ${selectedCompany.priceChange.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedCompany.priceChange}
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-600">{selectedCompany.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">Market Cap</div>
                <div className="font-semibold">{selectedCompany.marketCap}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">P/E Ratio</div>
                <div className="font-semibold">{selectedCompany.metrics.peRatio}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">EPS</div>
                <div className="font-semibold">{selectedCompany.metrics.eps}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">Dividend Yield</div>
                <div className="font-semibold">{selectedCompany.metrics.dividendYield}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Stock Chart */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChart className="h-5 w-5 mr-2 text-primary" />
                    Stock Price History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={mockStockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#3b82f6" 
                          activeDot={{ r: 8 }} 
                          strokeWidth={2}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Data */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart className="h-5 w-5 mr-2 text-primary" />
                    Revenue & Profit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={mockFinancialData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Revenue" fill="#3b82f6" />
                        <Bar dataKey="Profit" fill="#10b981" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              {/* AI Investment Suggestion */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                    AI Investment Suggestion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center mb-4">
                    <Badge className={`text-lg py-1 px-4 ${
                      selectedCompany.aiSuggestion === 'Invest' ? 'bg-green-500' : 
                      selectedCompany.aiSuggestion === 'Hold' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                      {selectedCompany.aiSuggestion}
                    </Badge>
                  </div>

                  <h4 className="font-medium mb-2 text-gray-700">Analysis:</h4>
                  <ul className="space-y-2">
                    {selectedCompany.aiReasoning.map((reason, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                        </div>
                        <span className="ml-2 text-gray-600">{reason}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center">
                    <div className="mr-2 text-sm font-medium">Risk Score:</div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          selectedCompany.riskScore < 40 ? 'bg-green-500' : 
                          selectedCompany.riskScore < 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${selectedCompany.riskScore}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium">{selectedCompany.riskScore}/100</span>
                  </div>
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2 text-primary" />
                    Key Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-600 w-40">Price to Earnings:</span>
                    <span className="font-medium">{selectedCompany.metrics.peRatio}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-600 w-40">Earnings per Share:</span>
                    <span className="font-medium">{selectedCompany.metrics.eps}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-600 w-40">Dividend Yield:</span>
                    <span className="font-medium">{selectedCompany.metrics.dividendYield}</span>
                  </div>
                  <div className="flex items-center">
                    <LineChart className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-600 w-40">Beta:</span>
                    <span className="font-medium">{selectedCompany.metrics.beta}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="mb-8">
            <SearchIcon className="mx-auto h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Search for a company to get started</h2>
          <p className="text-gray-600 mb-8">
            Try searching for companies like "Apple" or "Microsoft" to see detailed financial data and AI-powered insights.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4 h-10 w-10 rounded-full bg-blue-100 mx-auto">
                  <SearchIcon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">Search Any Company</h3>
                <p className="text-gray-600 text-sm">
                  Get comprehensive data on any publicly traded company by name or ticker symbol
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4 h-10 w-10 rounded-full bg-blue-100 mx-auto">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">Get AI Insights</h3>
                <p className="text-gray-600 text-sm">
                  Receive AI-powered investment recommendations based on company performance
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4 h-10 w-10 rounded-full bg-blue-100 mx-auto">
                  <LineChart className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">Track Performance</h3>
                <p className="text-gray-600 text-sm">
                  View detailed financial metrics and historical performance data
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Search;
