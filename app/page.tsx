
'use client'

import { useState } from 'react'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/upload', {
      method: 'POST',
      body: formData
    })

    const data = await res.json()
    setResult(data.summary || 'No summary found')
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">LexAI</h1>
        <p className="text-center text-gray-600 mb-6">
          Upload a legal document and get an AI-powered summary.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Analyze Document'}
          </button>
        </form>

        {result && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-100 text-sm">
            <h3 className="font-bold mb-2">Summary:</h3>
            <p>{result}</p>
          </div>
        )}
      </div>
    </main>
  )
}
