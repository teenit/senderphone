import React, { useEffect, useState } from 'react';
import '../../assets/tables/RecordsTable.scss';
import PortalModalRoot from '../portals/PortalModalRoot';
import axios from 'axios';
import { apiResponse } from '../../function/requests';
const RecordTable = () => {
  useEffect(() => {
    getRecords();
  },[]);

  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false)
  const [message,setMessage] = useState("")
  const handleCheckboxChange = (index) => {
    const updatedData = [...data];
    updatedData[index] = { ...updatedData[index], isCheked: !updatedData[index].isCheked };
    setData(updatedData);
  };
const handleMessage = (e)=>{
  let mas = e.target.value.split(" ")
  let activeUsers = data.filter(item=>item.isCheked==true)
  mas.map((item,index)=>{
    switch (item) {
      case 'likar':
        mas[index] = activeUsers[0].likar
        break;
    
      case 'date':
        mas[index] = activeUsers[0].date
        break;
    
      case 'time':
        mas[index] = activeUsers[0].time
        break;
    
      default:
        break;
    }

  })
  setMessage(mas.join(" "))
}
const getRecords = () => {
  apiResponse({}, 'get-all-records.php').then((data) => { setData([...data]) })
}
const handleSendingMessage = ()=>{
  setModal(false)
  setMessage("")
  alert("Посилання відправлено успішно")
  data.forEach((item,index)=>{
    if(item.isCheked){
      data[index].isStartMessageSent = true
    }
  })
}
  return (
    <div className='RecordTable'>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>ПІБ</td>
            <td>Номер телефону</td>
            <td>Лікар</td>
            <td>Дата запису</td>
            <td>Час запису</td>
            <td>СМС відправлено</td>
            <td>Вибрати отримувачів</td>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 && data.map((item, index) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{`${item.surname} ${item.name} ${item.patronymic}`}</td>
              <td>{item.phone}</td>
              <td>{item.likar}</td>
              <td>{item.date_record}</td>
              <td>{item.time_record}</td>
              
              <td>{item.sms.map((sms, i)=>{
              return (
                <span key={item.id + "l" + i} title={sms.text}>{`${sms.date} ${sms.time}`}</span>
              )
            })}</td>
              <td>
                <input type="checkbox" value={item.isCheked} onClick={() => handleCheckboxChange(index)} />
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => {
          let activeUsers = data.filter(item=>item.isCheked==true)
          if(activeUsers.length>0){
            setModal(true)
          }
        
      }}>Відправити повідомлення</button>
      {modal &&
        <PortalModalRoot modalClass="RecordTable">
          <div className='modal__inner'>
            <h2>Введіть повідомлення</h2>
            <textarea name="" id="" cols="50" rows="10" onChange={(e)=>{
              handleMessage(e)
            }}></textarea>
            <p>Приклад: {message}</p>
            <div className="buttons__wrap">
            <button onClick={()=>{
              handleSendingMessage()
            }}>Надіслати повідомлення</button>
            <button onClick={()=>{
              setModal(false)
              setMessage("")
            }}>Відміна</button>
            </div>

          </div>
        </PortalModalRoot>}
    </div>
  )
}

export default RecordTable;
