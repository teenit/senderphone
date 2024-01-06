import React, { useState } from "react";
import PortalModalRoot from "../../portals/PortalModalRoot";
import { apiResponse } from "../../../function/requests";
import '../../../assets/elements/buttons/ActionButtonPlus.scss'

const ActionButtonPlus = ({ successHandler, }) => {
    const [state, setState] = useState({
        modal: false,
        pib: "",
        phone: "",
        date_record: "",
        time_record: "",
        send_sms: false,
        will_send_sms: "",
        will_send_sms_time: "",
        data: {
            likar: "test"
        },
    })
    const [error, setError] = useState({
        pib: true,
        phone: true,
        date_record: true,
        time_record: true,
        likar: true,
        will_send_sms: "",
        will_send_sms_time: "",
    })
    const send = () => {
        const data = {
            pib: state.pib,
            phone: state.phone,
            data: {
                date_record: state.date_record,
                time_record: state.time_record,
                will_send_sms: state.will_send_sms,
                will_send_sms_time: state.will_send_sms_time,
                likar: "test"
            }
        }
        apiResponse(data, 'create-record.php').then((data) => { console.log(data) })
    }
    const getRecords = () => {
        apiResponse({}, 'get-all-records.php').then((data) => { console.log(data) })
    }
    const [message, setMessage] = useState("")
    const handleMessage = (e) => {
        let mas = e.target.value.split(" ")
        mas.map((item, index) => {
            switch (item) {
                case 'likar':
                    mas[index] = state.data.likar
                    break;

                case 'date':
                    mas[index] = state.date_record
                    break;

                case 'time':
                    mas[index] = state.time_record
                    break;

                default:
                    break;
            }

        })
        setMessage(mas.join(" "))
    }
    return (
        <>
            <div className="ActionButtonPlus" onClick={() => {
                console.log(state)
                setState({ ...state, modal: !state.modal })
            }}>
                +
            </div>
            {
                state.modal && (
                    <PortalModalRoot modalClass="ActionButtonPlusModal">
                        <div className="form">
                            <div className="line">
                                <label htmlFor="pib">ПІБ клієнта</label>
                                <input id="pib" type="text" value={state.pib} onChange={(e) => {
                                    setState({ ...state, pib: e.target.value });
                                    if (e.target.value.length < 1) {
                                        setError({ ...error, pib: true })
                                    } else {
                                        setError({ ...error, pib: false })
                                    }
                                }}
                                />
                            </div>
                            <div className="line">
                                <label htmlFor="phone">Номер телефону у форматі 380991117788</label>
                                <input id="phone" type="text" value={state.phone} onChange={(e) => {
                                    setState({ ...state, phone: e.target.value });
                                    if (e.target.value.length !== 12) {
                                        setError({ ...error, phone: true })
                                    } else {
                                        setError({ ...error, phone: false })
                                    }
                                }} />
                            </div>
                            <div className="line">
                                <label htmlFor="date_record">Дата запису</label>
                                <input id="date_record" type="date" value={state.date_record} onChange={(e) => {
                                    setState({ ...state, date_record: e.target.value });
                                    if (e.target.value.length < 1) {
                                        setError({ ...error, date_record: true })
                                    } else {
                                        setError({ ...error, date_record: false })
                                    }
                                }} />
                            </div>
                            <div className="line">
                                <label htmlFor="time_record">Час запису</label>
                                <input id="time_record" type="time" value={state.time_record} onChange={(e) => {
                                    setState({ ...state, time_record: e.target.value });
                                    if (e.target.value.length < 1) {
                                        setError({ ...error, time_record: true })
                                    } else {
                                        setError({ ...error, time_record: false })
                                    }
                                }} />
                            </div>
                            <div className="line">
                                <label htmlFor="likar">Запис до лікаря</label>
                                <input id="likar" type="text" value={state.data.likar} onChange={(e) => {
                                    setState({ ...state, datas: { ...state.data, likar: e.target.value } });
                                    if (e.target.value.length < 1) {
                                        setError({ ...error, likar: true })
                                    } else {
                                        setError({ ...error, likar: false })
                                    }
                                }} />
                            </div>
                            <div className="line">
                                <label htmlFor="send_sms"> <span>Відправити СМС</span>
                                    <input id="send_sms" type="checkbox" checked={state.send_sms} onChange={(e) => setState({ ...state, send_sms: e.target.checked })} />
                                </label>
                                {
                                    state.send_sms && (
                                        <>
                                            <input type="date" checked={state.will_send_sms} onChange={(e) => {
                                                setState({ ...state, will_send_sms: e.target.value  });
                                                if (e.target.value.length < 1 && state.send_sms) {
                                                    setError({ ...error, will_send_sms: true })
                                                } else {
                                                    setError({ ...error, will_send_sms: false })
                                                }
                                            }} />
                                            <input type="time" checked={state.will_send_sms_time} onChange={(e) => {
                                                setState({ ...state, will_send_sms_time: e.target.value  });
                                                if (e.target.value.length < 1 && state.send_sms) {
                                                    setError({ ...error, will_send_sms_time: true })
                                                } else {
                                                    setError({ ...error, will_send_sms_time: false })
                                                }
                                            }} />
                                            <textarea name="" id="" cols="30" rows="10" onChange={(e) => {
                                                handleMessage(e)
                                            }}></textarea>
                                            <p>Приклад: {message}</p>
                                        </>
                                    )
                                }

                            </div>
                            <div className="line">
                                <button onClick={() => {
                                    if (Object.values(error).some(item => item == true)) {
                                        alert("Некорректні дані.")
                                        console.log(error);
                                    } else {
                                        send()
                                    }
                                }} className="successButton">Створити запис</button>
                                <button onClick={() => setState({ ...state, modal: false })} className="cancelButton">Відмінити</button>
                                <button onClick={getRecords} className="cancelButton">Get Records</button>
                            </div>
                        </div>
                    </PortalModalRoot>
                )
            }
        </>
    )
}

export default ActionButtonPlus;