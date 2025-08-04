import { useNavigate } from "react-router-dom";


const LogInPage = () => {
     const navigate = useNavigate(); 

  return(
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-amber-400 to-amber-400">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900">Login</h2>
        <p className="text-gray-600 mb-6">Access your GlocalshipEcommerce Account</p>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-md border border-amber-400/50 bg-white/70 backdrop-blur-sm"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md border border-amber-400/50 bg-white/70 backdrop-blur-sm"
          />

          <button
    type="submit"
    className="mt-4 w-full px-6 py-3 
    bg-gradient-to-r from-amber-400 to-amber-500 text-black rounded-md text-base font-semibold hover:from-amber-500 hover:to-amber-600 transition-all shadow-lg shadow-amber-400/20 hover:shadow-amber-400/30 sm:px-8 sm:py-3 sm:text-lg cursor-pointer"
      
  >
    Login
  </button>
        </form>
             <div className="text-center mt-6">
          <p className="text-sm text-gray-600 mb-2">Create Account
            <a href="/SignUpPage" className="ms-1 text-blue-500 hover:underline font-medium"  onClick={() => navigate("/SignUpPage")}>Signup</a>
          </p>
          
        </div>
      </div>
    </div>
    </>
  )
}

export default LogInPage;