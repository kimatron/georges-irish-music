import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status } = body

    const order = await prisma.order.update({
      where: { id: params.id },
      data: { status, updatedAt: new Date() }
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error('Failed to update order:', error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}