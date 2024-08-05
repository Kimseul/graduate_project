import React,{useState} from 'react'

const Addressdetail = (props) => {
    const { user , insertaddress  } = props;

    const [address, setAddress] = useState('');
    const [detailAddress, setdetailAddress] = useState('');
    const [addressNum, setAddressNum] = useState(0)
    
      const handleInsertAddress = () => {
            const item ={
                address: address ,
                detailAddress: detailAddress,
                addressNum: addressNum,
                
            }
           insertaddress(item);
          console.log(item); 
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
                    <th>기본주소</th>
                    <td>
                        <input
                          type="text"
                          value={address}
                          onChange={e => setAddress(e.target.value)}
                        />
                    </td>
                  </tr>
                  <tr>
                    <th>상세주소</th>
                    <td>
                        <input
                          type="text"
                          value={detailAddress}
                          onChange={e => setdetailAddress(e.target.value)}
                        />
                     
                    </td>
                  </tr>
                  <tr>
                    <th>우편 번호</th>
                    <td>
                        <input
                          type="text"
                          value={addressNum}
                          onChange={e => setAddressNum(e.target.value)}
                        />
                    </td>
                  </tr>
                 
                </tbody>
              </table>
             <div className="edit-container">
                <div className="basket" onClick={() => handleInsertAddress()}>
                        <i class="material-icons">check_box</i>
                </div>    
            </div>
          </div>
          </div>
        
      );
}

Addressdetail.defaultProps = {
    insertaddress : () =>{}
}


export default Addressdetail