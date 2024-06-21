import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../../Firebase";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
const SignInwithGoogle = () => {
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      const user = result?.user;
      if (result.user) {
        await setDoc(doc(db, "Users", user?.uid), {
          email: user?.email,
          firstName: user?.displayName,
          photo: user?.photoURL,
        });
        toast.success("User logged in Successfully", {
          position: "top-center",
        });
        window.location.href = "/";
      }
    });
  };
  return (
    <div>
      <p className="text-center my-6">-- or continue with --</p>
      <div
        className="flex justify-center mt-4 border-[1px] py-1 rounded-full cursor-pointer"
        onClick={googleLogin}
      >
        <img
          src={require("../../assets/google.png")}
          alt=""
          className="h-[28px] w-fit  "
        />
      </div>
    </div>
  );
};

export default SignInwithGoogle;
