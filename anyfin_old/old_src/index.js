// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import "bootstrap/dist/css/bootstrap.css";
// import { Provider } from "react-redux";
// import store from "./redux/store";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { AuthProvider } from "./components/context/AuthProvider";

// ReactDOM.render(
//   <Provider store={store}>
//     <React.StrictMode>
//       {/* <AuthProvider> */}
//         <BrowserRouter basename="/">
//           <Routes>
//             <Route path="/*" element={<App />} />
//           </Routes>
//         </BrowserRouter>
//       {/* </AuthProvider> */}
//     </React.StrictMode>
//   </Provider>,
//   document.getElementById("root")
// );

import React from "react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ApiProvider from "./ApiProvider";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter basename="/">
        <ApiProvider>
          <Routes>``
            <Route path="/*" element={<App />} />
          </Routes>
        </ApiProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
