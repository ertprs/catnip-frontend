export const isAuthenticated = () => {
  const storedTokenCustomer = localStorage.getItem("accessCustomerToken");
  const storedTokenUser = localStorage.getItem("accessUserToken");

  if(!storedTokenCustomer) {
    if(!storedTokenUser) return false;
  }

  return true;
};