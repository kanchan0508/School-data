import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const DatabaseTest: React.FC = () => {
  const [status, setStatus] = useState<string>('Testing...');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    testDatabase();
  }, []);

  const testDatabase = async () => {
    try {
      console.log('🧪 Testing database connection...');
      
      // Test 1: Basic connection
      setStatus('Testing basic connection...');
      const { data: connectionTest, error: connectionError } = await supabase
        .from('schools')
        .select('count')
        .limit(1);
      
      if (connectionError) {
        console.error('Connection test failed:', connectionError);
        setError(connectionError);
        setStatus('❌ Connection failed');
        return;
      }
      
      setStatus('✅ Connection successful! Testing data fetch...');
      
      // Test 2: Fetch all data
      const { data: schoolsData, error: fetchError } = await supabase
        .from('schools')
        .select('*');
      
      if (fetchError) {
        console.error('Data fetch failed:', fetchError);
        setError(fetchError);
        setStatus('❌ Data fetch failed');
        return;
      }
      
      console.log('✅ Database test successful:', schoolsData);
      setData(schoolsData);
      setStatus(`✅ Success! Found ${schoolsData?.length || 0} schools`);
      
    } catch (err) {
      console.error('Database test error:', err);
      setError(err);
      setStatus('❌ Test failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Database Connection Test</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Status</h2>
          <p className="text-lg">{status}</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-red-800 mb-4">Error Details</h2>
            <pre className="text-sm text-red-700 whitespace-pre-wrap">
              {JSON.stringify(error, null, 2)}
            </pre>
          </div>
        )}
        
        {data && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              Data Retrieved ({data.length} records)
            </h2>
            <pre className="text-sm text-green-700 whitespace-pre-wrap max-h-96 overflow-y-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
        
        <div className="mt-6">
          <button
            onClick={testDatabase}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Re-test Database
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatabaseTest;
