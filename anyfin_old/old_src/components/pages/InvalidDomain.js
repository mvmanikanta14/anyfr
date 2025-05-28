import React from "react";

const InvalidDomain = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100  bg-white single-page">
      <div className=" p-8  rounded-lg text-center max-w-md py-3">
        
       <img 
          src="../invaild-domain.jpg" 
          alt="Invalid Domain" 
          className=" mx-auto mb-4"
          style={{ width: '480px' }}
        />

        <h1 className="text-2xl font-bold mb-0"> 404</h1>
        <h2 className="text-4xl font-semibold"> <b> Invalid Domain </b> </h2>
        <p className="text-gray-600 mt-2">
          The domain you are trying to access is not authorized.
        </p>
         
      </div>
    </div>
  );
};

export default InvalidDomain;
