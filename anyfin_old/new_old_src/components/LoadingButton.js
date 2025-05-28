// import React, { useState } from "react";

// const LoadingButton = ({ text, styleType }) => {
//   const [loading, setLoading] = useState(false);

//   const handleClick = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//     }, 500); // Simulating an API call
//   };

//   return (
//     <button
//       className={`btn ${styleType} ${loading ? "loading" : ""}`}
//       onClick={handleClick}
//       disabled={loading}
//     >
//       {loading ? <span className="spinner"></span> : text}
//     </button>
//   );
// };
// export default LoadingButton;

import React, { useState } from "react";

const LoadingButton = ({ text, styleType }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulating an API call
  };

  return (
    <div
      className={` ${styleType} ${loading ? "loading" : ""}`}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <span className="spinner-text">
          <span className="spinner"></span> {text}
        </span>
      ) : (
        text
      )}
    </div>
  );
};

export default LoadingButton;