import { useState, useEffect } from 'react'
import { useStore } from '../store/useStore'
import { Upload, Map as MapIcon, Bot, X } from 'lucide-react'

const MapView = () => {
  const { bots, updateBotData } = useStore()
  const [svgContent, setSvgContent] = useState(null)
  const [svgFileName, setSvgFileName] = useState('')

  useEffect(() => {
    // Update bot positions every 2 seconds for smoother movement
    const interval = setInterval(() => {
      updateBotData()
    }, 2000)

    return () => clearInterval(interval)
  }, [updateBotData])

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'image/svg+xml') {
      setSvgFileName(file.name)
      const reader = new FileReader()
      reader.onload = (event) => {
        setSvgContent(event.target.result)
      }
      reader.readAsText(file)
    } else {
      alert('Please upload a valid SVG file')
    }
  }

  const clearMap = () => {
    setSvgContent(null)
    setSvgFileName('')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Warehouse Map View</h1>
        <p className="text-gray-600">Upload warehouse layout and track robot positions in real-time</p>
      </div>

      {/* Upload Section */}
      {!svgContent ? (
        <div className="bg-white rounded-xl shadow-lg p-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload Warehouse Layout</h2>
            <p className="text-gray-600 mb-6">
              Upload an SVG file of your warehouse layout to visualize robot positions
            </p>
            
            <label className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 cursor-pointer transition">
              <Upload className="w-5 h-5" />
              <span className="font-semibold">Choose SVG File</span>
              <input
                type="file"
                accept=".svg"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <div className="mt-8 bg-gray-50 rounded-lg p-6 text-left">
              <h3 className="font-semibold text-gray-800 mb-3">Instructions:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Upload any SVG file representing your warehouse layout</li>
                <li>• Bots will appear as colored circles on the map</li>
                <li>• Bot positions update every 2 seconds with simulated movement</li>
                <li>• Different colors represent different bot statuses</li>
                <li>• Hover over bots to see their details</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Map Controls */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapIcon className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-800">Warehouse Layout</h3>
                <p className="text-sm text-gray-600">{svgFileName}</p>
              </div>
            </div>
            <button
              onClick={clearMap}
              className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              <X className="w-4 h-4" />
              <span>Remove Map</span>
            </button>
          </div>

          {/* Map Display */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="relative bg-gray-50 rounded-lg overflow-hidden" style={{ minHeight: '500px' }}>
              {/* SVG Background */}
              <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{ __html: svgContent }}
                style={{ position: 'relative' }}
              />

              {/* Bot Overlays */}
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {bots.map((bot) => {
                  const color = 
                    bot.status === 'idle' ? '#10B981' :
                    bot.status === 'busy' ? '#3B82F6' :
                    bot.status === 'charging' ? '#F59E0B' :
                    '#EF4444'
                  
                  return (
                    <g key={bot.id}>
                      {/* Bot Circle */}
                      <circle
                        cx={bot.position.x}
                        cy={bot.position.y}
                        r="12"
                        fill={color}
                        className="animate-pulse-slow"
                      />
                      {/* Bot Inner Circle */}
                      <circle
                        cx={bot.position.x}
                        cy={bot.position.y}
                        r="8"
                        fill="white"
                        opacity="0.5"
                      />
                      {/* Bot Label */}
                      <text
                        x={bot.position.x}
                        y={bot.position.y - 20}
                        textAnchor="middle"
                        fontSize="12"
                        fill={color}
                        fontWeight="bold"
                        className="pointer-events-auto"
                      >
                        {bot.name}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>

            {/* Legend */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-700">Idle</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-700">Busy</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-gray-700">Charging</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-700">Error</span>
              </div>
            </div>
          </div>

          {/* Active Bots List */}
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Active Robots on Map</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {bots.map((bot) => (
                <div key={bot.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Bot className="w-4 h-4 text-gray-600" />
                    <span className="font-semibold text-sm text-gray-800">{bot.name}</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    <p className={`font-semibold ${
                      bot.status === 'idle' ? 'text-green-600' :
                      bot.status === 'busy' ? 'text-blue-600' :
                      bot.status === 'charging' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {bot.status.toUpperCase()}
                    </p>
                    <p>X: {Math.round(bot.position.x)}</p>
                    <p>Y: {Math.round(bot.position.y)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sample SVG Info */}
      {!svgContent && (
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-900 mb-3">💡 Need a Sample SVG?</h3>
          <p className="text-sm text-yellow-800 mb-3">
            You can create a simple warehouse SVG or use any SVG editor. Here's a basic example you can save as a .svg file:
          </p>
          <div className="bg-white rounded p-4 font-mono text-xs overflow-x-auto">
            <pre>{`<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#f0f0f0"/>
  <rect x="50" y="50" width="700" height="300" fill="#fff" stroke="#333" stroke-width="2"/>
  <text x="400" y="200" text-anchor="middle" font-size="24">Warehouse Floor</text>
  <rect x="100" y="100" width="150" height="100" fill="#e0e0e0" stroke="#666"/>
  <text x="175" y="155" text-anchor="middle">Zone A</text>
</svg>`}</pre>
          </div>
        </div>
      )}
    </div>
  )
}

export default MapView