import React, { useState } from "react";
import "./style.css";

const BookInsert = props => {

  const {  insertbook } = props;
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [url, setUrl] = useState('');
 
  
  const handleInsertBook = () => {
        const item ={
            bookName : bookName,
            author : author,
            stock : stock,
            price : price,
            url : url
        }
       insertbook(item);
      console.log(item);
        
  }

  return (
   
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
                    <input
                      type="text"
                      value={bookName}
                      onChange={e => setBookName(e.target.value)}
                    />
                </td>
              </tr>
              <tr>
                <th>작가</th>
                <td>
                  
                    <input
                      type="text"
                      value={author}
                      onChange={e => setAuthor(e.target.value)}
                    />
                 
                </td>
              </tr>
              <tr>
                <th>가격</th>
                <td>
                    <input
                      type="text"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                    />
                </td>
              </tr>
              <tr>
                <th>재고</th>
                <td>
                    <input
                      type="text"
                      value={stock}
                      onChange={e => setStock(e.target.value)}
                    />
                 
                </td>
              </tr>
                <tr>
                  <th>이미지</th>
                  <td>
                      <input
                        type="text"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                      />
                  
                  </td>
                </tr>
              
            </tbody>
          </table>
        
         <div className="edit-container">
            <div className="basket" onClick={() => handleInsertBook()}>
                    <i class="material-icons">check_box</i>
            </div>    
        </div>
      </div>
      </div>
    
  );
 
};
BookInsert.defaultProps = {
  book: null,
  insertbook : () =>{}
 
};



export default BookInsert;