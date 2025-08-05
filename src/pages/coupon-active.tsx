import { useParams } from "react-router-dom";

export default function CouponActive() {
  const { couponId } = useParams();
  return (
    <>
      <h1>Using coupon:{couponId}</h1>
    </>
  );
}
