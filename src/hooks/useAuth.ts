import axios from "axios";
export const useAuth = () => {
  const partnerLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      if (!email || !password) {
        return { data: "Bad Request", success: false, timestap: Date.now() };
      }
      const { data } = await axios.post(
        `${import.meta.env.VITE_REVERSE_PROXY_DOMAIN}/api/v1/partner/login`,
        { email, password }
      );

      return data;
    } catch (e) {
      const msg = e.response.data.data;
      return { data: msg, success: false, timestap: Date.now() };
    }
  };
  const partnerLoginByToken = async () => {
    try {
      const token = localStorage.getItem("partnerId");
      if (!token) {
        return { data: "Bad Request", success: false, timestamp: Date.now() };
      }
      const { data } = await axios.post(
        `${
          import.meta.env.VITE_REVERSE_PROXY_DOMAIN
        }/api/v1/partner/loginByToken`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(data);
      return data;
    } catch (e) {
      const msg = e.response.data.data;
      return { data: msg, success: false, timestamp: Date.now() };
    }
  };
  return { partnerLogin, partnerLoginByToken };
};
