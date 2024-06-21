import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../../Firebase";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [loader, setLoader] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.userCredential;
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: "",
        });
      }

      toast.success("User Registered Successfully!", {
        position: "top-center",
      });
      window.location.href = "/signin";
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    } finally {
      setLoader(false)
    }
  };
  return (
    <div className="flex items-center justify-center h-[100vh] w-full">
      <div className="w-[30%] border-[2px] p-12  rounded-lg">
        <div>
          <h1 className="text-[24px] font-bold text-center mb-6">Register</h1>
          <h6 className="text-[16px] text-center font-medium mb-4">
            Already a user?
            <span className="text-[blue] underline ml-2">
              <a href="/signin">Login</a>
            </span>
          </h6>
        </div>
        <form onSubmit={handleRegister}>
          <div className="w-full mb-4">
            <input
              type="text"
              placeholder="Enter Your First Name"
              className="px-4 py-2 border-[1px] w-full rounded-full text-[15px] font-medium"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              disabled={loader}
            />
          </div>
          <div className="w-full mb-4">
            <input
              type="text"
              placeholder="Enter Your Last Name"
              className="px-4 py-2 border-[1px] w-full rounded-full text-[15px] font-medium"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              disabled={loader}
            />
          </div>
          <div className="w-full mb-4">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="px-4 py-2 border-[1px] w-full rounded-full text-[15px] font-medium"
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
              {loader ? "Loading" : "SignUp"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
