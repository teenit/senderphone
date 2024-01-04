import React, { useState } from "react";
import PortalModalRoot from "../../portals/PortalModalRoot";
import { apiResponse } from "../../../function/requests";


const ActionButtonPlus = ({successHandler, }) => {
    const [state, setState]  = useState({
        modal:false,
        pib:"",
        phone:"",
        date_record:"",
        time_record:"",
        send_sms:false,
        will_send_sms:"",
        will_send_sms_time:"",
        datas:{
            likar:""
        },
    })
    const send = () =>{
        apiResponse(state,'create-record.php').then((data)=>{console.log(data)})
   }
    return (
        <>
            <div className="ActionButtonPlus" onClick={()=>{
                console.log(state)
                setState({...state,modal:!state.modal})
            }}>
                555
            </div>
            {
                state.modal && (
                    <PortalModalRoot modalClass = "ActionButtonPlusModal">
                        <div className="form">
                            <div className="line">
                                <label htmlFor="pib">ПІБ клієнта</label>
                                <input id="pib" type="text" value={state.pib} onChange={(e)=> setState({...state,pib:e.target.value})}/>
                            </div>
                            <div className="line">
                                <label htmlFor="phone">Номеер телефону у форматі 380991117788</label>
                                <input id="phone" type="text" value={state.phone} onChange={(e)=> setState({...state,phone:e.target.value})}/>
                            </div>
                            <div className="line">
                                <label htmlFor="date_record">Дата запису</label>
                                <input id="date_record" type="date" value={state.date_record} onChange={(e)=> setState({...state,date_record:e.target.value})}/>
                            </div>
                            <div className="line">
                                <label htmlFor="time_record">Час запису</label>
                                <input id="time_record" type="time" value={state.time_record} onChange={(e)=> setState({...state,time_record:e.target.value})}/>
                            </div>
                            <div className="line">
                                <label htmlFor="likar">Запис до лікаря</label>
                                <input id="likar" type="text" value={state.datas.likar} onChange={(e)=> setState({...state,datas:{...state.datas,likar:e.target.value}})}/>
                            </div>
                            <div className="line">
                                <label htmlFor="send_sms"> <span>Відправити СМС</span>
                                    <input id="send_sms" type="checkbox" checked={state.send_sms} onChange={(e)=> setState({...state,send_sms:e.target.checked})}/>
                                </label>
                                {
                                    state.send_sms && (
                                        <>
                                            <input type="date" checked={state.will_send_sms} onChange={(e)=> setState({...state,will_send_sms:e.target.value})}/>
                                            <input type="time" checked={state.will_send_sms_time} onChange={(e)=> setState({...state,will_send_sms_time:e.target.value})}/>
                                        </>
                                    )
                                }
                               
                            </div>
                            <div className="line">
                                <button onClick={send} className="successButton">Створити запис</button>
                                <button onClick={()=>setState({...state,modal:false})} className="cancelButton">Відмінити</button>
                            </div>
                        </div>
                    </PortalModalRoot>
                )
            }
        </>
    )
}

export default ActionButtonPlus;