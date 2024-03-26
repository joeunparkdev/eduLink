import React, { useState } from 'react';
import CouponApplyForm from '../components/ui/coupon-apply-form';
import { CouponSystem } from '../lib/coupons';

const couponSystem = new CouponSystem();
// 샘플 쿠폰 데이터를 추가합니다.
couponSystem.addCoupon({
  id: 1,
  type: 'fixed',
  amount: 5000,
  description: '5,000원 할인 쿠폰',
  expirationDate: '2024-12-31'
});
couponSystem.addCoupon({
  id: 2,
  type: 'percentage',
  amount: 30,
  description: '30% 할인 쿠폰',
  expirationDate: '2024-12-31'
});


export default function Checkout() {
  const [finalPrice, setFinalPrice] = useState(20000); // 주문 전체 금액을 상태로 관리

  const handleCouponApplied = (discountedPrice: number) => {
    setFinalPrice(discountedPrice); // 할인된 가격으로 상태 업데이트
  };

  return (
    <div>
      <h1>결제 페이지</h1>
      <CouponApplyForm couponSystem={couponSystem} onApply={handleCouponApplied} />
      <p>최종 결제 금액: {finalPrice.toLocaleString()}원</p>
      {/* 결제 관련 다른 컴포넌트들도 여기에 추가될 수 있습니다. */}
    </div>
  );
};
