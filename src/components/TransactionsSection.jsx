import React from "react"
import { Search, Filter, Plus } from 'lucide-react'

export default function TransactionsSection({
  filtered, search, setSearch, filter, setFilter, role, setIsModalOpen, handleDelete
}) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-background border border-slate-700 text-sm rounded-full pl-9 pr-4 py-2 focus:outline-none focus:border-primary transition-colors text-white w-full md:w-48"
            />
          </div>
          
          <div className="relative">
            <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <select 
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="bg-background border border-slate-700 text-sm rounded-full pl-9 pr-8 py-2 focus:outline-none focus:border-primary transition-colors text-white appearance-none cursor-pointer"
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {role === "admin" && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-white p-2 md:px-4 md:py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
            >
              <Plus className="w-4 h-4" /> <span className="hidden md:inline">Add New</span>
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/30 text-muted text-xs uppercase tracking-wider border-b border-slate-700/50">
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Status</th>
              {role === "admin" && <th className="px-6 py-4 font-medium text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-muted">
                  No transactions found.
                </td>
              </tr>
            ) : (
              filtered.map(t => (
                <tr key={t.id} className="hover:bg-slate-800/20 transition-colors group">
                  <td className="px-6 py-4 text-sm whitespace-nowrap">{t.date}</td>
                  <td className="px-6 py-4 text-sm font-medium">{t.category}</td>
                  <td className="px-6 py-4 font-semibold whitespace-nowrap">
                    {t.type === "income" ? "+" : "-"}${t.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                      {t.type}
                    </span>
                  </td>
                  {role === "admin" && (
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete(t.id)}
                        className="text-xs text-danger hover:text-red-400 bg-red-500/10 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
