import { CouponSystem } from '@/lib/coupons';
import React, { useState } from 'react';
import styles from '../../styles/coupon-apply-form.module.css';

interface CouponApplyFormProps {
  couponSystem: CouponSystem;
  onApply: (couponCode: string) => void; 
}

const CouponApplyForm: React.FC<CouponApplyFormProps> = ({ couponSystem, onApply }) => {
  const [couponCode, setCouponCode] = useState<string>('');

  const handleApplyCoupon = () => {
    onApply(couponCode); 
  };

  return (
    <div className={styles.couponFormContainer}>
      <input
        type="text"
        placeholder="Enter coupon code"
        className={styles.couponInput}
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
      />
      <button className={styles.couponButton} onClick={handleApplyCoupon}>Apply</button>
    </div>
  );
};

export default CouponApplyForm;
