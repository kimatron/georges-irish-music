export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center max-w-5xl mx-auto">
          {/* Animated badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect text-emerald-300 text-sm font-medium mb-8 animate-fade-in-up">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            40 Years of Musical Heritage
          </div>

          {/* Main heading with gradient text */}
          <h1 className="font-playfair text-6xl md:text-8xl font-bold mb-6 animate-fade-in-up">
            <span className="text-white">George Gilsenan&apos;s</span>
            <br />
            <span className="text-gradient animate-shimmer">Irish Music</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in-up-delay">
            From the ancient hills of <span className="text-emerald-400 font-semibold">Kells</span> to the coastal beauty of <span className="text-emerald-400 font-semibold">Wexford</span>, 
            discover Ireland&apos;s musical soul through four decades of passionate curation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up-delay-2">
            <button className="group relative bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25">
              <span className="relative z-10">Explore the Collection</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
            
            <button className="group border-2 border-emerald-400 text-emerald-400 hover:text-white hover:bg-emerald-400 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              George&apos;s Story
              <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in-up-delay-2">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">1000+</div>
              <div className="text-gray-400">Curated Albums</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">40</div>
              <div className="text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">32</div>
              <div className="text-gray-400">Counties Covered</div>
            </div>
          </div>
        </div>

        {/* Floating Music Categories */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-6xl mx-auto">
          {[
            { title: "Traditional Irish", desc: "Ancient melodies passed down through generations", delay: "0s" },
            { title: "Irish Country", desc: "Stories of rural life and heartfelt ballads", delay: "0.2s" },
            { title: "Celtic Folk", desc: "Modern interpretations of timeless tales", delay: "0.4s" }
          ].map((category, index) => (
            <div 
              key={index}
              className="group glass-effect p-8 rounded-2xl hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer animate-fade-in-up"
              style={{animationDelay: category.delay}}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <span className="text-2xl">🎵</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-playfair">
                  {category.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {category.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quote Section */}
        <div className="max-w-4xl mx-auto text-center mt-24">
          <div className="glass-effect p-12 rounded-3xl">
            <blockquote className="text-2xl md:text-3xl font-playfair text-white italic mb-6">
              &ldquo;Every song tells a story, every melody carries the soul of Ireland. 
              After 40 years, the music still gives me goosebumps.&rdquo;
            </blockquote>
            <cite className="text-emerald-400 font-semibold text-lg">— George Gilsenan</cite>
          </div>
        </div>
      </div>
    </main>
  )
}