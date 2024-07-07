export const validateToken = (tokenData) => {
    const currentTime = new Date().getTime();
    const expiryTime = tokenData?.expireAt;
    if (currentTime > expiryTime) {
      console.log("Token expired")
      return false;
    }
    console.log('validate',tokenData , tokenData?.data?.token 
      , tokenData?.expireAt)
    return tokenData && tokenData?.body?.token 
    && tokenData?.expireAt;
  }