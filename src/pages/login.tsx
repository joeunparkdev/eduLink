import { useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase/clientApp'; // Firebase 설정 가져오기

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential.user);
            router.push('/'); // 로그인 성공 시 홈으로 리다이렉트
        } catch (error) {
            console.error(error);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result.user);
            router.push('/'); // 구글 로그인 성공 시 홈으로 리다이렉트
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <div className="p-8 bg-card rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-primary-foreground">로그인</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-secondary-foreground">이메일:</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="mt-1 px-3 py-2 bg-input border border-border rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-secondary-foreground">비밀번호:</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="mt-1 px-3 py-2 bg-input border border-border rounded-md w-full"
                        />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">로그인</button>
                </form>
                <button onClick={handleGoogleLogin} className="mt-4 w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">구글로 로그인하기</button>
            </div>
        </div>
    );
}
