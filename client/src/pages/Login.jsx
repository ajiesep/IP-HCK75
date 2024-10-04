import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  async function fetchLoginGoogle(response) {
    console.log("Google response:", response);

    try {
      const { data } = await axios({
        method: "POST",
        url: "http://16.171.19.214/google-login",
        headers: {
          google_token: response.credential,
        },
      });
      console.log("Backend response:", data);
      localStorage.setItem("token", data.access_token);
      navigate("/");
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
    }
  }

  const handleLoginGoogle = async (response) => {
    fetchLoginGoogle(response);
  };

  return (
    <div>
      <div
        className="flex items-center justify-center h-full min-h-screen p-4"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2918&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="justify-center w-full max-w-md mx-auto">
          <form className="p-8 text-white shadow-lg bg-opacity-80 bg-zinc-900 rounded-2xl backdrop-blur-md">
            <div className="mb-8 text-center">
              <h3 className="text-3xl font-extrabold">Sign in</h3>
              <p className="mt-2 text-zinc-400">
                Welcome back! Please sign in to your account.
              </p>
            </div>
            <hr className="my-6 border-gray-600" />
            <div className="flex justify-center mb-6">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  handleLoginGoogle(credentialResponse);
                }}
                onError={() => {
                  console.log("Login failed");
                }}
              />
            </div>
            <div className="text-center">
              <p className="text-zinc-500">or</p>
              <button
                type="button"
                className="px-6 py-3 mt-4 text-white transition duration-300 bg-teal-500 rounded-full shadow-md hover:bg-teal-400"
              >
                Login with Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
