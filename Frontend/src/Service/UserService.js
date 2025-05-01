import Main_Api from "../Auth_Interceptor/Main_Api";

export const UserLogin = (request) => {
  return Main_Api.post("auth/reader/login", request);
};

export const UserRegister = (request) => {
  return Main_Api.post("auth/reader/register", request);
};

export const Purchase_book = (request) => {
  return Main_Api.post("book/reader/purchase_book", request);
};
export const Get_AllUser_Book = () => {
  return Main_Api.get("book/reader/get_all_books");
};

export const Get_user_BookbyId = (request) => {
  return Main_Api.get("book/reader/get_book/" + request);
};

export const Get_bookby_Cat = (request) => {
  return Main_Api.get("book/reader/get_books_by_cat/" + request);
};

export const Get_Purchasedbook = () => {
  return Main_Api.get("book/reader/get_purchased_books");
};

export const Add_to_Cart = (request) => {
  return Main_Api.post("book/reader/add_cart", request);
};

export const Get_CartItem = () => {
  return Main_Api.get("book/reader/get_cart");
};

export const Remove_from_Cart = (request) => {
  return Main_Api.delete("book/reader/delete_cart/" + request);
};

export const Add_to_Wishlist = (request) => {
  return Main_Api.post("book/reader/add_wishlist", request);
};

export const Get_WishlistItem = () => {
  return Main_Api.get("book/reader/get_wishlist");
};

export const Remove_from_Wishlist = (request) => {
  return Main_Api.delete("book/reader/delete_wishlist/" + request);
};

export const Get_ReaderSub = () => {
  return Main_Api.get("subscribe/reader/subscriptions");
};

export const Add_sub_book = (request) => {
  return Main_Api.post("subscribe/reader/add_sub_book", request);
};

//React-Reader

export const Add_hightlight = (request) => {
  return Main_Api.post("book/reader/add_highlight", request);
};

export const Get_hightlight = (request) => {
  return Main_Api.get("book/reader/get_highlights/" + request);
};
export const Add_Notes = (request) => {
  return Main_Api.post("book/reader/add_note", request);
};

export const Get_Notes = (request) => {
  return Main_Api.get("book/reader/get_notes/" + request);
};

export const Upload_progress = (request) => {
  return Main_Api.put("book/reader/update_progress", request);
};

export const Get_progress = (request) => {
  return Main_Api.get("book/reader/get_progress/" + request);
};

export const Chat_with_Ai = (request) => {
  return Main_Api.post("files/ask2", request);
  // return axios.post(
  //   "https://65602acf83aba11d99d05511.mockapi.io/user",
  //   // request
  //   { text: "Response Given by Ai For Given Question", sender: "bot" }
  // );
};
