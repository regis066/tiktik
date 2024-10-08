import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response: any, addUser:any) => {

  const token = response.credential;
  const decoded: { name: string; picture: string; sub: string } =
    jwtDecode(token);
  
  const { name, picture, sub } = decoded;

  const user = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  }

  addUser(user);

  await axios
    .post(`http://localhost:3000/api/auth`, user)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
;

  // console.log(decoded);
};
