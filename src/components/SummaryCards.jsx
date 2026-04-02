import React from "react"
import { Wallet, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react'

export default function SummaryCards({ balance, income, expense }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="glass-card p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all">
          <Wallet className="w-16 h-16 text-primary" />
        </div>
        <p className="text-muted text-sm font-medium mb-1">Total Balance</p>
        <h2 className="text-4xl font-bold">${balance.toLocaleString()}</h2>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-accent flex items-center bg-accent/10 px-2 py-0.5 rounded-full">
            <TrendingUp className="w-3 h-3 mr-1" /> +2.4%
          </span>
          <span className="text-muted ml-2">vs last month</span>
        </div>
      </div>

      <div className="glass-card p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all">
          <ArrowUpRight className="w-16 h-16 text-accent" />
        </div>
        <p className="text-muted text-sm font-medium mb-1">Total Income</p>
        <h2 className="text-3xl font-bold text-accent">${income.toLocaleString()}</h2>
        <p className="text-muted text-xs mt-4">Cash inflow across all sources</p>
      </div>

      <div className="glass-card p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all">
          <ArrowDownRight className="w-16 h-16 text-danger" />
        </div>
        <p className="text-muted text-sm font-medium mb-1">Total Expenses</p>
        <h2 className="text-3xl font-bold text-danger">${expense.toLocaleString()}</h2>
        <p className="text-muted text-xs mt-4">Cash outflow across all categories</p>
      </div>
    </div>
  )
}
