import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import 'antd/dist/reset.css';
import App from "./App";
import {store} from './component/redux/store';
import {Provider} from 'react-redux';
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>
);
