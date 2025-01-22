import { NextResponse } from 'next/server';

const BACKEND_URL = 'https://sundai-backend-39193345146.us-east4.run.app';

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/history`);
    
    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch history' }, 
      { status: 500 }
    );
  }
} 