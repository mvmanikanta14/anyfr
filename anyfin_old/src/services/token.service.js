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

  setEntityName(entity_name) {
    localStorage.setItem("entity_name", entity_name);
  }


 

  getEID() {
    // return getItem(localStorage.assignment);
    return localStorage.getItem("id");
  }

  getEntityName() {
    // return getItem(localStorage.assignment);
    return localStorage.getItem("entity_name");
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
    localStorage.removeItem("id");
  }

  removeAssignementID() {
    localStorage.removeItem("assignment_id");
    localStorage.removeItem("id");
    localStorage.removeItem("Entity_id");
  }


  removeUser() {
    localStorage.removeItem("token");
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
