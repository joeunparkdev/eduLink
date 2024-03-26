import Link from 'next/link';
import React, { useState } from 'react';


export default function Products() {
    const [products, setProducts] = useState([{ id: 1, name: "상품 1", price: 10000, imageUrl: "/path/to/image" }]);

    return (
        <div>
            <h1>상품 목록</h1>
            {products.map(product => (
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <p>{product.price}원</p>
                    <img src={product.imageUrl} alt={product.name} style={{ width: "100px" }} />
                    <br />
                    <button>장바구니에 추가</button>
                </div>
            ))}
            <Link href="/cart"><a>장바구니로 이동</a></Link>
        </div>
    );
};

