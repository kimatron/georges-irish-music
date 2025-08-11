import { NextResponse } from 'next/server'
import { stripe } from '../../../lib/stripe'
import { prisma } from '../../../lib/db'

export async function POST(request: Request) {
  try {
    console.log('=== PAYMENT VERIFICATION START ===')
    
    const { sessionId } = await request.json()
    console.log('Session ID received:', sessionId)

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      )
    }

    // Retrieve the Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    console.log('Stripe session payment status:', session.payment_status)

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      )
    }

    // Check if order already exists
    const existingOrder = await prisma.order.findFirst({
      where: {
        shippingAddress: {
          contains: session.id
        }
      }
    })

    if (existingOrder) {
      console.log('Order already exists:', existingOrder.id)
      return NextResponse.json({
        id: existingOrder.id,
        total: existingOrder.total,
        customerEmail: existingOrder.customerEmail,
        items: []
      })
    }

    const customerEmail = session.customer_email || 'unknown@email.com'
    const total = session.amount_total ? session.amount_total / 100 : 0

    // Create order WITH customerEmail field
    const order = await prisma.order.create({
      data: {
        userId: null,
        total: total,
        customerEmail: customerEmail, // ADD THIS LINE
        shippingAddress: `Stripe Customer: ${customerEmail}\nStripe Session: ${session.id}`,
        status: 'completed',
      }
    })

    console.log('Order created successfully:', order.id)

    return NextResponse.json({
      id: order.id,
      total: order.total,
      customerEmail: customerEmail,
      items: []
    })

  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}