import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
export default function ApplicationsPage({ token }) {
  const [items, setItems] = useState([]); const [error, setError] = useState('');
  useEffect(() => { if (token) api.get('/applications/my').then(({data}) => setItems(data)).catch(err => setError(err.response?.data?.message || 'Could not load applications.')); }, [token]);
  if (!token) return <div className="empty-state"><h2>Sign in to see your applications</h2><Link className="primary-button" to="/">Go to sign in</Link></div>;
  return <div className="page-wrap"><div className="section-title application-heading"><div><p className="eyebrow">YOUR CAREER JOURNEY</p><h1>My applications</h1><p>Keep track of every opportunity you pursue.</p></div><span className="count-pill">{items.length} applications</span></div>{error && <div className="notice">{error}</div>}{items.length ? <div className="application-list">{items.map(app => <article className="panel application-card" key={app._id}><div className="company-logo">{(app.opportunity?.company || '?').slice(0,1)}</div><div className="application-info"><h3>{app.opportunity?.title || 'Opportunity removed'}</h3><p>{app.opportunity?.company || '—'} · Applied {new Date(app.createdAt).toLocaleDateString()}</p></div><span className={`status-pill status-${app.status.toLowerCase()}`}>{app.status}</span></article>)}</div> : <div className="empty-state"><div>↗</div><h3>Your next step starts here</h3><p>You haven't applied to any opportunities yet.</p><Link className="primary-button" to="/opportunities">Explore opportunities</Link></div>}</div>;
}
