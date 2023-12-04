import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <>
      <nav className="py-8 px-24 bg-blue-400">
        <ul className="flex justify-between ml-3 py-2 md:py-0 px-6 md:px-0">
          <li className="text-base  text-white md:ml-4 font-semibold">
            <NavLink activeclassname="text-slate-900" to="/" exact="true">
              {' '}
              Home
            </NavLink>
          </li>
          <li className="text-base font-semibold text-white ml-4 ">
            <NavLink activeclassname="text-slate-600" to="/signin">
              Sign In
            </NavLink>
          </li>
          <li className="text-base font-semibold text-white ml-4 ">
            <NavLink activeclassname="text-slate-600" to="/signup">
              Sign Up
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
