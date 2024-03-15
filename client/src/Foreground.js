import React from 'react';
import {
  Route,
  Routes

} from "react-router-dom";
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Mentees from './components/Mentees';
import NavBar from './components/NavBar';
import Edit from './components/Edit';
import ErrorPage from './components/ErrorPage';
import './index.css'
import { Toaster } from 'sonner';

const Foreground = () => {
  return (
    <>

      <main>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mentees" element={<Mentees />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Toaster richColors />
    </>
  )
}

export default Foreground