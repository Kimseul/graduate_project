import React, { useState } from "react";
import "./style.css";

const BookDetail = (props) => {
  const { book, user } = props;

  const { addbasket, editbook, onclose , deletebook } = props;
  const [bookName, setBookName] = useState(book.bookName);
  const [author, setAuthor] = useState(book.author);
  const [stock, setStock] = useState(book.stock);
  const [price, setPrice] = useState(book.price);
  const [url, setUrl] = useState(book.url);
  const [updatetable, setUpdatetable] = useState(false);

  
  const handleEditBook = () => {
        const item ={
            bookID :book.bookID,
            bookName : bookName,
            author : author,
            stock : stock,
            price : price,
            url : url
        }
        editbook(item);
        setUpdatetable(false);
        
  }
  

  return (
    book !== null && (
      <div className="book-detail-container">
        <div className="book-detail-img">
          <img src={url} alt={bookName} />
        </div>
        <div className="book-detail-content">
          <table>
            <tbody>
              <tr>
                <th>도서명</th>
                <td>
                  {updatetable ? (
                    <input
                      type="text"
                      value={bookName}
                      onChange={e => setBookName(e.target.value)}
                    />
                  ) : (
                    bookName
                  )}
                </td>
              </tr>
              <tr>
                <th>작가</th>
                <td>
                  {updatetable ? (
                    <input
                      type="text"
                      value={author}
                      onChange={e => setAuthor(e.target.value)}
                    />
                  ) : (
                    author
                  )}
                </td>
              </tr>
              <tr>
                <th>가격</th>
                <td>
                  {updatetable ? (
                    <input
                      type="text"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                    />
                  ) : (
                    price
                  )}
                </td>
              </tr>
              <tr>
                <th>재고</th>
                <td>
                  {updatetable ? (
                    <input
                      type="text"
                      value={stock}
                      onChange={e => setStock(e.target.value)}
                    />
                  ) : (
                    stock
                  )}
                </td>
              </tr>

              {updatetable && (
                <tr>
                  <th>사진</th>
                  <td>
                    {updatetable ? (
                      <input
                        type="text"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                      />
                    ) : (
                        url
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {
            user !== null &&
            user.ID !== "admin" && (
            <div className="basket" onClick={() => addbasket(book)}>
              <i className="material-icons">add_shopping_cart</i>
            </div>
          )}

          {
            user !==null &&
            user.ID === "admin" &&
            
            
            (updatetable ? (
              <div className="edit-container">
                <div className="basket" onClick={() => handleEditBook()}>
                    <i class="material-icons">check_box</i>
                </div>
                <div className="basket" onClick={() => onclose()}>
                    <i class="material-icons">cancel</i>
                </div>
              </div>
            ) : (
              <div className="edit-container">
                  <div className="basket" onClick={() => setUpdatetable(true)}>
                    <i class="material-icons">edit</i>
                  </div>
                  <div className="basket" onClick={() => deletebook(book.bookID)}>
                    <i class="material-icons">
                      delete_forever
                    </i>
                  </div>
                </div>
            ))}
        </div>
      </div>
    )
  );
};

BookDetail.defaultProps = {
  book: null,
  addbasket: item => {
    alert(item);
  },
  editbook: () => {},
  user: { id: "admin" }
};



export default BookDetail;