export type CouponType = 'fixed' | 'percentage';

export interface Coupon {
  id: string; 
  type: CouponType;
  amount: number;
  description: string;
  expirationDate: string;
}

// 쿠폰 시스템 클래스 정의
export class CouponSystem {
  private coupons: Coupon[];

  constructor() {
    this.coupons = [];
  }

  // 쿠폰 추가 메서드
  addCoupon(coupon: Coupon) {
    this.coupons.push(coupon);
  }

  // 쿠폰 적용 메서드
  applyCoupon(originalPrice: number, couponCode: string): number {
    const coupon = this.coupons.find(c => c.id == couponCode); 
    if (!coupon) {
      throw new Error(`Coupon with code ${couponCode} not found`);
    }
  
    // 쿠폰 유형에 따라 할인 계산
    switch (coupon.type) {
      case 'fixed':
        return Math.max(originalPrice - coupon.amount, 0);
      case 'percentage':
        return originalPrice * (1 - coupon.amount / 100);
      default:
        throw new Error('Invalid coupon type');
    }
  }

  // 할인 적용 메서드
  applyDiscount(originalPrice: number, couponCode?: string): number {
    if (!couponCode) {
      this.checkForExpiringCoupons();
      return originalPrice;
    }

    return this.applyCoupon(originalPrice, couponCode);
  }

  // 만료 예정 쿠폰 확인 메서드
  private checkForExpiringCoupons() {
    const currentDate = new Date();
    const expiringCoupons = this.coupons.filter(coupon =>
      new Date(coupon.expirationDate) < currentDate
    );

    if (expiringCoupons.length > 0) {
      console.warn('You have coupons that may expire soon. Are you sure you don’t want to use them?');
    }
  }
}