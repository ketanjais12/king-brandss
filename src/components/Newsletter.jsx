import { useState } from 'react';

const STORAGE_KEY = 'king-brandss-newsletter-v1';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) return;

    try {
      const savedEmail = localStorage.getItem(STORAGE_KEY);

      if (savedEmail === normalizedEmail) {
        setMessage('This email is already saved on this device.');
        return;
      }

      localStorage.setItem(STORAGE_KEY, normalizedEmail);
      setMessage('Preference saved on this device. No emails will be sent in this demo.');
      setEmail('');
    } catch {
      setMessage('Your preference could not be saved. Please try again.');
    }
  }

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div className="newsletter-copy">
        <h2 id="newsletter-title">GET EXCLUSIVE UPDATES</h2>
        <p>Subscribe for new arrivals, offers and more.</p>
      </div>

      <div className="newsletter-form-area">
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <label className="visually-hidden" htmlFor="newsletter-email">
            Email address
          </label>

          <input
            id="newsletter-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setMessage('');
            }}
            aria-describedby="newsletter-note"
            maxLength={254}
            required
          />

          <button type="submit">SUBSCRIBE</button>
        </form>

        <p className="newsletter-note" id="newsletter-note">
          Demo: saves your preference on this device only.
        </p>

        <p className="newsletter-message" role="status">
          {message}
        </p>
      </div>
    </section>
  );
}

export default Newsletter;