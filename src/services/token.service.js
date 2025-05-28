class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("token"));
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("token"));
    return user?.token;
  }

  updateLocalAccessToken(token) {
    let user = JSON.parse(localStorage.getItem("token"));
    user.token = token;
    localStorage.setItem("token", JSON.stringify(token));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("token"));
  }

  setUser(user) {
    localStorage.setItem("token", JSON.stringify(user));
  }

  setAssignment(assignment) {
    localStorage.setItem("assignment", assignment);
  }

  getAssignement() {
    // return getItem(localStorage.assignment);
    return JSON.parse(localStorage.getItem("assignment"));
  }

  setAssignmentname(assignmentname) {
    localStorage.setItem("assignmentname", assignmentname);
  }


  getAssignmentname() {
    // return getItem(localStorage.assignment);
    return localStorage.getItem("assignmentname");
  }

  setLoginID(login_id) {
    localStorage.setItem("login_id", login_id);
  }

  getLoginID() {
    // return getItem(localStorage.assignment);
    return localStorage.getItem("login_id");
  }

  setEID(id) {
    localStorage.setItem("id", id);
  }

  setFrameworkID(financial_framework_id) {
    localStorage.setItem("financial_framework_id", financial_framework_id);
  }

  setEntityID(entity_id) {
    localStorage.setItem("entity_id", entity_id);
  }

  setEntityName(entity_name) {
    localStorage.setItem("entity_name", entity_name);
  }

  setPeriodName(reporting_periods) {
    localStorage.setItem("reporting_periods", reporting_periods);
  }


 
  getFrameworkID() {
    // return getItem(localStorage.assignment);
    return localStorage.getItem("financial_framework_id");
  }

  getEID() {
    // return getItem(localStorage.assignment);
    return localStorage.getItem("id");
  }

  getEntityID() {
    // return getItem(localStorage.assignment);
    return localStorage.getItem("entity_id");
  }

  getEntityName() {
    // return getItem(localStorage.assignment);
    return localStorage.getItem("entity_name");
  }

  getPeriodName() {
    // return getItem(localStorage.assignment);
    return localStorage.getItem("reporting_periods");
  }

  setClient(client) {
    localStorage.setItem("client", client);
  }

  getClient() {
    return localStorage.getItem("client");
  }

  setClientname(clientname) {
    localStorage.setItem("clientname", clientname);
  }

  getClientname() {
    // return getItem(localStorage.assignment);
    return localStorage.getItem("clientname");
  }

  

  removeEntity() {
    localStorage.removeItem("entity_name");
    localStorage.removeItem("id");
    localStorage.removeItem("reporting_periods");
    localStorage.removeItem("entity_id");
    localStorage.removeItem("financial_framework_id");
  }

  removeAssignementID() {
    localStorage.removeItem("assignment_id");
    localStorage.removeItem("id");
    localStorage.removeItem("Entity_id");
  }


  removeUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
  }
}

export default new TokenService();


// class TokenService {
//   getLocalRefreshToken() {
//     const user = JSON.parse(localStorage.getItem("token"));
//     return user?.refreshToken;
//   }

//   getLocalAccessToken() {
//     const user = JSON.parse(localStorage.getItem("token"));
//     return user?.token;
//   }

//   updateLocalAccessToken(token) {
//     let user = JSON.parse(localStorage.getItem("token"));
//     user.token = token;
//     localStorage.setItem("token", JSON.stringify(user));
//   }

//   getUser() {
//     return JSON.parse(localStorage.getItem("token"));
//   }

//   setUser(user) {
//     localStorage.setItem("token", JSON.stringify(user));
//   }

//   setAssignment(assignment) {
//     localStorage.setItem("assignment", assignment);
//   }

//   // getAssignment() {
//   //   return JSON.parse(localStorage.getItem("assignment"));
//   // }

//   setAssignmentname(assignmentname) {
//     localStorage.setItem("assignmentname", assignmentname);
//   }

//   getAssignmentname() {
//     return localStorage.getItem("assignmentname");
//   }

//   setAssignmentID(id) {
//     localStorage.setItem("id", id);
//   }

//   setAssignmentEID(e_id) {
//     localStorage.setItem("Entity_id", e_id);
//   }

//   getAssignmentEID() {
//     return localStorage.getItem("Entity_id");
//   }

//   getAssignmentID() {
//     return localStorage.getItem("id");
//   }

//   setClient(client) {
//     localStorage.setItem("client", client);
//   }

//   getClient() {
//     return localStorage.getItem("client");
//   }

//   setClientname(clientname) {
//     localStorage.setItem("clientname", clientname);
//   }

//   getClientname() {
//     return localStorage.getItem("clientname");
//   }

//   removeAssignment() {
//     localStorage.removeItem("assignmentname");
//     localStorage.removeItem("id");
//     localStorage.removeItem("Entity_id");
//   }

//   removeAssignmentID() {
//     localStorage.removeItem("assignment_id");
//     localStorage.removeItem("id");
//     localStorage.removeItem("Entity_id");
//   }

//   removeUser() {
//     localStorage.removeItem("token");
//   }

 
//   getToken() {
//     return localStorage.getItem("token");
//   }

//   extractAndSetEntityID() {
//     const token = this.getToken();
//     if (token) { 
    
//         this.setAssignmentEID(1);
//         this.setAssignmentID(1);       

     
//     }
//   }
// }

// export default new TokenService();
