import { NavLink } from 'react-router-dom';

interface NavLinkItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  roles: string[];
  userRole: string;
}

const NavLinkItem: React.FC<NavLinkItemProps> = ({
  to,
  icon,
  label,
  roles,
  userRole,
}) => {
  if (!roles.includes(userRole)) return null;

  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 dark:hover:bg-slate-800 text-black dark:text-white hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-blue-800 pr-6 ${
            isActive ? ' bg-gray-700' : ''
          }`
        }
      >
        <span className="inline-flex justify-center items-center ml-4">
          {icon}
        </span>
        <span className="ml-2 text-sm tracking-wide truncate">{label}</span>
      </NavLink>
    </li>
  );
};

export default NavLinkItem;
