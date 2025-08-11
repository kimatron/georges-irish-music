'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch('/api/products')
        const products = await response.json()
        setFeaturedProducts(products.filter((p: any) => p.featured).slice(0, 3))
      } catch (error) {
        console.error('Failed to fetch featured products:', error)
      }
    }
    fetchFeatured()
  }, [])

  return (
    <main className="min-h-screen">
      {/* Hero Section with Irish countryside background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Irish countryside"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block px-6 py-2 border border-emerald-400/30 rounded-full text-emerald-300 text-sm font-medium tracking-wide mb-8 backdrop-blur-sm bg-black/20">
              Est. 1984 • Authentic Irish Music
            </div>

            <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-8 leading-none">
              <span className="font-extralight text-gray-200">George</span>
              <br />
              <span className="font-normal">Gilsenan's</span>
              <br />
              <span className="font-light text-emerald-300">Irish Music</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
              Four decades of preserving Ireland's musical heritage.
              <br />
              From Kells to Wexford, authentic sounds of the countryside.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/products"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-4 text-lg font-medium tracking-wide transition-colors duration-300"
              >
                BROWSE COLLECTION
              </Link>
              
              <Link 
                href="#heritage"
                className="border border-gray-400 text-gray-300 hover:bg-white hover:text-gray-900 px-10 py-4 text-lg font-medium tracking-wide transition-all duration-300"
              >
                OUR HERITAGE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Section with George's photo */}
      <section id="heritage" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-5xl font-light text-gray-900 mb-8 leading-tight">
                  A Life Devoted to
                  <span className="block font-normal text-emerald-700">Irish Tradition</span>
                </h2>
                
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    For over forty years, George Gilsenan has dedicated his life to preserving 
                    the authentic sounds of rural Ireland. Born in Kells, County Meath, 
                    his collection spans the musical traditions of all thirty-two counties.
                  </p>
                  
                  <p>
                    Each recording in our collection tells a story — of harvest festivals in Cork, 
                    late-night sessions in Galway pubs, and the timeless ballads that echo 
                    through the Irish countryside.
                  </p>

                  <div className="pt-6">
                    <blockquote className="text-xl italic text-gray-800 border-l-4 border-emerald-600 pl-6">
                      "These songs are the heartbeat of our people. Every melody carries 
                      the spirit of the land and the stories of those who worked it."
                    </blockquote>
                    <p className="text-emerald-700 font-medium mt-4">— George Gilsenan</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                {/* Irish countryside or traditional music scene */}
                <div className="aspect-square relative overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1484910292437-025e5d13ce87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Traditional Irish music session"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 text-white">
                    <div className="text-4xl font-light mb-2">40</div>
                    <div className="text-sm tracking-wide">YEARS OF HERITAGE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection with Irish music imagery */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-gray-900 mb-6">
                Featured from the Collection
              </h2>
              <div className="w-16 h-px bg-emerald-600 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Carefully selected albums representing the finest in Irish traditional, 
                country, and folk music.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredProducts.map((product: any, index: number) => {
                // Different Irish music themed images for variety
                const imageUrls = [
                  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", // Violin
                  "https://images.unsplash.com/photo-1571974599782-87624638275c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", // Guitar
                  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"  // Music studio
                ]
                
                return (
                  <div key={product.id} className="group bg-white hover:shadow-xl transition-all duration-500">
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={imageUrls[index % 3]}
                        alt={`${product.title} album artwork`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-emerald-600 font-medium mb-2">{product.artist}</p>
                      <p className="text-gray-500 text-sm mb-4 uppercase tracking-wide">{product.category}</p>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <span className="text-2xl font-light text-gray-900">€{product.price}</span>
                        <Link 
                          href="/products"
                          className="text-emerald-600 hover:text-emerald-700 font-medium text-sm tracking-wide transition-colors"
                        >
                          VIEW DETAILS →
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="text-center mt-16">
              <Link 
                href="/products"
                className="inline-block border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-12 py-4 text-lg font-medium tracking-wide transition-all duration-300"
              >
                VIEW FULL COLLECTION
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA with atmospheric background */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Irish landscape at sunset"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-emerald-900/80"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-light mb-6">
              Discover Authentic Irish Music
            </h2>
            <p className="text-xl text-emerald-100 mb-10 font-light leading-relaxed">
              Join music lovers worldwide who trust George's four decades of expertise 
              in preserving Ireland's musical heritage.
            </p>
            <Link 
              href="/products"
              className="inline-block bg-white text-emerald-900 hover:bg-gray-100 px-12 py-4 text-lg font-medium tracking-wide transition-colors duration-300"
            >
              START EXPLORING
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}