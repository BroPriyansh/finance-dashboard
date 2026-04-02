import { useState } from "react"
import Dashboard from "./pages/Dashboard"
import { data } from "./data/data"

export default function App() {
  const [transactions, setTransactions] = useState(data)
  const [role, setRole] = useState("viewer")

  return (
    <div className="min-h-screen text-textMain selection:bg-primary/30">
      <Dashboard 
        transactions={transactions} 
        setTransactions={setTransactions} 
        role={role} 
        setRole={setRole} 
      />
    </div>
  )
}
