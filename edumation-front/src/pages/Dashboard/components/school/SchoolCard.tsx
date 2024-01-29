import { NavLink } from 'react-router-dom';
import { School } from '../../../../services/Types';

interface SchoolCardProps {
  school: School;
}

const SchoolCard: React.FC<SchoolCardProps> = ({ school }) => {
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg overflow-hidden mb-10">
        <img
          src="https://cdn.tailgrids.com/1.0/assets/images/cards/card-01/image-01.jpg"
          alt="image"
          className="w-full"
        />
        <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
          <h3>
            <NavLink
              to="#"
              className="
                font-semibold
                text-dark text-xl
                sm:text-[22px]
                md:text-xl
                lg:text-[22px]
                xl:text-xl
                2xl:text-[22px]
                mb-4
                block
                hover:text-primary
                "
            >
              {school.name}
            </NavLink>
          </h3>
          <p className="text-base text-body-color leading-relaxed mb-7">
            {school.address}
          </p>
          <div className="text-sm">
            <p className="mt-2">{school.contactInfo.phone}</p>
            <p className="mt-2">{school.contactInfo.email}</p>
            <p className="mt-2">
              <a href={school.contactInfo.website}>
                {school.contactInfo.website}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolCard;