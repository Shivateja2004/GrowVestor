
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AlertTriangle, TrendingDown, LineChart, BarChart, Clock, Newspaper } from 'lucide-react';
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

// Mock volatility data
const volatilityData = [
  { month: 'Jan', market: 12, company: 15 },
  { month: 'Feb', market: 11, company: 14 },
  { month: 'Mar', market: 13, company: 18 },
  { month: 'Apr', market: 15, company: 25 },
  { month: 'May', market: 14, company: 22 },
  { month: 'Jun', market: 12, company: 20 },
  { month: 'Jul', market: 10, company: 16 },
  { month: 'Aug', market: 9, company: 14 },
  { month: 'Sep', market: 12, company: 19 },
  { month: 'Oct', market: 13, company: 17 },
  { month: 'Nov', market: 15, company: 21 },
  { month: 'Dec', market: 16, company: 23 },
];

// Mock news sentiment data
const newsSentiments = [
  { title: 'Q3 Results exceed expectations', source: 'Financial Times', date: '2 days ago', sentiment: 'positive' },
  { title: 'New product launch delayed', source: 'Wall Street Journal', date: '1 week ago', sentiment: 'negative' },
  { title: 'Industry analysis shows increasing competition', source: 'Bloomberg', date: '3 days ago', sentiment: 'neutral' },
  { title: 'CEO addresses supply chain concerns', source: 'CNBC', date: '5 days ago', sentiment: 'neutral' },
  { title: 'Company announces expansion into new markets', source: 'Reuters', date: '1 day ago', sentiment: 'positive' },
];

// Risk factor data
const riskFactors = [
  { factor: 'Market Volatility', level: 65, description: 'The stock has shown higher than average price fluctuations' },
  { factor: 'Debt Ratio', level: 45, description: 'Moderate debt levels relative to equity' },
  { factor: 'Earnings Stability', level: 30, description: 'Consistent earnings growth over past quarters' },
  { factor: 'Industry Disruption', level: 75, description: 'Tech sector facing rapid changes and new competitors' },
  { factor: 'Regulatory Concerns', level: 50, description: 'Pending legislation could impact operations' },
];

const Risk = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold">Risk Analysis</h1>
            <p className="mt-2">Evaluate investment risks and make informed decisions</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Overall Risk Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                  Overall Risk Score
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full border-8 border-yellow-500 flex items-center justify-center mb-4">
                  <span className="text-5xl font-bold">68</span>
                </div>
                <div className="text-center">
                  <Badge className="bg-yellow-500 text-white px-3 py-1 text-lg">Moderate Risk</Badge>
                  <p className="mt-2 text-gray-600">
                    Based on market volatility, company financials, and industry analysis
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Volatility Comparison */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingDown className="h-5 w-5 mr-2 text-primary" />
                  Volatility Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={volatilityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="company" name="Company Volatility" stroke="#f59e0b" strokeWidth={2} />
                      <Line type="monotone" dataKey="market" name="Market Average" stroke="#3b82f6" strokeWidth={2} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Risk Factors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-primary" />
                  Key Risk Factors
                </CardTitle>
              </CardHeader>
              <CardContent>
                {riskFactors.map((factor, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{factor.factor}</span>
                      <span 
                        className={`font-medium ${
                          factor.level < 40 ? 'text-green-600' : 
                          factor.level < 70 ? 'text-yellow-500' : 'text-red-600'
                        }`}
                      >
                        {factor.level}/100
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          factor.level < 40 ? 'bg-green-500' : 
                          factor.level < 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${factor.level}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{factor.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* News Sentiment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Newspaper className="h-5 w-5 mr-2 text-primary" />
                  News Sentiment Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                {newsSentiments.map((news, index) => (
                  <div key={index} className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{news.title}</h3>
                        <div className="text-sm text-gray-500">
                          {news.source} • <Clock className="h-3 w-3 inline" /> {news.date}
                        </div>
                      </div>
                      <Badge className={`${
                        news.sentiment === 'positive' ? 'bg-green-500' : 
                        news.sentiment === 'neutral' ? 'bg-blue-500' : 'bg-red-500'
                      }`}>
                        {news.sentiment}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Risk;
