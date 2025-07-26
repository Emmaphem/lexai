
'use client'

import { useEffect, useState } from 'react'

export default function AdminPage() {
  const [records, setRecords] = useState<any[]>([])

  useEffect(() => {
    setRecords([
      { user: 'alice@example.com', filename: 'nda.pdf', summary: 'Summary here', paid: true },
      { user: 'bob@example.com', filename: 'contract.docx', summary: 'Pending...', paid: false },
    ])
  }, [])

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-4">LexAI Admin Dashboard</h1>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">User</th>
            <th className="p-2">File</th>
            <th className="p-2">Summary</th>
            <th className="p-2">Paid</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{r.user}</td>
              <td className="p-2">{r.filename}</td>
              <td className="p-2 text-sm">{r.summary}</td>
              <td className="p-2">{r.paid ? '✅' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
