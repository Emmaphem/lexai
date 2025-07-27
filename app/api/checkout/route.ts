import Stripe from 'stripe';

export async function POST(request: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      return new Response(
        JSON.stringify({ error: 'Stripe is not configured' }), 
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Initialize Stripe only when the function is called
    const stripe = new Stripe(stripeSecretKey);

    // Get request body
    const body = await request.json();
    const { priceId, successUrl, cancelUrl } = body;

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl || `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_URL}/cancel`,
    });

    return new Response(
      JSON.stringify({ sessionId: session.id, url: session.url }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Stripe checkout error:', error);
    return new Response(
      JSON.stringify({ error: 'Payment processing failed' }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handle GET requests (optional - for testing)
export async function GET() {
  return new Response(
    JSON.stringify({ message: 'Checkout endpoint is working' }), 
    { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}