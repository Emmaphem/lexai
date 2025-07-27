export async function POST() {
  return new Response(
    JSON.stringify({ message: 'Upload endpoint temporarily disabled' }), 
    { 
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

export async function GET() {
  return new Response(
    JSON.stringify({ message: 'Upload endpoint temporarily disabled' }), 
    { 
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}