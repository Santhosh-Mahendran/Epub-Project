import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import Auth from "./Components/Authentication/Auth";
import Library from "./Components/Layout/Publisher/Library/Library";
import Report from "./Components/Layout/Publisher/Report/Report";
import UploadFile from "./Components/Layout/Publisher/UploadFile/UploadFile";
import BookDetail from "./Components/Layout/Publisher/Library/BookDetail";
import UserDashboard from "./Components/Layout/User/Dashboard/UserDashboard";
import ExploreBook from "./Components/Layout/User/ExploreBook/ExploreBook";
import ExploreBookDetail from "./Components/Layout/User/ExploreBook/ExploreBookDetail";
import UserDetail from "./Components/Layout/User/UserDetails/UserDetail";
import Wishlist from "./Components/Layout/User/Library/Wishlist";
import UserLibrary from "./Components/Layout/User/Library/UserLibrary";
import { ToastContainer } from "react-toastify";
import OrderSummary from "./Components/Layout/User/Library/OrderSummary";
import Forgotpswd from "./Components/Authentication/Forgotpswd/Forgotpswd";
import OrderPlaced from "./Components/Layout/User/Library/OrderPlaced";
import { useSelector } from "react-redux";
import UserLayout from "./Components/Layout/Layout/UserLayout";
import PublisherLayout from "./Components/Layout/Layout/PublisherLayout";
import PublisherBook from "./Components/Layout/User/ExploreBook/PublisherBook";
import ScrollToTop from "./Components/Core-Components/ScrollToTop";
import PubEpubReader from "./Components/Layout/Publisher/Reader/PubEpubReader";
import UserEpubReader from "./Components/Layout/User/Reader/UserEpubReader";
import Cart from "./Components/Layout/User/Library/Cart";
import PublishDashboard from "./Components/Layout/User/PublisherProfile/PublishDashboard";
import ReaderAuth from "./Components/Authentication/UserAuth";
import PublisherAuth from "./Components/Authentication/PublisherAuth";
import PubProfile from "./Components/Layout/Publisher/PubProfile/PubProfile";

function App() {
  const { PubLoginStatus } = useSelector((state) => state.PublisherLogin);
  const { UserLoginStatus } = useSelector((state) => state?.UserLogin);
  return (
    <>
      <BrowserRouter>
        <ToastContainer toastClassName="custom-toast" />
        <ScrollToTop />
        <Routes>
          <Route element={<Auth />}>
            <Route index element={<ReaderAuth />} />
            <Route path="/auth/publisher" element={<PublisherAuth />} />
          </Route>
          <Route path="/resetpassword" element={<Forgotpswd />} />
          {PubLoginStatus ? (
            <Route element={<PublisherLayout />}>
              {/* publisher */}
              <Route path="/publisher/dashboard/" element={<Report />} />
              <Route
                path="/publisher/dashboard/library"
                element={<Library />}
              />
              <Route
                path="/publisher/dashboard/upload/"
                element={<UploadFile />}
              />
              <Route
                path="/publisher/dashboard/library/book"
                element={<BookDetail />}
              />
              <Route path="/publisher/profile" element={<PubProfile />} />
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}
          {PubLoginStatus ? (
            <Route path="/publisher/bookpreview" element={<PubEpubReader />} />
          ) : (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}

          {/* User */}

          {UserLoginStatus ? (
            <Route element={<UserLayout />}>
              <Route path="/reader/dashboard/" element={<UserDashboard />} />
              <Route
                path="/reader/dashboard/explore"
                element={<ExploreBook />}
              />
              <Route
                path="/reader/dashboard/explore/book"
                element={<ExploreBookDetail />}
              />
              <Route path="/reader/dashboard/detail/*" element={<UserDetail />}>
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="library" element={<UserLibrary />} />
                <Route path="order" element={<Cart />} />
              </Route>
              <Route
                path="/reader/dashboard/detail/order/summary"
                element={<OrderSummary />}
              />
              <Route
                path="/reader/dashboard/detail/order/summary/orderplaced"
                element={<OrderPlaced />}
              />
              <Route
                path="/reader/publisherDetails"
                element={<PublisherBook />}
              />
              <Route
                path="/reader/publisher/Profile/"
                element={<PublishDashboard />}
              />
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}
          {UserLoginStatus || true ? (
            <Route path="/reader/bookpreview" element={<UserEpubReader />} />
          ) : (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
