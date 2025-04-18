
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calculator as CalculatorIcon, DollarSign, TrendingUp, CircleCheck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const Calculator = () => {
  // SIP Calculator State
  const [sipAmount, setSipAmount] = useState(5000);
  const [sipYears, setSipYears] = useState(10);
  const [sipRate, setSipRate] = useState(12);
  const [sipResult, setSipResult] = useState(0);
  const [sipData, setSipData] = useState([]);

  // Lump Sum Calculator State
  const [lumpAmount, setLumpAmount] = useState(100000);
  const [lumpYears, setLumpYears] = useState(5);
  const [lumpRate, setLumpRate] = useState(10);
  const [lumpResult, setLumpResult] = useState(0);
  const [lumpData, setLumpData] = useState([]);

  // Risk Tolerance State
  const [riskAnswers, setRiskAnswers] = useState({
    investmentGoal: 3,
    timeHorizon: 3,
    lossTolerance: 3,
    marketDrop: 3,
    experience: 3
  });
  const [riskScore, setRiskScore] = useState(0);
  const [riskProfile, setRiskProfile] = useState('');

  // Calculate SIP returns
  useEffect(() => {
    const P = sipAmount;
    const n = sipYears * 12;
    const r = sipRate / 100 / 12;
    const amount = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

    setSipResult(Math.round(amount));
    
    // Generate data for chart
    const data = [];
    let runningTotal = 0;
    
    for (let year = 1; year <= sipYears; year++) {
      const yearMonths = year * 12;
      const investedAmount = P * yearMonths;
      const totalAmount = P * ((Math.pow(1 + r, yearMonths) - 1) / r) * (1 + r);
      const returns = totalAmount - investedAmount;
      
      data.push({
        year: `Year ${year}`,
        investment: Math.round(investedAmount),
        returns: Math.round(returns),
        total: Math.round(totalAmount)
      });
    }
    
    setSipData(data);
  }, [sipAmount, sipYears, sipRate]);

  // Calculate Lump Sum returns
  useEffect(() => {
    const P = lumpAmount;
    const t = lumpYears;
    const r = lumpRate / 100;
    const amount = P * Math.pow(1 + r, t);

    setLumpResult(Math.round(amount));
    
    // Generate data for chart
    const data = [];
    
    for (let year = 1; year <= lumpYears; year++) {
      const totalAmount = P * Math.pow(1 + r, year);
      const returns = totalAmount - P;
      
      data.push({
        year: `Year ${year}`,
        investment: Math.round(P),
        returns: Math.round(returns),
        total: Math.round(totalAmount)
      });
    }
    
    setLumpData(data);
  }, [lumpAmount, lumpYears, lumpRate]);

  // Calculate Risk Profile
  useEffect(() => {
    const total = Object.values(riskAnswers).reduce((sum, val) => sum + val, 0);
    const score = Math.round((total / (5 * 5)) * 100);
    setRiskScore(score);
    
    if (score < 30) {
      setRiskProfile('Conservative');
    } else if (score < 50) {
      setRiskProfile('Moderately Conservative');
    } else if (score < 70) {
      setRiskProfile('Moderate');
    } else if (score < 90) {
      setRiskProfile('Moderately Aggressive');
    } else {
      setRiskProfile('Aggressive');
    }
  }, [riskAnswers]);

  const handleRiskAnswer = (question, value) => {
    setRiskAnswers({
      ...riskAnswers,
      [question]: value
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold">Financial Calculators</h1>
            <p className="mt-2">Plan your investments and understand your risk profile</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs defaultValue="sip">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sip">SIP Calculator</TabsTrigger>
              <TabsTrigger value="lumpsum">Lump Sum Calculator</TabsTrigger>
              <TabsTrigger value="risk">Risk Tolerance</TabsTrigger>
            </TabsList>
            
            {/* SIP Calculator */}
            <TabsContent value="sip">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalculatorIcon className="h-5 w-5 mr-2 text-primary" />
                    SIP Return Calculator
                  </CardTitle>
                  <CardDescription>
                    Calculate returns on your Systematic Investment Plan (SIP)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      {/* Monthly Investment */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">
                          Monthly Investment Amount (₹)
                        </label>
                        <Input
                          type="number"
                          value={sipAmount}
                          onChange={(e) => setSipAmount(Number(e.target.value))}
                        />
                        <Slider
                          value={[sipAmount]}
                          min={500}
                          max={100000}
                          step={500}
                          onValueChange={(val) => setSipAmount(val[0])}
                          className="mt-2"
                        />
                      </div>

                      {/* Time Period */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">
                          Time Period (Years): {sipYears}
                        </label>
                        <Slider
                          value={[sipYears]}
                          min={1}
                          max={30}
                          step={1}
                          onValueChange={(val) => setSipYears(val[0])}
                        />
                      </div>

                      {/* Expected Return Rate */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">
                          Expected Return Rate (%): {sipRate}%
                        </label>
                        <Slider
                          value={[sipRate]}
                          min={1}
                          max={30}
                          step={0.5}
                          onValueChange={(val) => setSipRate(val[0])}
                        />
                      </div>

                      {/* Results */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-500">Invested Amount</div>
                            <div className="text-2xl font-semibold">₹{(sipAmount * sipYears * 12).toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Estimated Returns</div>
                            <div className="text-2xl font-semibold text-green-600">
                              ₹{(sipResult - (sipAmount * sipYears * 12)).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="text-sm text-gray-500">Total Value</div>
                          <div className="text-3xl font-bold">₹{sipResult.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>

                    {/* Chart */}
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sipData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <Tooltip
                            formatter={(value) => [`₹${value.toLocaleString()}`, undefined]}
                          />
                          <Legend />
                          <Line type="monotone" dataKey="investment" name="Invested Amount" stroke="#3b82f6" strokeWidth={2} />
                          <Line type="monotone" dataKey="returns" name="Returns" stroke="#10b981" strokeWidth={2} />
                          <Line type="monotone" dataKey="total" name="Total Value" stroke="#8b5cf6" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Lump Sum Calculator */}
            <TabsContent value="lumpsum">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-primary" />
                    Lump Sum Investment Calculator
                  </CardTitle>
                  <CardDescription>
                    Calculate returns on your one-time investment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      {/* One-time Investment */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">
                          Investment Amount (₹)
                        </label>
                        <Input
                          type="number"
                          value={lumpAmount}
                          onChange={(e) => setLumpAmount(Number(e.target.value))}
                        />
                        <Slider
                          value={[lumpAmount]}
                          min={10000}
                          max={10000000}
                          step={10000}
                          onValueChange={(val) => setLumpAmount(val[0])}
                          className="mt-2"
                        />
                      </div>

                      {/* Time Period */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">
                          Time Period (Years): {lumpYears}
                        </label>
                        <Slider
                          value={[lumpYears]}
                          min={1}
                          max={30}
                          step={1}
                          onValueChange={(val) => setLumpYears(val[0])}
                        />
                      </div>

                      {/* Expected Return Rate */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">
                          Expected Return Rate (%): {lumpRate}%
                        </label>
                        <Slider
                          value={[lumpRate]}
                          min={1}
                          max={30}
                          step={0.5}
                          onValueChange={(val) => setLumpRate(val[0])}
                        />
                      </div>

                      {/* Results */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-500">Invested Amount</div>
                            <div className="text-2xl font-semibold">₹{lumpAmount.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Estimated Returns</div>
                            <div className="text-2xl font-semibold text-green-600">
                              ₹{(lumpResult - lumpAmount).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="text-sm text-gray-500">Total Value</div>
                          <div className="text-3xl font-bold">₹{lumpResult.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>

                    {/* Chart */}
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={lumpData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <Tooltip
                            formatter={(value) => [`₹${value.toLocaleString()}`, undefined]}
                          />
                          <Legend />
                          <Line type="monotone" dataKey="investment" name="Invested Amount" stroke="#3b82f6" strokeWidth={2} />
                          <Line type="monotone" dataKey="returns" name="Returns" stroke="#10b981" strokeWidth={2} />
                          <Line type="monotone" dataKey="total" name="Total Value" stroke="#8b5cf6" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Risk Tolerance */}
            <TabsContent value="risk">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                    Risk Tolerance Assessment
                  </CardTitle>
                  <CardDescription>
                    Answer these questions to understand your investment risk profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      {/* Question 1 */}
                      <div>
                        <h3 className="font-medium mb-2">What is your primary investment goal?</h3>
                        <div className="space-y-2">
                          {[
                            { value: 1, label: 'Capital preservation (minimal risk)' },
                            { value: 2, label: 'Income generation with some growth' },
                            { value: 3, label: 'Balanced income and growth' },
                            { value: 4, label: 'Growth-focused with some income' },
                            { value: 5, label: 'Aggressive growth (high risk tolerance)' }
                          ].map(option => (
                            <div key={option.value} className="flex items-center">
                              <input
                                type="radio"
                                id={`goal-${option.value}`}
                                name="investmentGoal"
                                className="mr-2"
                                checked={riskAnswers.investmentGoal === option.value}
                                onChange={() => handleRiskAnswer('investmentGoal', option.value)}
                              />
                              <label htmlFor={`goal-${option.value}`}>{option.label}</label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Question 2 */}
                      <div>
                        <h3 className="font-medium mb-2">What is your investment time horizon?</h3>
                        <div className="space-y-2">
                          {[
                            { value: 1, label: 'Less than 1 year' },
                            { value: 2, label: '1-3 years' },
                            { value: 3, label: '3-5 years' },
                            { value: 4, label: '5-10 years' },
                            { value: 5, label: 'More than 10 years' }
                          ].map(option => (
                            <div key={option.value} className="flex items-center">
                              <input
                                type="radio"
                                id={`time-${option.value}`}
                                name="timeHorizon"
                                className="mr-2"
                                checked={riskAnswers.timeHorizon === option.value}
                                onChange={() => handleRiskAnswer('timeHorizon', option.value)}
                              />
                              <label htmlFor={`time-${option.value}`}>{option.label}</label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Question 3 */}
                      <div>
                        <h3 className="font-medium mb-2">How would you feel if your investment lost 20% in a year?</h3>
                        <div className="space-y-2">
                          {[
                            { value: 1, label: 'I would sell immediately to prevent further losses' },
                            { value: 2, label: 'I would be very concerned and might consider selling' },
                            { value: 3, label: 'I would be concerned but would wait to see if it recovers' },
                            { value: 4, label: 'I would see it as an opportunity to buy more' },
                            { value: 5, label: 'I would definitely buy more at lower prices' }
                          ].map(option => (
                            <div key={option.value} className="flex items-center">
                              <input
                                type="radio"
                                id={`loss-${option.value}`}
                                name="lossTolerance"
                                className="mr-2"
                                checked={riskAnswers.lossTolerance === option.value}
                                onChange={() => handleRiskAnswer('lossTolerance', option.value)}
                              />
                              <label htmlFor={`loss-${option.value}`}>{option.label}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="space-y-6 mb-6">
                        {/* Question 4 */}
                        <div>
                          <h3 className="font-medium mb-2">When the market drops significantly, what do you typically do?</h3>
                          <div className="space-y-2">
                            {[
                              { value: 1, label: 'Sell everything to avoid further losses' },
                              { value: 2, label: 'Sell some investments to reduce risk' },
                              { value: 3, label: 'Do nothing and wait for recovery' },
                              { value: 4, label: 'Buy more of my existing investments' },
                              { value: 5, label: 'Actively look for new opportunities' }
                            ].map(option => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  type="radio"
                                  id={`market-${option.value}`}
                                  name="marketDrop"
                                  className="mr-2"
                                  checked={riskAnswers.marketDrop === option.value}
                                  onChange={() => handleRiskAnswer('marketDrop', option.value)}
                                />
                                <label htmlFor={`market-${option.value}`}>{option.label}</label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Question 5 */}
                        <div>
                          <h3 className="font-medium mb-2">How would you rate your investment experience?</h3>
                          <div className="space-y-2">
                            {[
                              { value: 1, label: 'No experience' },
                              { value: 2, label: 'Minimal experience' },
                              { value: 3, label: 'Moderate experience' },
                              { value: 4, label: 'Experienced investor' },
                              { value: 5, label: 'Professional investor' }
                            ].map(option => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  type="radio"
                                  id={`exp-${option.value}`}
                                  name="experience"
                                  className="mr-2"
                                  checked={riskAnswers.experience === option.value}
                                  onChange={() => handleRiskAnswer('experience', option.value)}
                                />
                                <label htmlFor={`exp-${option.value}`}>{option.label}</label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Results */}
                      <div className="bg-gray-50 p-6 rounded-lg text-center">
                        <h3 className="text-xl font-bold mb-2">Your Risk Profile</h3>
                        <div className="w-48 h-48 rounded-full border-8 border-blue-500 flex items-center justify-center mb-4 mx-auto">
                          <span className="text-4xl font-bold">{riskScore}%</span>
                        </div>
                        <div className="text-xl font-semibold mb-1">{riskProfile}</div>
                        <p className="text-gray-600 text-sm mb-4">
                          Based on your answers, this is your investment risk tolerance profile.
                        </p>
                        <div className="flex items-center justify-center">
                          <CircleCheck className="h-5 w-5 mr-1 text-green-500" />
                          <span className="text-sm">Assessment Complete</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Calculator;
