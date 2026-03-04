import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from '../src/components/common/Header';
import Home from './pages/Home';
import Companies from './pages/Companies';
import CompanyDetail from './pages/CompanyDetail';
import CreateCompany from './pages/CreateCompany';
import AddShareholders from './pages/AddShareholders';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#f0f4f8]">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/new" element={<CreateCompany />} />
            <Route path="/companies/:id" element={<CompanyDetail />} />
            <Route path="/companies/:id/shareholders" element={<AddShareholders />} />
          </Routes>
        </main>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0a1929',
              color: '#fff',
              border: '1px solid #1e3a6b',
            },
            success: {
              style: {
                background: '#0a1929',
                border: '1px solid #22c55e',
              },
            },
            error: {
              style: {
                background: '#0a1929',
                border: '1px solid #ef4444',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;