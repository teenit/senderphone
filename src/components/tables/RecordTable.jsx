import React, { useEffect, useState } from 'react';
import '../../assets/tables/RecordsTable.scss';
import PortalModalRoot from '../portals/PortalModalRoot';
import axios from 'axios';
import { apiResponse } from '../../function/requests';
const RecordTable = () => {
  const initialData = [
    {
      pib: "full name",
      phone: "380989994455",
      doctor: "doctor name",
      date: "15 July",
      time: "12:00",
      isCheked: false,
      isStartMessageSent: false,
      isReminderSent: false,
    },
    {
      pib: "full name 2",
      phone: "380989994455",
      doctor: "doctor name 2",
      date: "15 August",
      time: "17:00",
      isCheked: false,
      isStartMessageSent: false,
      isReminderSent: false,
    },
  ];
  useEffect(() => {
    const url = 'https://sender.itclub.in.ua/admin/get-active-list.php';
    axios.post(url).then((resp) => {
      const responceData = resp.data;
      console.log(responceData)
    });

  },[]);

  const [data, setData] = useState([...initialData]);
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
        mas[index] = activeUsers[0].doctor
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
            <td>ПІБ</td>
            <td>Номер телефону</td>
            <td>Лікар</td>
            <td>Дата запису</td>
            <td>Час запису</td>
            <td>Вибрати отримувачів</td>
            <td>Статус повідомлення</td>
            <td>Статус повідомлення за день до візіиту</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.pib}</td>
              <td>{item.phone}</td>
              <td>{item.doctor}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>
              <td>
                <input type="checkbox" value={item.isCheked} onClick={() => handleCheckboxChange(index)} />
              </td>
              <td>{item.isStartMessageSent?"Відправлено":"Не відправлено"}</td>
              <td>{item.isReminderSent?"Відправлено":"Не відправлено"}</td>

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
