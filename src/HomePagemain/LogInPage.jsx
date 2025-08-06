import { useNavigate } from "react-router-dom";

const LogInPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-700 mb-2">Login</h2>
          <div className="w-20 h-1 bg-amber-400 mx-auto mb-6"></div>
          <h3 className="text-xl text-gray-600 font-serif">
            Access your GlocalshipEcommerce Account
          </h3>
        </div>
        
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-md border border-amber-400/50 bg-white/70"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md border border-amber-400/50 bg-white/70"
          />

          <button
            type="submit"
            className="mt-4 w-full px-6 py-3 
              bg-gradient-to-r from-amber-400 to-amber-500 text-black rounded-md 
              text-base font-semibold hover:from-amber-500 hover:to-amber-600 
              transition-all shadow-lg shadow-amber-400/20 hover:shadow-amber-400/30"
          >
            Login
          </button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a 
              href="/SignUpPage" 
              className="text-amber-500 hover:underline font-medium" 
              onClick={(e) => {
                e.preventDefault();
                navigate("/SignUp");
              }}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LogInPage;