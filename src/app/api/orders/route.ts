import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { items, customer, total } = body

    // Create customer info string
    const shippingAddress = `${customer.firstName} ${customer.lastName}\n${customer.address}\n${customer.city}, ${customer.postcode}\n${customer.country}\nEmail: ${customer.email}${customer.phone ? `\nPhone: ${customer.phone}` : ''}`

    // Create the order
    const order = await prisma.order.create({
      data: {
        userId: 'guest', // We'll add proper auth later
        total,
        shippingAddress,
        status: 'pending',
        orderItems: {
          create: items.map((item: any) => ({
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

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Failed to create order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}