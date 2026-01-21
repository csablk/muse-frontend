import { useState } from "react";
import { assets } from "../assets/assets.js";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";


const Register = ({ onSwitchToLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{6,50}$/;

        if (!email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            toast.error('Please fill in all fields');
            return;
        }

        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            toast.error('Please enter a valid email address');
            return;
        }

        if (!passwordRegex.test(password)) {
            setError(
                'Password must be 6–50 characters long and contain only English letters and numbers'
            );
            toast.error(
                'Password must be 6–50 characters long and contain only English letters and numbers'
            );
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const result = await register(email, password);
            if (result.success) {
                toast.success(result.message);
                onSwitchToLogin();
            } else {
                toast.error(result.message);
                setError(result.message);
            }
        } catch (err) {
            toast.error('An unexpected error occurred. Please try again later');
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-purple-700 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                {/*Header*/}
                <div className="text-center">
                    <div className="flex items-center justify-center mb-6">
                        <div className="flex items-center justify-center">
                            <h1 className="text-6xl font-light text-white">Muse</h1>
                        </div>
                    </div>
                    <h2 className="text-1xl font-bold text-white mb-2">Join Muse</h2>
                    <p className="text-gray-300">Create your account to start listening</p>
                </div>
                {/* Register form */}
                <div className="bg-gray-900/50 backdrop-blug-lg rounded-2xl p-8 shadow-2xl">
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {/*Email field */}
                        <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                            Email address
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            autoComplete="email"
                            required
                            className="block w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="muse@gmail.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        {/*Password field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                autoComplete="new-password"
                                required
                                className="block w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800/50 text-white focus:border-none  placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="**********"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        {/*Confirm Password field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-2">Confirm password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                autoComplete="new-password"
                                required
                                className="block w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800/50 text-white focus:border-none  placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="**********"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        {/* Submit button */}
                        <button disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 cursor-pointer">{loading ? (<div className="flex items-center"><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>Creating account...</div>) : ('Create Account')}</button>
                    </form>

                    {/* Switch to login */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-400">
                            Already have an account?
                            <button onClick={onSwitchToLogin} className="cursor-pointer ml-2 text-blue-500 hover:text-blue-300 font-medium transition-colors">
                                Sign in here
                            </button>
                        </p>
                    </div>

                    {/*Terms and conditions*/}
                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-500">
                            By creating an account, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;