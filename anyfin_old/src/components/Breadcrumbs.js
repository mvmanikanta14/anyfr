// Breadcrumbs.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className='bread_crumb'>
      <ul className="">
        {pathnames.length > 0 ? (
          <li>
            <Link to="/">Home</Link>
          </li>
        ) : (
          <li>Home</li>
        )}
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          return (
            <li key={to}>
              {index === pathnames.length - 1 ? (
                <span>{value}</span>
              ) : (
                <Link to={to}>{value}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;



// Breadcrumbs.js
// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const routeNameMap = {
//   '/individual': 'Individual',
//   '/businessEntities': 'Business Entities',
//   '/assets': 'Assets',
//   '/liability': 'Liability',
//   '/banks': 'Banks',
//   '/bankStaff': 'Bank Staff',
//   '/LoanScheme': 'Loan Scheme',
//   '/Subsidy': 'Subsidy Scheme',
//   '/client': 'Client',
//   '/assignment': 'Assignment',
//   '/users': 'User'
// };

// const Breadcrumbs = () => {
//   const location = useLocation();
//   const pathnames = location.pathname.split('/').filter((x) => x);

//   return (
//     <nav>
//       <ul className="breadcrumbs">
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         {pathnames.map((value, index) => {
//           const to = `/${pathnames.slice(0, index + 1).join('/')}`;
//           return (
//             <li key={to}>
//               {index === pathnames.length - 1 ? (
//                 <span>{routeNameMap[to] || value}</span>
//               ) : (
//                 <Link to={to}>{routeNameMap[to] || value}</Link>
//               )}
//             </li>
//           );
//         })}
//       </ul>
//     </nav>
//   );
// };

// export default Breadcrumbs;

