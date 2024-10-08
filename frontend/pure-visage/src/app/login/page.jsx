import { useState } from 'react';
import { supabase } from '../frontend/pure-visage/src/app/login';

export default function AuthPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup

    const handleAuth = async () => {
        try {
            if (isLogin) {
                // Handle Login
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                alert('Login successful!');
            } else {
                // Handle Signup
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                alert('Signup successful! Please check your email to confirm your account.');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleAuth}>{isLogin ? 'Login' : 'Sign Up'}</button>
            {error && <p>{error}</p>}
            <p>
                {isLogin ? 'Don’t have an account?' : 'Already have an account?'}
                <button onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Sign Up' : 'Login'}
                </button>
            </p>
        </div>
    );
}
