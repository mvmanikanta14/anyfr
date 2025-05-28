import api from "./api";

class CommonService {
  getAll(apiUrl) {
    // console.log(apiUrl,"manki")
    return api.get(apiUrl).then((response) => {
      // console.log(response,"response in response")
      return response;
      
    });
    
  }


  getById(apiUrl) {
    return api.get(apiUrl).then((response) => {
      return response;
    });
  }

  add(apiUrl, inputObj) {
    console.log("Sending request to:", apiUrl);
    console.log("Payload:", inputObj);
  
    return api.post(apiUrl, inputObj)
      .then((response) => {
        console.log("Response received:", response);
        return response;
      })
      .catch((error) => {
        console.error("API Error:", error.response ? error.response.data : error.message);
        return Promise.reject(error.response ? error.response.data : { error: error.message }); // Return proper error object

        
      });
  }
  

  update(apiUrl, inputObj) {
    return api.put(apiUrl, inputObj).then((response) => {
      return response;
    });
  }

  patch(apiUrl, inputObj) {
    return api.patch(apiUrl, inputObj).then((response) => {
      return response;
    });
  }


  deleteById(apiUrl) {
    return api.delete(apiUrl).then((response) => {
      return response;
    });
  }
}

export default new CommonService();
  
