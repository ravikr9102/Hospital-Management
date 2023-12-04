import { Link } from 'react-router-dom';

export default function signup() {
  return (
    <section className="mx-auto max-w-lg py-12">
      <header className="text-center">
        <h1 className=" text-4xl">Sign in</h1>
        <h6 className="mt-4 text-green-600 text-xl">
          <Link to="/signup">Need an account?</Link>
        </h6>
      </header>
      <form className="mt-8 text-center px-4" action="">
        <input
          className="block w-full border px-4 py-2 mb-3"
          type="email"
          name="email"
          placeholder="Email"
        />
        <span className="text-xl text-red-600"></span>
        <input
          className="block w-full border px-4 py-2 mb-3 mt-8"
          type="password"
          name="password"
          placeholder="Password"
        />
        <span className="text-xl text-red-600"></span>
        <div className="text-right mt-6">
          <button className="bg-green-600 text-white text-xl px-4 py-2 disabled:bg-gray-400 rounded">
            Sign in
          </button>
        </div>
      </form>
    </section>
  );
}
