import axios from "axios";

export const useCoupon = () => {
  const redeemCoupon = async (ucid: string) => {
    try {
      const token = localStorage.getItem("partnerId");
      if (!token) {
        return { data: "Bad Request", success: false, timestamp: Date.now() };
        return;
      }
      const { data } = await axios.post(
        `${import.meta.env
          .VITE_REVERSE_PROXY_DOMAIN!}/api/v1/partner/redeemCouponByPartner`,
        { ucid },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (e) {
      const msg = e.response.data.data;
      return { data: msg, success: false, timestamp: Date.now() };
    }
  };
  return { redeemCoupon };
};
