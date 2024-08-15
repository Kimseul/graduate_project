import React from 'react'
import BookPresenter from './BookPresenter'

const BookContainer = (props) => {
    const { user, bookList ,updatebook ,insertbook,deletebook ,addbasket}  = props;
    return (
        <div>
            <BookPresenter user={user} bookList={bookList} updatebook={updatebook} insertbook={insertbook} deletebook={deletebook}
            addbasket={addbasket}/>
        </div>
    )
}

export default BookContainer