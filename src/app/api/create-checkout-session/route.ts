import { NextResponse } from 'next/server'
import { stripe } from '../../../lib/stripe'

interface CartItem {
  id: string
  title: string
  artist: string
  price: number
  quantity: number
}

export async function POST(request: Request) {
  try {
    console.log('Creating checkout session...')
    
    const body = await request.json()
    console.log('Request body:', body)
    
    const { items, customer } = body

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items provided' },
        { status: 400 }
      )
    }

    console.log('Creating Stripe session for items:', items)

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: items.map((item: CartItem) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: `${item.title} - ${item.artist}`,
            description: 'Irish Music CD from George Gilsenan',
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      // Add shipping
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 500, // €5.00 in cents
              currency: 'eur',
            },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 3,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
      ],
      customer_email: customer.email,
      metadata: {
        customerInfo: JSON.stringify(customer),
        items: JSON.stringify(items),
      },
      success_url: `${request.headers.get('origin')}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/cart`,
    })

    console.log('Stripe session created successfully:', session.id)
    return NextResponse.json({ sessionId: session.id })
    
  } catch (error) {
    console.error('Detailed Stripe checkout error:', error)
    return NextResponse.json(
      { error: `Failed to create checkout session: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}