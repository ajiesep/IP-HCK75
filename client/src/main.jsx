import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux"; // Import Provider from react-redux
import router from "./routers/index.jsx"; // Assuming this contains your routes
import { store } from "./store/store.js"; // Import your Redux store
import "./index.css";
import axios from "axios";

// Set default authorization header
axios.defaults.headers.common["Authorization"] = `Bearer ${
  import.meta.env.VITE_ACCESS_TOKEN
}`;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {" "}
      {/* Wrap your app with the Provider */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
