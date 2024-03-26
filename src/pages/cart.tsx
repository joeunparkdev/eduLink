import Link from 'next/link';
import React from 'react';


export default function Cart() {
    return (
        <div>
            <h1>장바구니</h1>
            {/* 장바구니 상품 목록 출력 */}
            <div>
                상품 이름 - 수량 - 가격
            </div>
            <Link href="/checkout"><a>결제하기</a></Link>
        </div>
    );
};

