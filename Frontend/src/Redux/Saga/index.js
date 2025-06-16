import { all } from "redux-saga/effects";
import watchPublisherLogin from "./PublisherSaga/PLoginSaga";
import watchPublisherRegister from "./PublisherSaga/PRegisterSaga";
import watchPubBook from "./PublisherSaga/BookSaga";
import watchCategory from "./PublisherSaga/Category";
import watchUserLogin from "./UserSaga/ULoginSaga";
import watchUserRegister from "./UserSaga/URegSaga";
import watchPurchaseBook from "./UserSaga/PurchaseBookSaga";
import WatchCart from "./UserSaga/CartBookSaga";
import WatchWishlist from "./UserSaga/WishlistBookSaga";
import watchUserBook from "./UserSaga/UserBookSaga";
import watchPreviewBook from "./UserSaga/PreviewBookSaga";
import watchSubscibeBook from "./UserSaga/SubscriptionSaga";
import watchAddSubsciber from "./PublisherSaga/SubscriberSaga";
import watchChatRequest from "./UserSaga/ChatSaga";
import watchPubDetails from "./PublisherSaga/PubDetailSaga";

function* RootSaga() {
  yield all([
    watchPublisherLogin(),
    watchPublisherRegister(),
    watchPubBook(),
    watchCategory(),
    watchAddSubsciber(),
    watchPubDetails(),

    watchUserLogin(),
    watchUserRegister(),
    watchPurchaseBook(),
    WatchCart(),
    WatchWishlist(),
    watchUserBook(),
    watchPreviewBook(),
    watchSubscibeBook(),
    watchChatRequest()
  ]);
}
export default RootSaga;
