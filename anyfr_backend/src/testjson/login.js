const auth_validate_account = {
    success: true,
    account_name: "Acme Financials Pvt Ltd"
  };
  
  const auth_login = {
    success: true,
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    user: {
      user_id: "john.doe",
      name: "John Doe",
      role: "admin"
    }
  };
  
  const auth_error_invalid_account = {
    success: false,
    error: "Invalid Account ID"
  };
  
  const auth_error_invalid_credentials = {
    success: false,
    error: "Invalid credentials"
  };
  
  module.exports = {
    auth_validate_account,
    auth_login,
    auth_error_invalid_account,
    auth_error_invalid_credentials
  };
  