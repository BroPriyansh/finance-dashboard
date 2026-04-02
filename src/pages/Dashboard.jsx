import React, { useMemo, useState } from "react"
import DashboardHeader from "../components/DashboardHeader"
import SummaryCards from "../components/SummaryCards"
import Charts from "../components/Charts"
import TransactionsSection from "../components/TransactionsSection"
import AddTransactionModal from "../components/AddTransactionModal"

export default function Dashboard({ transactions, setTransactions, role, setRole }) {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTx, setNewTx] = useState({ date: "", amount: "", category: "", type: "expense" })

  const filtered = useMemo(() => {
    return transactions.filter(t => {
      const matchFilter = filter === "all" || t.type === filter
      const matchSearch = t.category.toLowerCase().includes(search.toLowerCase()) || t.date.includes(search)
      return matchFilter && matchSearch
    }).sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [transactions, search, filter])

  const income = transactions.filter(t => t.type === "income").reduce((a, b) => a + b.amount, 0)
  const expense = transactions.filter(t => t.type === "expense").reduce((a, b) => a + Number(b.amount), 0)
  const balance = income - expense

  const categoryData = useMemo(() => {
    const expObj = transactions.reduce((acc, t) => {
      if (t.type === "expense") {
        acc[t.category] = (acc[t.category] || 0) + Number(t.amount)
      }
      return acc
    }, {})
    return Object.keys(expObj).map(key => ({ name: key, value: expObj[key] })).sort((a,b)=>b.value - a.value)
  }, [transactions])

  const highestCategory = categoryData.length > 0 ? categoryData[0] : { name: "N/A", value: 0 }

  const timeData = useMemo(() => {
    const dates = [...new Set(transactions.map(t => t.date))].sort()
    return dates.map(date => {
      const dayTxs = transactions.filter(t => t.date === date)
      const dayInc = dayTxs.filter(t => t.type === "income").reduce((a, b) => a + Number(b.amount), 0)
      const dayExp = dayTxs.filter(t => t.type === "expense").reduce((a, b) => a + Number(b.amount), 0)
      return { date, income: dayInc, expense: dayExp }
    })
  }, [transactions])

  const handleAddTransaction = (e) => {
    e.preventDefault()
    if(!newTx.amount || !newTx.date || !newTx.category) return;
    const added = {
      id: Date.now(),
      date: newTx.date,
      amount: Number(newTx.amount),
      category: newTx.category,
      type: newTx.type
    }
    setTransactions(prev => [...prev, added])
    setIsModalOpen(false)
    setNewTx({ date: "", amount: "", category: "", type: "expense" })
  }

  const handleDelete = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-8 pb-20">
      <DashboardHeader role={role} setRole={setRole} />
      <SummaryCards balance={balance} income={income} expense={expense} />
      <Charts timeData={timeData} categoryData={categoryData} highestCategory={highestCategory} />
      <TransactionsSection 
        filtered={filtered} 
        search={search} 
        setSearch={setSearch} 
        filter={filter} 
        setFilter={setFilter} 
        role={role} 
        setIsModalOpen={setIsModalOpen} 
        handleDelete={handleDelete} 
      />
      <AddTransactionModal 
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen} 
        handleAddTransaction={handleAddTransaction} 
        newTx={newTx} 
        setNewTx={setNewTx} 
      />
    </div>
  )
}
