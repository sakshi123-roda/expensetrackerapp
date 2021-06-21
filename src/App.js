import React, { useState,useEffect } from 'react'
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
const ALL_EXPENSES = localStorage.getItem('expenses')
  ? JSON.parse(localStorage.getItem('expenses'))
  : [];
 export default function App() {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [date,setDate]=useState('')
  const handleTitle = event => {
    console.log('Title ', event.target.value)
    setTitle(event.target.value)
  }
  const handleAmount = event => {
    console.log('Amount ', event.target.value)
    setAmount(event.target.value)
  }
  const handleDate = event =>{
    console.log('Date',event.target.value)
    setDate(event.target.value)
  }
  const handleSubmitForm = event => {
  event.preventDefault()
  if (title !== ''&& date !== '' && amount > 0) {
    const expense = { title, amount,date}
     setExpenses([...expenses, expense])
   
     setTitle('')
     setAmount('')
     setDate('')
    }

    else {
      console.log('Invalid expense name or the amount')
    }
}
  
const [expenses, setExpenses] = useState(ALL_EXPENSES)
  
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);
 return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <ProtectedRoute path="/dashboard">
          <Dashboard 
              title={title}
              amount={amount}
              date = {date}
              handleTitle={handleTitle}
              handleAmount={handleAmount}
              handleDate = {handleDate}
              handleSubmitForm={handleSubmitForm}
              expenses={expenses}
          />
        </ProtectedRoute>
        <Route exact path="/">
          <Redirect exact from="/" to="dashboard" />
        </Route>
        <Route path="*">
          <Redirect from="/" to="dashboard" />
        </Route>
      </Switch>
    </Router>
  );
}