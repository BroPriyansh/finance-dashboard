import React from "react"
import { DollarSign, X } from 'lucide-react'

export default function AddTransactionModal({ isModalOpen, setIsModalOpen, handleAddTransaction, newTx, setNewTx }) {
  if (!isModalOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="glass-card w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-muted hover:text-white transition-colors">
            <X className="w-5 h-5"/>
        </button>
        <h2 className="text-xl font-bold mb-6">Add Transaction</h2>
        
        <form onSubmit={handleAddTransaction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted mb-1">Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer bg-background border border-slate-700 px-4 py-2 rounded-lg flex-1 hover:border-primary transition-colors">
                <input type="radio" value="expense" checked={newTx.type === "expense"} onChange={e => setNewTx({...newTx, type: e.target.value})} className="accent-primary" />
                Expense
              </label>
              <label className="flex items-center gap-2 cursor-pointer bg-background border border-slate-700 px-4 py-2 rounded-lg flex-1 hover:border-primary transition-colors">
                <input type="radio" value="income" checked={newTx.type === "income"} onChange={e => setNewTx({...newTx, type: e.target.value})} className="accent-primary" />
                Income
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-muted mb-1">Date</label>
            <input required type="date" value={newTx.date} onChange={e => setNewTx({...newTx, date: e.target.value})} className="w-full bg-background border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-primary text-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted mb-1">Amount</label>
            <div className="relative">
              <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input required type="number" min="0" step="0.01" value={newTx.amount} onChange={e => setNewTx({...newTx, amount: e.target.value})} placeholder="0.00" className="w-full bg-background border border-slate-700 rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-primary text-white" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted mb-1">Category</label>
            <input required type="text" value={newTx.category} onChange={e => setNewTx({...newTx, category: e.target.value})} placeholder="e.g. Groceries" className="w-full bg-background border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-primary text-white" />
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-primary/20">
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
