
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TrendingUp, Bell, BookMarked, Users, Wallet, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock watchlist data
const watchlistCompanies = [
  { name: 'Apple Inc.', ticker: 'AAPL', price: '$178.72', change: '+1.2%', suggestion: 'Invest' },
  { name: 'Microsoft Corporation', ticker: 'MSFT', price: '$412.31', change: '+0.8%', suggestion: 'Invest' },
  { name: 'Tesla Inc.', ticker: 'TSLA', price: '$245.18', change: '-2.1%', suggestion: 'Hold' },
  { name: 'Amazon.com Inc.', ticker: 'AMZN', price: '$182.50', change: '+1.5%', suggestion: 'Invest' },
];

// Mock recent searches
const recentSearches = [
  'Apple Inc.',
  'Microsoft Corporation',
  'Tesla Inc.',
  'Amazon.com Inc.',
  'Google LLC'
];

// Mock notifications
const notifications = [
  { message: 'Apple Inc. reported quarterly earnings above expectations', time: '2 hours ago', type: 'info' },
  { message: 'Tesla stock dropped by 5% following production delays', time: '1 day ago', type: 'warning' },
  { message: 'New investment suggestion: Microsoft looks promising', time: '3 days ago', type: 'suggestion' },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold">Your Investment Dashboard</h1>
            <p className="mt-2">Track your watchlist, recent activities, and get personalized insights</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Summary */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  Account Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Investment Budget</div>
                    <div className="text-2xl font-semibold">$10,000</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Risk Tolerance</div>
                    <div className="text-2xl font-semibold">Medium</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Investment Focus</div>
                    <div className="text-2xl font-semibold">Technology</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Companies Tracked</div>
                    <div className="text-2xl font-semibold">4</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Watchlist */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookMarked className="h-5 w-5 mr-2 text-primary" />
                  Your Watchlist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {watchlistCompanies.map((company, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <div className="font-medium">{company.name}</div>
                        <div className="text-sm text-gray-500">{company.ticker}</div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div>{company.price}</div>
                        <div className={`text-sm ${company.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {company.change}
                        </div>
                      </div>
                      <Badge className={`${
                        company.suggestion === 'Invest' ? 'bg-green-500' : 
                        company.suggestion === 'Hold' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}>
                        {company.suggestion}
                      </Badge>
                    </div>
                  ))}
                  <Button className="w-full mt-4" variant="outline">Manage Watchlist</Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Searches */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="h-5 w-5 mr-2 text-primary" />
                  Recent Searches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      <span>{search}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-4" variant="outline">Clear History</Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-primary" />
                  Recent Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                {notifications.map((notification, index) => (
                  <div key={index} className="mb-4 p-3 border-l-4 bg-gray-50 rounded-r-lg border-l-blue-500">
                    <div className="flex justify-between">
                      <p>{notification.message}</p>
                      <span className="text-sm text-gray-500">{notification.time}</span>
                    </div>
                  </div>
                ))}
                <Button className="w-full mt-2" variant="outline">View All Notifications</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
