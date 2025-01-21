import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const result = await replicate.run(
      'sundai-club/amosimages:ae2884556d0c63e6526dfdc585dba3d2bab5fbea2653183c042d52aff21be703',  // Your actual Replicate model path
      {
        input: {
          prompt: prompt
        }
      }
    );

    // Get the image URL from the result
    const imageUrl = Array.isArray(result) ? result[0] : result;

    console.log("Generated image URL:", imageUrl);
    
    // Fetch the image
    const response = await fetch(imageUrl);
    const imageBlob = await response.blob();
    
    // Convert blob to base64
    const buffer = Buffer.from(await imageBlob.arrayBuffer());
    const base64Image = buffer.toString('base64');

    return NextResponse.json({ 
      image: `data:image/png;base64,${base64Image}` 
    });

  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}
