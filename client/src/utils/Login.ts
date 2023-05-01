const logIn = async (email: string, password: string) => {
  const address = process.env.REACT_APP_SERVER + "/users/login";
  const data = { email, password };

  const response = await fetch(address, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return await response.json();
};

export default logIn;
