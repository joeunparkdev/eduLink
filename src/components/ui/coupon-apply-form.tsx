import React, { useState } from 'react';
import { CouponSystem } from '../../lib/coupons';
import styles from '../../styles/coupon-apply-form.module.css'

interface CouponApplyFormProps {
  couponSystem: CouponSystem;
  onApply: (discountedPrice: number) => void;
}

const CouponApplyForm: React.FC<CouponApplyFormProps> = ({ couponSystem, onApply }) => {
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = () => {
    // 쿠폰 시스템으로부터 할인된 가격을 받아옴 (예시로 20000원을 가정)
    const discountedPrice = couponSystem.applyDiscount(20000, parseInt(couponCode));
    onApply(discountedPrice);
  };

  return (
    <div className={styles.couponFormContainer}>
      <input
        type="text"
        placeholder="쿠폰 코드 입력"
        className={styles.couponInput}
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
      />
      <button className={styles.couponButton} onClick={handleApplyCoupon}>적용</button>
    </div>
  );
};

export default CouponApplyForm;
