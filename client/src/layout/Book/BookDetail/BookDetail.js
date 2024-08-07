import React, { useState } from "react";
import "./style.css";
import {FaShoppingCart ,FaEdit,FaCheckSquare} from 'react-icons/fa';
import { MdDeleteForever,MdCancelPresentation } from "react-icons/md";

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
            user.cutomerID !== "admin" && (
            <div className="basket" onClick={() => addbasket(book)}>
              <FaShoppingCart size="40" >
              <i className="material-icons" >add_shopping_cart</i>
              </FaShoppingCart>
            </div>
          )}

          {
            user !==null &&
            user.cutomerID === "admin" &&
            
            
            (updatetable ? (
              <div className="edit-container">
                <div className="basket" onClick={() => handleEditBook()}>
                <FaCheckSquare size="35">
                <i class="material-icons">check_box</i>
                </FaCheckSquare>
                </div>
                <div className="basket" onClick={() => onclose()}>
                <MdCancelPresentation size="35" >
                  <i class="material-icons">cancel</i>
                </MdCancelPresentation>
                </div>
              </div>
            ) : (
              <div className="edit-container">
                  <div className="basket" onClick={() => setUpdatetable(true)}>
                  <FaEdit size="35">
                  <i class="material-icons">edit</i>
                  </FaEdit>
                  </div>
                  <div className="basket" onClick={() => deletebook(book.bookID)}>
                  <MdDeleteForever size="35">
                  <i class="material-icons">
                      delete_forever
                    </i>
                  </MdDeleteForever>
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