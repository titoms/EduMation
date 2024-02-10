interface NavigationSectionProps {
  title: string;
  children: React.ReactNode;
}

const NavSection: React.FC<NavigationSectionProps> = ({ title, children }) => {
  return (
    <>
      <li className="px-5 hidden md:block">
        <div className="flex flex-row items-center h-8">
          <div className="text-sm font-bold tracking-wide text-gray-800 dark:text-gray-500 uppercase">
            {title}
          </div>
        </div>
      </li>
      {children}
    </>
  );
};

export default NavSection;
