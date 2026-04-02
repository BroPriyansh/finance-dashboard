import React from "react"
import { Shield, User } from 'lucide-react'

export default function DashboardHeader({ role, setRole }) {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          FinanceOverview
        </h1>
        <p className="text-muted text-sm mt-1">Track and understand your financial activity</p>
      </div>
      <div className="flex items-center gap-3 glass px-4 py-2 rounded-full">
        {role === "admin" ? <Shield className="w-5 h-5 text-accent" /> : <User className="w-5 h-5 text-primary" />}
        <select 
          value={role} 
          onChange={e => setRole(e.target.value)} 
          className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
        >
          <option value="viewer" className="bg-card">Viewer Mode</option>
          <option value="admin" className="bg-card">Admin Mode</option>
        </select>
      </div>
    </header>
  )
}
