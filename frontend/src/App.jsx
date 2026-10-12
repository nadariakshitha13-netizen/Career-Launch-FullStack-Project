import React from 'react';
import { useState } from 'react';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage.jsx';
import OpportunitiesPage from './pages/OpportunitiesPage.jsx';
import ApplicationsPage from './pages/ApplicationsPage.jsx';
export default function App() {
  const [token, setToken] = useState(localStorage.getItem('careerLaunchToken'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('careerLaunchUser') || 'null'));
  const navigate = useNavigate();
  function onAuth(data) { localStorage.setItem('careerLaunchToken', data.token); localStorage.setItem('careerLaunchUser', JSON.stringify(data.user)); setToken(data.token); setUser(data.user); navigate('/opportunities'); }
  function logout() { localStorage.removeItem('careerLaunchToken'); localStorage.removeItem('careerLaunchUser'); setToken(null); setUser(null); navigate('/'); }
  return <div className="app-shell"><header className="topbar"><Link className="brand" to="/opportunities"><span className="brand-mark">CL</span><span>Career<span className="brand-light">Launch</span></span></Link><nav><NavLink to="/opportunities">Opportunities</NavLink>{token && <NavLink to="/applications">My applications</NavLink>}{token ? <button className="nav-button" onClick={logout}>Log out</button> : <NavLink to="/">Sign in</NavLink>}</nav></header><main><Routes><Route path="/" element={<AuthPage onAuth={onAuth} />} /><Route path="/opportunities" element={<OpportunitiesPage user={user} token={token} />} /><Route path="/applications" element={<ApplicationsPage token={token} />} /><Route path="*" element={<OpportunitiesPage user={user} token={token} />} /></Routes></main><footer>Career Launch · Student career opportunities in one place</footer></div>;
}
