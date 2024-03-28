import React, { useState, useEffect } from 'react';
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk';
import couponSystem from '../lib/coupons';
import { useRouter } from 'next/router';

const Checkout = () => {
  const [paymentWidget, setPaymentWidget] = useState(null);
  const [price, setPrice] = useState(18000);
  const [shippingFee, setShippingFee] = useState(2500);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: '',
  });
  const [finalPrice, setFinalPrice] = useState(20000);
  const [points, setPoints] = useState(0);
  const [pointsUsed, setPointsUsed] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPaymentWidget = async () => {
      try {
        const loadedWidget = await loadPaymentWidget(widgetClientKey, customerKey);
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error('Error fetching payment widget:', error);
      }
    };
    fetchPaymentWidget();
  }, []);

  useEffect(() => {
    if (!paymentWidget) return;
    const totalPrice = price + shippingFee;
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      '#payment-methods-widget',
      { value: totalPrice },
      { variantKey: 'DEFAULT' }
    );
  }, [paymentWidget, price, shippingFee]);

  const applyCoupon = () => {
    const discountAmount = couponSystem.getCouponDiscountAmount(couponCode); // 쿠폰 할인 금액 계산
    const discountedPrice = finalPrice - discountAmount;
    setFinalPrice(discountedPrice);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handlePointsChange = (event) => {
    const usedPoints = parseInt(event.target.value, 10) || 0;
    setPointsUsed(usedPoints <= points ? usedPoints : points);
  };

  const calculateTotalWithPoints = () => {
    const totalPrice = finalPrice - pointsUsed;
    return totalPrice >= 0 ? totalPrice : 0;
  };

  const handleUseAllPoints = () => {
    setPointsUsed(points); // 전체 포인트 사용
  };

  const handleCouponChange = (event) => {
    setCouponCode(event.target.value);
  };

  const handleApplyCoupon = () => {
    applyCoupon();
  };

  const handleTossPayment = () => {
    const orderItems = ["상품1", "상품2", "상품3"]; // 테스트용 주문 항목

    router.push({
      pathname: '/payment',
      query: {
        orderItems: JSON.stringify(orderItems),
        customerInfo: JSON.stringify(customerInfo),
        couponCode: couponCode,
      },
    });
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1">
          <div className="mb-4">
            <h2 className="text-xl font-bold">상품 정보</h2>
            <img className="w-32 h-32 object-cover rounded" src="/path-to-your-image.jpg" alt="Product" />
            <p className="text-gray-600">{`${price.toLocaleString()}원`}</p>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="name">이름</label>
            <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="name" type="text" name="name" value={customerInfo.name} onChange={handleInputChange} placeholder="홍길동" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="phone">연락처</label>
            <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="phone" type="text" name="phone" value={customerInfo.phone} onChange={handleInputChange} placeholder="010-1234-5678" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">이메일</label>
            <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="email" type="email" name="email" value={customerInfo.email} onChange={handleInputChange} placeholder="user@example.com" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="address">배송 주소</label>
            <textarea className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="address" name="address" value={customerInfo.address} onChange={handleInputChange} placeholder="서울시 강남구 역삼동 123-45"></textarea>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1">
          <div className="mb-4">
            <p>
              포인트로 결제: {pointsUsed.toLocaleString()}원 
            </p>
            <p>
             사용 가능 포인트: {points.toLocaleString()}원
            </p>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="coupon">쿠폰 코드</label>
            <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="coupon" type="text" value={couponCode} onChange={handleCouponChange} placeholder="쿠폰 코드를 입력하세요" />
            <button onClick={handleApplyCoupon} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
              적용
            </button>
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-4">
            <button onClick={handleTossPayment} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              결제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
