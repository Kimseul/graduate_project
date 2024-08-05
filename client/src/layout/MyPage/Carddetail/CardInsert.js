import React ,{useState}from 'react'

const CardInsert = (props) => {
    const { user , insertcard ,geTotalprice} = props;

    const [creaditCardNum, setCreaditCardNum] = useState('')
    const [creaditcardDate, setCreaditcardDate] = useState('')
    const [creaditCardkinds, setCreaditCardkinds] = useState('')
  
      const handleInsertCard = () => {
            const item ={
              creditCardNum: creaditCardNum ,
              creaditcardDate: creaditcardDate,
              creaditCardkinds: creaditCardkinds,
              customerID : user.ID
            }
           insertcard(item);
          console.log(item); 
      }
    // console.log(geTotalprice(user));
    
    if(user.totalprice >= 200000){
      var grade =(
        <tr>골드</tr> 
      );
    }else{
      if( user.totalprice >= 100000){
        var grade = (
          <tr>실버</tr>
        );
      }else{
        var grade = (
          <tr>브론즈</tr>
        );
      }
    }
      return (
       
          <div >
            <div >
              <table>
                <tbody>
                    <tr>
                        <th>회원 아이디</th>
                        <tr>{user.ID}</tr>
                    </tr>
                    <tr>
                        <th>회원 이름</th>
                        <tr>{user.name}</tr>
                    </tr>
                      <tr>
                         <th>회원 등급</th>
                          {grade}
                      </tr>
                  <tr>
                    <th>카드번호</th>
                    <td>
                        <input
                          type="text"
                          value={creaditCardNum}
                          onChange={e => setCreaditCardNum(e.target.value)}
                        />
                    </td>
                  </tr>
                  <tr>
                    <th>유효기간</th>
                    <td>
                        <input
                          type="text"
                          value={creaditcardDate}
                          onChange={e => setCreaditcardDate(e.target.value)}
                        />
                     
                    </td>
                  </tr>
                  <tr>
                    <th>카드 종류</th>
                    <td>
                        <input
                          type="text"
                          value={creaditCardkinds}
                          onChange={e => setCreaditCardkinds(e.target.value)}
                        />
                    </td>
                  </tr>
                 
                </tbody>
              </table>
             <div className="edit-container">
                <div className="basket" onClick={() => handleInsertCard()}>
                        <i class="material-icons">check_box</i>
                </div>    
            </div>
          </div>
          </div>
        
      );
}

CardInsert.defaultProps = {
    insertcard : () =>{}
}

export default CardInsert