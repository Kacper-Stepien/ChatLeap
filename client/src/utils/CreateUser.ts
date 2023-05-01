const createUser = async (
  name: string,
  surname: string,
  email: string,
  nick: string,
  password: string,
  passwordConfirm: string
) => {
  const address = process.env.REACT_APP_SERVER + "/users/signup";
  const data = {
    name,
    surname,
    email,
    nick,
    password,
    passwordConfirm,
  };

  const response = await fetch(address, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

export default createUser;
