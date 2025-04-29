import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userOption = body.option;

    if (userOption !== 'heads' && userOption !== 'tails') {
      return NextResponse.json({ message: 'Option must be either \'heads\' or \'tails\'' }, { status: 400 });
    }

    const randomNumber = Math.random();
    const result = randomNumber < 0.5 ? 'heads' : 'tails';

    const isCorrect = userOption === result;

    return NextResponse.json({
      result: result,
      isCorrect: isCorrect,
    });

  } catch (error) {
    // Handle potential errors during JSON parsing or other issues
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }
}
