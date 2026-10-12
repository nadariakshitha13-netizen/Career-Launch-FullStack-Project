
import React, { useEffect, useState } from 'react';
import api from '../api';

export default function OpportunitiesPage({ user, token }) {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    title: '',
    company: '',
    type: 'Internship',
    location: 'Remote',
    skills: '',
    description: ''
  });

  async function load() {
    try {
      const { data } = await api.get('/opportunities', {
        params: { q, type }
      });
      setItems(data);
    } catch {
      setMessage(
        'Unable to load opportunities. Check that the backend and MongoDB are running.'
      );
    }
  }

  useEffect(() => {
    load();
  }, [q, type]);

  async function apply(id) {
    if (!token) {
      setMessage('Please sign in before applying.');
      return;
    }

    try {
      const { data } = await api.post(`/applications/${id}`);
      setMessage(
        data.message || 'Application submitted successfully!'
      );
    } catch (err) {
      if (err.response?.status === 409) {
        setMessage(
          'You have already applied to this opportunity. Check My Applications.'
        );
      } else {
        setMessage(
          err.response?.data?.message ||
          'Application could not be submitted. Please try again.'
        );
      }
    }
  }

  async function create(e) {
    e.preventDefault();

    try {
      await api.post('/opportunities', {
        ...form,
        skills: form.skills.split(',').map(s => s.trim()).filter(Boolean)
      });

      setForm({
        title: '',
        company: '',
        type: 'Internship',
        location: 'Remote',
        skills: '',
        description: ''
      });

      setMessage('Opportunity published.');
      load();
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        'Only an admin can publish opportunities.'
      );
    }
  }

  return (
    <div className="page-wrap">
      <section className="page-hero">
        <div>
          <p className="eyebrow">EXPLORE WHAT'S NEXT</p>
          <h1>Opportunities built for <span>your future.</span></h1>
          <p>
            Discover internships and early-career roles to turn your skills
            into experience.
          </p>
        </div>
        <div className="hero-bubble">
          <span>✦</span>
          <small>Make your<br />next move</small>
        </div>
      </section>

      {message && (
        <div className="notice">
          <span>{message}</span>
          <button onClick={() => setMessage('')}>×</button>
        </div>
      )}

      <section className="search-row">
        <div className="search-box">
          <span>⌕</span>
          <input
            aria-label="Search opportunities"
            placeholder="Search role, company, skill or location"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
        </div>

        <select
          aria-label="Opportunity type"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <option value="">All opportunities</option>
          <option>Internship</option>
          <option>Full-time</option>
          <option>Part-time</option>
        </select>
      </section>

      {user?.role === 'admin' && (
        <form className="panel admin-form" onSubmit={create}>
          <h2>Publish an opportunity</h2>

          <div className="form-grid">
            <input
              placeholder="Role title"
              required
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
            <input
              placeholder="Company"
              required
              value={form.company}
              onChange={e => setForm({ ...form, company: e.target.value })}
            />
            <select
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
            >
              <option>Internship</option>
              <option>Full-time</option>
              <option>Part-time</option>
            </select>
            <input
              placeholder="Location"
              value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
            />
            <input
              placeholder="Skills, comma separated"
              value={form.skills}
              onChange={e => setForm({ ...form, skills: e.target.value })}
            />
            <input
              placeholder="Description"
              required
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <button className="primary-button">Publish opportunity</button>
        </form>
      )}

      <div className="section-title">
        <div>
          <p className="eyebrow">CURATED FOR YOUR GROWTH</p>
          <h2>Latest opportunities</h2>
        </div>
        <span className="count-pill">{items.length} listed</span>
      </div>

      {items.length ? (
        <div className="opportunity-grid">
          {items.map(item => (
            <article className="panel opportunity-card" key={item._id}>
              <div className="card-top">
                <div className="company-logo">
                  {(item.company || 'C').slice(0, 1).toUpperCase()}
                </div>
                <span className="type-pill">{item.type}</span>
              </div>

              <h3>{item.title}</h3>
              <p className="company-name">{item.company}</p>
              <p className="description">{item.description}</p>

              <div className="meta-row">
                <span>⌖ {item.location || 'Location flexible'}</span>
                {item.applyBy && (
                  <span>
                    Apply by {new Date(item.applyBy).toLocaleDateString()}
                  </span>
                )}
              </div>

              <div className="skills">
                {(item.skills || []).slice(0, 4).map(skill => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>

              <button
                className="primary-button full"
                onClick={() => apply(item._id)}
              >
                Apply now <span>→</span>
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div>✦</div>
          <h3>No opportunities found yet</h3>
          <p>
            Try another search, or check back when new roles are published.
          </p>
        </div>
      )}
    </div>
  );
}