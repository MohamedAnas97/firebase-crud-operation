import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../Firebase";
import SignInwithGoogle from "./signin-auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
      window.location.href = "/";
    } catch (error) {
      console.log(error.message);

      toast.error(error.message, {
        position: "bottom-center",
      });
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="flex items-center justify-center h-[100vh] w-full">
      <div className="w-[30%] border-[2px] p-12 rounded-lg">
        <div>
          <h1 className="text-[24px] font-bold text-center mb-6">Sign In</h1>
          <h6 className="text-[16px] text-center font-medium mb-4">
            New user?{" "}
            <span className="text-[blue] underline ml-2">
              <a href="/signup">Create an account</a>
            </span>
          </h6>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="w-full mb-4">
            <input
              type="email"
              className="px-4 py-2 border-[1px] w-full rounded-full text-[15px] font-medium"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loader}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter Your Password"
              className="px-4 py-2 border-[1px] w-full rounded-full text-[15px] font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loader}
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              name="submit"
              className="w-full py-2 bg-[#2020e5] text-[#fff] rounded-full text-[15px] font-medium"
            >
              {loader ? "Loading...." : "Login"}
            </button>
            <ToastContainer />
          </div>
        </form>
        <SignInwithGoogle />
      </div>
    </div>
  );
};
export default Login;
