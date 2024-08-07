import React ,{useState}from 'react'
import Modal from '../../componmet/Modal/Modal';
import BookDetail from '../Book/BookDetail/BookDetail';
import BookInsert from '../Book/BookDetail/BookInsert';


const MainPresenter = (props) => {
    const { user, bookList ,updatebook,deletebook ,insertbook,insertbasket} = props;
    
    const [detailModal, setdetailModal] = useState(false)
    const [bookdetail, setBookdetail] = useState(null)
    const [bookinsertModal,setBookinsertModal] = useState(false)
   

    const handlebookdetail = (book = null) =>{
        setBookdetail(book)
        setdetailModal(true);
    }
    
    const list = bookList.map(item =>(
        <tr onClick={() =>{handlebookdetail(item)}}>
            <td><img src ={item.url} alt={item.bookname} width="100"/></td>
            <td>{item.bookID}</td>
            <td>{item.bookName}</td>
            <td>{item.author}</td>
            <td>{item.stock}</td>
            <td>{item.price}</td>
        </tr>
    ))
    return (
       
        <div className="container">
        <div style={{width :'95%', height :'100%', margin : '0 auto', padding :'2.5% 0' }}>
            <h3>도서</h3>
            <hr/>
            <div>
                <table style={{width:'100%'}}>
                    <thead>
                        <tr >
                            <th className="table-head">이미지</th>
                            <th className="table-head">도서 코드</th>
                            <th className="table-head">도서명</th>
                            <th className="table-head">작가</th>
                            <th className="table-head">재고</th>
                            <th className="table-head">가격</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
                <Modal active ={detailModal} onCancel = {setdetailModal}>
                      <BookDetail  user={user} book ={bookdetail} editbook={updatebook} deletebook={deletebook} onclose ={setdetailModal} insertbasket={insertbasket} 
                     />
                </Modal>
               <input type="button" value="도서 등록" onClick={() => setBookinsertModal(true)}/>
                    <Modal active ={bookinsertModal}  onCancel = {setBookinsertModal}>
                        <BookInsert  user={user} insertbook={insertbook}/>
                    </Modal> 
            </div>
        </div>
    </div>
    )
}

export default MainPresenter;