import { NextResponse } from 'next/server'
import { stripe } from '../../../lib/stripe'
import { prisma } from '../../../lib/db'

interface CartItem {
  id: string
  title: string
  artist: string
  price: number
  quantity: number
}

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      )
    }

    // Retrieve the Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId)

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
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    })

    if (existingOrder) {
      return NextResponse.json({
        id: existingOrder.id,
        total: existingOrder.total,
        customerEmail: existingOrder.customerEmail,
        items: existingOrder.orderItems.map(item => ({
          title: item.product.title,
          artist: item.product.artist,
          quantity: item.quantity,
          price: item.price
        }))
      })
    }

    const customerEmail = session.customer_email || 'unknown@email.com'
    const total = session.amount_total ? session.amount_total / 100 : 0

    // Get items from session metadata
    const items: CartItem[] = JSON.parse(session.metadata?.items || '[]')
    console.log('Items from session:', items)

    // Create order WITH order items
    const order = await prisma.order.create({
      data: {
        userId: null,
        total: total,
        customerEmail: customerEmail,
        shippingAddress: `Stripe Customer: ${customerEmail}\nStripe Session: ${session.id}`,
        status: 'completed',
        orderItems: {
          create: items.map((item: CartItem) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    })

    // Reduce stock for each purchased item
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.id },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      })
      console.log(`Reduced stock for ${item.title} by ${item.quantity}`)
    }

    return NextResponse.json({
      id: order.id,
      total: order.total,
      customerEmail: customerEmail,
      items: order.orderItems.map(item => ({
        title: item.product.title,
        artist: item.product.artist,
        quantity: item.quantity,
        price: item.price
      }))
    })

  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}