import Main_Api from "../Auth_Interceptor/Main_Api";

export const PublisherLogin = (request) => {
  return Main_Api.post("auth/pub/login", request);
};

export const PublisherRegister = (request) => {
  return Main_Api.post("auth/pub/register", request);
};

export const Upload_book = (request) => {
  if (request?.aiChat) {
    return Main_Api.post("files/pub/upload_book3", request, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } else {
    return Main_Api.post("files/pub/upload_book", request, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
};

export const Get_Books = () => {
  return Main_Api.get("book/pub/get_all_books");
};
export const Update_book = (request) => {
  return Main_Api.put("files/pub/update_book/" + request?.book_id, request, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const Add_Category = (request) => {
  return Main_Api.post("book/pub/add_category", request);
};

export const Get_Category = () => {
  return Main_Api.get("book/pub/get_categories");
};

export const GetBook_by_Category = (id) => {
  return Main_Api.get("book/pub/get_books_by_cat/" + id);
};

export const GetBook_by_id = (id) => {
  return Main_Api.get("book/pub/get_book/" + id);
};

export const deleteBook = (id) => {
  return Main_Api.delete("book/pub/delete_book/" + id);
};

export const Add_Subscriber = (request) => {
  return Main_Api.post("subscribe/publisher/add_subscriber", request);
};
