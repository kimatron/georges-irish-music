import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db' // Fixed path

export async function GET() {
  try {
    // Get today's date range
    const today = new Date()
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)

    // Run all queries in parallel for better performance
    const [
      totalProducts,
      ordersToday,
      totalRevenue,
      featuredItems,
      lowStockItems,
      recentOrders
    ] = await Promise.all([
      prisma.product.count(),
      prisma.order.count({
        where: {
          createdAt: {
            gte: startOfDay,
            lt: endOfDay
          }
        }
      }),
      prisma.order.aggregate({
        _sum: {
          total: true
        },
        where: {
          status: {
            in: ['completed', 'shipped']
          }
        }
      }),
      prisma.product.count({
        where: {
          featured: true
        }
      }),
      prisma.product.count({
        where: {
          stock: {
            lt: 5
          }
        }
      }),
      prisma.order.findMany({
        take: 5,
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          customerEmail: true,
          total: true,
          createdAt: true
        }
      })
    ])

    return NextResponse.json({
      totalProducts,
      ordersToday,
      totalRevenue: totalRevenue._sum.total || 0,
      featuredItems,
      lowStockItems,
      recentOrders
    })

  } catch (error) {
    console.error('Failed to fetch admin stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}