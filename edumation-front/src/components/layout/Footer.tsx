import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faFacebook,
  faInstagram,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <>
      <footer className="relative bg-gray-200 dark:bg-slate-950 pt-16 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <h4 className="text-3xl fonat-semibold text-gray-700 dark:text-gray-100">
                Let's keep in touch!
              </h4>
              <h5 className="text-lg mt-0 mb-2 text-gray-600 dark:text-gray-200">
                Find us on any of these platforms :
              </h5>
              <div className="mt-6 lg:mb-0 mb-6">
                <button
                  className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </button>
                <button
                  className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </button>
                <button
                  className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </button>
                <button
                  className="bg-white text-gray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </button>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="mt-4 block uppercase text-gray-500 dark:text-gray-200 text-sm font-semibold mb-2">
                    Useful Links
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 font-semibold block pb-2 text-sm"
                        href=""
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 font-semibold block pb-2 text-sm"
                        href=""
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 font-semibold block pb-2 text-sm"
                        href=""
                      >
                        Github
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 font-semibold block pb-2 text-sm"
                        href=""
                      >
                        How it works?
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <span className="mt-4 block uppercase text-gray-500 dark:text-gray-200 text-sm font-semibold mb-2">
                    Other Resources
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 font-semibold block pb-2 text-sm"
                        href=""
                      >
                        MIT License
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 font-semibold block pb-2 text-sm"
                        href=""
                      >
                        Terms &amp; Conditions
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 font-semibold block pb-2 text-sm"
                        href=""
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 font-semibold block pb-2 text-sm"
                        href=""
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-300 dark:border-gray-600" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold py-1">
                Copyright © <span id="get-current-year">2021</span>
                <a
                  href=""
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
                  target="_blank"
                >
                  {' '}
                  EduMation{' '}
                </a>
                <span>by </span>
                <a
                  href=""
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
                >
                  Christophe Crognier
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
