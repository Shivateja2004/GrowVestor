
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BarChart4, LineChart, PieChart, ArrowRight, CircleDollarSign, TrendingUp, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

// Mock companies data
const companiesData = [
  {
    id: 'aapl',
    name: 'Apple Inc.',
    ticker: 'AAPL',
    industry: 'Technology',
    logo: 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png',
    stockPrice: '$178.72',
    marketCap: '$2.8T',
    peRatio: 28.5,
    revenue: 394.33,
    profitMargin: 25.3,
    dividendYield: 0.5,
    riskScore: 35,
    debtToEquity: 1.52,
    priceToPeakRevenue: 18.9,
    morningstarRating: 4,
    growthRate: 8.2,
    suggestion: 'Invest'
  },
  {
    id: 'msft',
    name: 'Microsoft Corporation',
    ticker: 'MSFT',
    industry: 'Technology',
    logo: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
    stockPrice: '$412.31',
    marketCap: '$2.9T',
    peRatio: 34.2,
    revenue: 211.92,
    profitMargin: 36.8,
    dividendYield: 0.7,
    riskScore: 30,
    debtToEquity: 0.37,
    priceToPeakRevenue: 12.5,
    morningstarRating: 5,
    growthRate: 14.3,
    suggestion: 'Invest'
  },
  {
    id: 'amzn',
    name: 'Amazon.com Inc.',
    ticker: 'AMZN',
    industry: 'Technology',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    stockPrice: '$182.50',
    marketCap: '$1.9T',
    peRatio: 60.1,
    revenue: 574.78,
    profitMargin: 7.2,
    dividendYield: 0,
    riskScore: 45,
    debtToEquity: 0.89,
    priceToPeakRevenue: 2.8,
    morningstarRating: 4,
    growthRate: 12.7,
    suggestion: 'Invest'
  },
  {
    id: 'tsla',
    name: 'Tesla Inc.',
    ticker: 'TSLA',
    industry: 'Automotive',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png',
    stockPrice: '$245.18',
    marketCap: '$780B',
    peRatio: 70.5,
    revenue: 96.77,
    profitMargin: 11.4,
    dividendYield: 0,
    riskScore: 65,
    debtToEquity: 0.11,
    priceToPeakRevenue: 5.9,
    morningstarRating: 3,
    growthRate: 21.5,
    suggestion: 'Hold'
  },
  {
    id: 'jnj',
    name: 'Johnson & Johnson',
    ticker: 'JNJ',
    industry: 'Healthcare',
    logo: 'https://www.jnj.com/sites/default/files/jnj-logo.svg',
    stockPrice: '$152.49',
    marketCap: '$365B',
    peRatio: 10.3,
    revenue: 87.93,
    profitMargin: 19.8,
    dividendYield: 3.1,
    riskScore: 25,
    debtToEquity: 0.44,
    priceToPeakRevenue: 4.3,
    morningstarRating: 4,
    growthRate: 3.8,
    suggestion: 'Invest'
  }
];

// Mock revenue chart data
const getRevenueData = (companies, selectedCompanies) => {
  const data = [];
  
  for (let quarter = 1; quarter <= 8; quarter++) {
    const quarterData = {
      name: `Q${quarter % 4 === 0 ? 4 : quarter % 4} ${Math.floor((quarter - 1) / 4) + 2022}`
    };
    
    selectedCompanies.forEach(companyId => {
      const company = companies.find(c => c.id === companyId);
      const baseRevenue = company.revenue / 4;
      const randomFactor = 0.9 + (Math.random() * 0.2);
      const growthFactor = 1 + (company.growthRate / 100 * (quarter / 8));
      quarterData[company.ticker] = +(baseRevenue * randomFactor * growthFactor).toFixed(2);
    });
    
    data.push(quarterData);
  }
  
  return data;
};

// Mock performance metrics for radar chart
const getPerformanceData = (companies, selectedCompanies) => {
  const metricsKeys = ['valueScore', 'growthScore', 'profitabilityScore', 'momentumScore', 'stabilityScore'];
  
  return selectedCompanies.map(companyId => {
    const company = companies.find(c => c.id === companyId);
    
    return {
      company: company.ticker,
      valueScore: Math.round(85 - company.peRatio / 2),
      growthScore: Math.round(40 + company.growthRate * 3),
      profitabilityScore: Math.round(company.profitMargin * 2.5),
      momentumScore: Math.round(50 + (Math.random() * 40)),
      stabilityScore: Math.round(90 - company.riskScore),
    };
  });
};

const Compare = () => {
  const [selectedCompanies, setSelectedCompanies] = useState(['aapl', 'msft']);
  const [company1, setCompany1] = useState('aapl');
  const [company2, setCompany2] = useState('msft');
  
  const handleCompareClick = () => {
    setSelectedCompanies([company1, company2]);
  };
  
  const filteredCompanies = companiesData.filter(company => selectedCompanies.includes(company.id));
  const revenueData = getRevenueData(companiesData, selectedCompanies);
  const performanceData = getPerformanceData(companiesData, selectedCompanies);

  // Determine winning metrics
  const getWinner = (metric) => {
    if (filteredCompanies.length !== 2) return null;
    
    const company1Value = filteredCompanies[0][metric];
    const company2Value = filteredCompanies[1][metric];
    
    // For these metrics, lower is better
    if (['peRatio', 'riskScore'].includes(metric)) {
      return company1Value < company2Value ? 0 : 1;
    }
    
    // For all other metrics, higher is better
    return company1Value > company2Value ? 0 : 1;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold">Company Comparison</h1>
            <p className="mt-2">Compare financial metrics and performance between companies</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Company Selector */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart4 className="h-5 w-5 mr-2 text-primary" />
                Select Companies to Compare
              </CardTitle>
              <CardDescription>
                Choose two companies to compare side by side
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-full md:w-2/5">
                  <Select value={company1} onValueChange={setCompany1}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Company 1" />
                    </SelectTrigger>
                    <SelectContent>
                      {companiesData.map(company => (
                        <SelectItem key={company.id} value={company.id}>
                          {company.name} ({company.ticker})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="hidden md:block">
                  <ArrowRight className="h-6 w-6" />
                </div>
                
                <div className="w-full md:w-2/5">
                  <Select value={company2} onValueChange={setCompany2}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Company 2" />
                    </SelectTrigger>
                    <SelectContent>
                      {companiesData.map(company => (
                        <SelectItem key={company.id} value={company.id}>
                          {company.name} ({company.ticker})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={handleCompareClick} className="md:w-1/5">
                  Compare
                </Button>
              </div>
            </CardContent>
          </Card>

          {filteredCompanies.length === 2 && (
            <>
              {/* Company Overview */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {filteredCompanies.map((company, index) => (
                  <Card key={company.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
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
                        }`}>
                          {company.suggestion}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">Stock Price</span>
                          <span className="font-medium">{company.stockPrice}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">Market Cap</span>
                          <span className="font-medium">{company.marketCap}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Revenue Comparison */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChart className="h-5 w-5 mr-2 text-primary" />
                    Revenue Comparison (Quarterly)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}B`, undefined]} />
                        <Legend />
                        {filteredCompanies.map((company, index) => (
                          <Line 
                            key={company.ticker}
                            type="monotone" 
                            dataKey={company.ticker} 
                            name={company.name}
                            stroke={index === 0 ? '#3b82f6' : '#f59e0b'}
                            strokeWidth={2} 
                            dot={{ r: 5 }}
                          />
                        ))}
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Key Metrics Comparison */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                    Key Financial Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b">
                          <th className="pb-2 pl-0">Metric</th>
                          {filteredCompanies.map(company => (
                            <th key={company.id} className="pb-2">{company.ticker}</th>
                          ))}
                          <th className="pb-2">Winner</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: 'P/E Ratio', key: 'peRatio', format: 'number', better: 'lower' },
                          { name: 'Profit Margin', key: 'profitMargin', format: 'percent', better: 'higher' },
                          { name: 'Dividend Yield', key: 'dividendYield', format: 'percent', better: 'higher' },
                          { name: 'Risk Score', key: 'riskScore', format: 'number', better: 'lower' },
                          { name: 'Debt to Equity', key: 'debtToEquity', format: 'number', better: 'lower' },
                          { name: 'Growth Rate', key: 'growthRate', format: 'percent', better: 'higher' },
                        ].map((metric, idx) => (
                          <tr key={metric.key} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                            <td className="py-3 pl-0 font-medium">{metric.name}</td>
                            {filteredCompanies.map(company => (
                              <td key={company.id} className="py-3">
                                {metric.format === 'percent' ? `${company[metric.key]}%` : company[metric.key]}
                              </td>
                            ))}
                            <td className="py-3">
                              {getWinner(metric.key) !== null ? (
                                <Badge className="bg-green-500">
                                  {filteredCompanies[getWinner(metric.key)].ticker}
                                </Badge>
                              ) : '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Radar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2 text-primary" />
                    Performance Metrics Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius={150} data={[
                        { category: 'Value', [filteredCompanies[0].ticker]: performanceData[0].valueScore, [filteredCompanies[1].ticker]: performanceData[1].valueScore },
                        { category: 'Growth', [filteredCompanies[0].ticker]: performanceData[0].growthScore, [filteredCompanies[1].ticker]: performanceData[1].growthScore },
                        { category: 'Profitability', [filteredCompanies[0].ticker]: performanceData[0].profitabilityScore, [filteredCompanies[1].ticker]: performanceData[1].profitabilityScore },
                        { category: 'Momentum', [filteredCompanies[0].ticker]: performanceData[0].momentumScore, [filteredCompanies[1].ticker]: performanceData[1].momentumScore },
                        { category: 'Stability', [filteredCompanies[0].ticker]: performanceData[0].stabilityScore, [filteredCompanies[1].ticker]: performanceData[1].stabilityScore },
                      ]}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="category" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name={filteredCompanies[0].name} dataKey={filteredCompanies[0].ticker} stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                        <Radar name={filteredCompanies[1].name} dataKey={filteredCompanies[1].ticker} stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                        <Legend />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Compare;
