import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

interface CartItem {
  id: string
  title: string
  artist: string
  price: number
  quantity: number
  imageUrl?: string | null
}

interface Customer {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  postcode: string
  country: string
  phone?: string
}

interface OrderRequest {
  items: CartItem[]
  customer: Customer
  total: number
}

export async function POST(request: Request) {
  try {
    const body: OrderRequest = await request.json()
    const { items, customer, total } = body

    // Validate required fields
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in order' },
        { status: 400 }
      )
    }

    if (!customer.email || !customer.firstName || !customer.lastName) {
      return NextResponse.json(
        { error: 'Missing required customer information' },
        { status: 400 }
      )
    }

    // Create customer info string
    const shippingAddress = `${customer.firstName} ${customer.lastName}\n${customer.address}\n${customer.city}, ${customer.postcode}\n${customer.country}\nEmail: ${customer.email}${customer.phone ? `\nPhone: ${customer.phone}` : ''}`

    // Create the order (without userId for guest orders)
    const order = await prisma.order.create({
      data: {
        total,
        shippingAddress,
        customerEmail: customer.email,
        status: 'pending',
        orderItems: {
          create: items.map((item) => ({
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

// GET all orders (for admin)
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Failed to fetch orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}