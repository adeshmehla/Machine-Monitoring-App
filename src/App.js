import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import { Home } from "./component/home";
import { useSelector } from "react-redux";
import { Login } from "./component/feature/login";
import { PageNotFound } from "./component/pages/noPage/pageNotFound";

export default function App() {
  // const isAuthenticated = useSelector(state=>state.pageReducer.isAuth);
  // const isAuthenticated = localStorage.getItem('isAuthenticated');

  // if(!isAuthenticated){
  //   return  <BrowserRouter><Login /></BrowserRouter>
  // }else{

    return (
      <>
      <BrowserRouter>
  <Home/>
      </BrowserRouter>
    </>
    );
// }
}
