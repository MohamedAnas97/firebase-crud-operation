import { useEffect, useState } from "react";
import { auth, db } from "../../Firebase";
import { doc, getDoc } from "firebase/firestore";
const Banner = () => {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      setUserDetails(user);
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/signin";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  return (
    <div className="py-4 border-b-[2px] bg-[#fff]">
      <div className="flex justify-between  mx-[3%]">
        <div className="flex items-center">
          <h3 className="text-[20px] font-semibold">
            Welcome to{" "}
            <span className="italic text-[#26a1f4]">
              {userDetails?.displayName || "Guest"}{" "}
            </span>{" "}
          </h3>
        </div>
        <div className="flex ">
          <div className="flex justify-center ">
            <img
              src={
                userDetails?.photoURL || (
                  <img
                    src={require("../../assets/user.png")}
                    alt=""
                    className="h-[40px] w-[40px]"
                  />
                )
              }
              alt=""
              className="h-[40px] rounded-full"
            />
          </div>
          <div className="ml-2 flex items-center">
            <button
              onClick={handleLogout}
              className="px-4 py-1 border-[1px] border-[#ad0b0b] rounded-full text-[#ad0b0b] font-medium cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
