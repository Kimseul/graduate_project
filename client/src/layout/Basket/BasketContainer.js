import React from "react";
import BasketPresenter from "./BasketPreseneter";

const BasketContainer = props =>{
    const { user, basketlist,booklist,insertooder } = props;
    return(
        <div>
            <BasketPresenter
                basketlist={basketlist}
                user = {user}
                booklist ={booklist}
                insertooder={insertooder}

            />
        </div>
    );
};

export default BasketContainer;