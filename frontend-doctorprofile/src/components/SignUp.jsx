import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/doctor/register',
        {
          username,
          email,
          password,
        }
      );

      console.log(response.data);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || 'An error occurred');
      } else {
        setError('An error occurred');
      }
    }
  };

  return (
    <section className="mx-auto max-w-lg py-12">
      <header className="text-center">
        <h1 className="text-4xl">Signup</h1>
        <h6 className="mt-4 text-green-600 text-xl">
          <Link to="/signin">Have an account?</Link>
        </h6>
      </header>
      <form className="mt-8 text-center px-4" onSubmit={handleSignup}>
        <input
          className="block w-full border px-4 py-2 mt-6 mb-3"
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <span className="text-xl text-red-600">{error}</span>
        <input
          className="block w-full border px-4 py-2 mt-6 mb-3"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="text-xl text-red-600">{}</span>
        <input
          className="block w-full border px-4 py-2 mt-6 mb-3"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="text-xl text-red-600">{}</span>
        <div className="text-right">
          <button
            className="bg-green-600 text-white text-xl px-4 py-2 disabled:bg-gray-400 rounded"
            type="submit"
          >
            Sign up
          </button>
        </div>
      </form>
    </section>
  );
}
