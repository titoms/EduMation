interface NavigationSectionProps {
  title: string;
  children: React.ReactNode;
}

const NavSection: React.FC<NavigationSectionProps> = ({ title, children }) => {
  return (
    <>
      <li className="px-5 hidden md:block">
        <div className="flex flex-row items-center h-8">
          <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
            {title}
          </div>
        </div>
      </li>
      {children}
    </>
  );
};

export default NavSection;
