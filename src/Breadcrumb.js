import { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import { FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Breadcrumbs = () => {
  const [isSticky, setIsSticky] = useState(false); // Track if breadcrumb is sticky

  useEffect(() => {
    // Function to detect scroll position
    const handleScroll = () => {
      const scrollPosition = window.scrollY; // Get current scroll position
      // Log the scroll position for debugging purposes
      console.log(scrollPosition);

      if (scrollPosition > 10) {
        setIsSticky(true); // Add sticky class when scrolled 100px
      } else {
        setIsSticky(false); // Remove sticky class when scrolled less than 100px
      }
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className={`breadcrumb ${isSticky ? 'sticky' : ''}`}>
      <h6 className="current-page-title"> Dynamically Page Title Comes Here </h6>
      <div className="breadcrumb">
        <nav>
          <ul>
            <li className="breadcrumb-item">
              <Link to="/entitydashboard">
                <Home size={'14'} />
              </Link>
              <span className="breadcrumb-divider">
                <FaAngleRight size={10} />
              </span>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
            Page Title
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumbs;
