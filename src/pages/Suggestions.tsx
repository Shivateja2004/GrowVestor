
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TrendingUp, Filter, CircleDollarSign, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock suggested companies data
const suggestedCompanies = [
  {
    name: 'Apple Inc.',
    ticker: 'AAPL',
    logo: 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png',
    industry: 'Technology',
    matchScore: 92,
    reasons: [
      'Strong balance sheet',
      'Consistent dividend growth',
      'Matches your risk profile'
    ],
    stockPrice: '$178.72',
    suggestion: 'Invest'
  },
  {
    name: 'Microsoft Corporation',
    ticker: 'MSFT',
    logo: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
    industry: 'Technology',
    matchScore: 88,
    reasons: [
      'Cloud business growing rapidly',
      'Strong position in AI development',
      'Stable management'
    ],
    stockPrice: '$412.31',
    suggestion: 'Invest'
  },
  {
    name: 'Johnson & Johnson',
    ticker: 'JNJ',
    logo: 'https://www.jnj.com/sites/default/files/jnj-logo.svg',
    industry: 'Healthcare',
    matchScore: 85,
    reasons: [
      'Defensive stock during downturns',
      'Consistent dividend increases',
      'Diversified business segments'
    ],
    stockPrice: '$152.49',
    suggestion: 'Invest'
  },
  {
    name: 'Tesla Inc.',
    ticker: 'TSLA',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png',
    industry: 'Automotive',
    matchScore: 72,
    reasons: [
      'Leader in electric vehicles',
      'Energy business potential',
      'Higher risk but growth potential'
    ],
    stockPrice: '$245.18',
    suggestion: 'Hold'
  }
];

const industries = [
  'All Industries',
  'Technology',
  'Healthcare',
  'Financial Services',
  'Consumer Goods',
  'Energy',
  'Utilities',
  'Real Estate',
  'Telecommunications'
];

const Suggestions = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [riskLevel, setRiskLevel] = useState('All');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold">Investment Suggestions</h1>
            <p className="mt-2">Personalized investment recommendations based on your preferences</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filter Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2 text-primary" />
                Filter Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Industry</label>
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Risk Level</label>
                  <Select value={riskLevel} onValueChange={setRiskLevel}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Risk Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Risks</SelectItem>
                      <SelectItem value="Low">Low Risk</SelectItem>
                      <SelectItem value="Medium">Medium Risk</SelectItem>
                      <SelectItem value="High">High Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Suggestions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suggestedCompanies.map((company, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <img 
                        src={company.logo} 
                        alt={`${company.name} logo`} 
                        className="w-12 h-12 object-contain mr-3"
                      />
                      <div>
                        <CardTitle>{company.name}</CardTitle>
                        <CardDescription>{company.ticker} • {company.industry}</CardDescription>
                      </div>
                    </div>
                    <Badge className={`${
                      company.suggestion === 'Invest' ? 'bg-green-500' : 
                      company.suggestion === 'Hold' ? 'bg-yellow-500' : 'bg-red-500'
                    } h-fit`}>
                      {company.suggestion}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-500">Match Score</span>
                      <span className="font-medium">{company.matchScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${company.matchScore}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between mb-3">
                    <span className="text-gray-500 flex items-center">
                      <CircleDollarSign className="h-4 w-4 mr-1" />
                      Current Price
                    </span>
                    <span className="font-medium">{company.stockPrice}</span>
                  </div>

                  <div className="mb-3">
                    <div className="text-gray-500 flex items-center mb-1">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Why this matches you:
                    </div>
                    <ul className="pl-6 list-disc text-sm text-gray-600">
                      {company.reasons.map((reason, idx) => (
                        <li key={idx}>{reason}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-center mt-4">
                    <Button>View Full Analysis</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Suggestions;
