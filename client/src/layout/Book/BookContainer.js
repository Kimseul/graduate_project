import React from 'react'
import BookPresenter from './BookPresenter'

const BookContainer = (props) => {
    const { user, bookList ,updatebook ,insertbook,deletebook ,insertbasket}  = props;
    return (
        <div>
            <BookPresenter user={user} bookList={bookList} updatebook={updatebook} insertbook={insertbook} deletebook={deletebook}
            insertbasket={insertbasket}/>
        </div>
    )
}

export default BookContainer