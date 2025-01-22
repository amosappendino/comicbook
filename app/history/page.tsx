"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';

interface HistoryItem {
  prompt: string;
  image_url: string;
  created_at: string;
}

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('https://sundai-backend-39193345146.us-east4.run.app/history');
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Generation History</h1>
        <Link 
          href="/" 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Back to Generator
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : history.length === 0 ? (
        <div className="text-center text-blue-900 text-xl">
          No generations found. Try creating some images first!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="relative aspect-square mb-4">
                <Image
                  src={item.image_url}
                  alt={item.prompt}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <p className="text-blue-900 font-medium mb-2">Prompt:</p>
              <p className="text-blue-900">{item.prompt}</p>
              <p className="text-blue-600 text-sm mt-2">
                {new Date(item.created_at).toLocaleDateString()} at{' '}
                {new Date(item.created_at).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 