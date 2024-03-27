// React와 관련된 라이브러리 임포트
import React, { useState, useEffect } from 'react';

// 쿠폰 시스템 및 쿠폰 적용 폼 컴포넌트 임포트
import CouponApplyForm from '../components/ui/coupon-apply-form';
import { CouponSystem } from '../lib/coupons';

// 스타일 및 CSS 임포트
import styles from '../styles/Checkout.module.css';

// 쿠폰 시스템 인스턴스 생성
const couponSystem = new CouponSystem();

// 쿠폰 시스템에 샘플 쿠폰 추가
couponSystem.addCoupon({
  id: '20000',
  type: 'fixed',
  amount: 20000,
  description: '20,000원 할인 쿠폰',
  expirationDate: '2024-12-31'
});
couponSystem.addCoupon({
  id: '2',
  type: 'percentage',
  amount: 30,
  description: '30% 할인 쿠폰',
  expirationDate: '2024-12-31'
});

// 주문 및 결제 페이지 컴포넌트 정의
export default function Checkout() {
  // 상태 변수 정의
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: '', 
  });
  const [finalPrice, setFinalPrice] = useState<number>(20000);
  const [productCount, setProductCount] = useState<number>(1);
  const [points, setPoints] = useState<number>(3000);
  const [pointsUsed, setPointsUsed] = useState<number>(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string>('');

  // 컴포넌트 마운트 시 쿠폰 적용
  useEffect(() => {
    const bestCoupon = couponSystem.applyDiscount(finalPrice); // 최적의 쿠폰을 찾아 할인 적용
    console.log('Best Coupon:', bestCoupon);
    if (bestCoupon) {
      applyCoupon(bestCoupon);
    }
  }, []);

  // 쿠폰 적용 함수
  const applyCoupon = (couponCode: string | number) => {
    const code = typeof couponCode === 'number' ? couponCode.toString() : couponCode;
    const discountedPrice = couponSystem.applyDiscount(finalPrice, code); // 쿠폰 코드를 받아 할인 적용
    setFinalPrice(discountedPrice);
    setAppliedCoupon(code.toString());
  };

  // 쿠폰 적용 이벤트 핸들러
  const handleCouponApplied = (couponCode: string) => {
    const couponId = parseInt(couponCode); // 쿠폰 코드를 숫자로 변환
    applyCoupon(couponId); // 수정된 쿠폰 코드를 적용 함수에 전달
  };

  // 입력 값 변경 이벤트 핸들러
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  // 포인트 변경 이벤트 핸들러
  const handlePointsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const usedPoints = parseInt(event.target.value, 10) || 0;
    setPointsUsed(usedPoints <= points ? usedPoints : points);
  };

  // 포인트로 최종 가격 계산
  const calculateTotalWithPoints = () => {
    const totalPrice = (finalPrice - pointsUsed) * productCount;
    return totalPrice >= 0 ? totalPrice : 0;
  };

  // 결제 처리 함수
  const handleCheckout = async () => {
    if (!customerInfo.paymentMethod) {
      alert('결제 방법을 선택해주세요.');
      return;
    }

    const paymentData = {
      customerInfo,
      finalPrice: calculateTotalWithPoints(),
      productCount,
      pointsUsed,
    };

    try {
      // 결제 처리 API 호출
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error('결제 처리 실패');
      }

      const result = await response.json();
      console.log('결제 성공:', result);
      alert('결제가 성공적으로 처리되었습니다.');
    } catch (error) {
      console.error('결제 처리 중 오류 발생:', error);
      alert('결제 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
    };
    
    return (
    <div className={styles.checkoutContainer}>
    <div className={styles.paymentSection}>
    <select name="paymentMethod" value={customerInfo.paymentMethod} onChange={handleInputChange} className={styles.selectField}>
    <option value="">결제 방법 선택</option>
    <option value="creditCard">신용카드</option>
    <option value="paypal">페이팔</option>
    <option value="bankTransfer">은행 송금</option>
    </select>
    </div>
    <CouponApplyForm couponSystem={couponSystem} onApply={handleCouponApplied} />
    <div className={styles.customerInfoSection}>
    <input type="text" name="address" value={customerInfo.address} onChange={handleInputChange} className={styles.inputField} placeholder="주소" />
    </div>
    <div className={styles.pointsSection}>
    <input type="number" name="points" value={pointsUsed} onChange={handlePointsChange} className={styles.inputField} placeholder="사용 포인트" />
    <p>사용 가능 포인트: {points.toLocaleString()}원</p>
    <button onClick={() => setPointsUsed(points)} className={styles.pointsButton}>모든 포인트 사용</button>
    </div>
    <button onClick={handleCheckout} className={styles.checkoutButton}>결제하기</button>
    </div>
    );
    }