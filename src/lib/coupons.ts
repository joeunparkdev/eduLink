export type CouponType = 'fixed' | 'percentage';

export interface Coupon {
  id: number;
  type: CouponType;
  amount: number;
  description: string;
  expirationDate: string;
}

export class CouponSystem {
  private coupons: Coupon[];

  constructor() {
    this.coupons = [];
  }

  addCoupon(coupon: Coupon) {
    this.coupons.push(coupon);
  }

  applyDiscount(originalPrice: number, couponId?: number): number {
    if (!couponId) {
      this.checkForExpiringCoupons();
      return originalPrice;
    }

    const coupon = this.coupons.find(c => c.id === couponId);
    if (!coupon) {
      throw new Error('Coupon not found');
    }

    switch (coupon.type) {
      case 'fixed':
        return Math.max(originalPrice - coupon.amount, 0);
      case 'percentage':
        return originalPrice * (1 - coupon.amount / 100);
      default:
        throw new Error('Invalid coupon type');
    }
  }

  private checkForExpiringCoupons() {
    const currentDate = new Date();
    const expiringCoupons = this.coupons.filter(coupon => 
      new Date(coupon.expirationDate) < currentDate && 
      new Date(coupon.expirationDate) > currentDate
    );

    if (expiringCoupons.length > 0) {
      // 알림 메시지를 표시하는 로직
      console.warn('You have coupons that may expire soon. Are you sure you don’t want to use them?');
    }
  }
}
