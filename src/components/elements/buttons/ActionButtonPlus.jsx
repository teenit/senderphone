import React, { useEffect, useState } from "react";
import PortalModalRoot from "../../portals/PortalModalRoot";
import { apiResponse } from "../../../function/requests";
import '../../../assets/elements/buttons/ActionButtonPlus.scss'
import { getStatus, sendMulti } from "../../../function/turboSMS";

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
            surname: "",
            name: "",
            patronymic: "",
            likar: ""
        },
        message: "Вітаю! name father-name ви записані до likar на date o time !"
    })
    const [error, setError] = useState({
        name: true,
        surname: true,
        phone: true,
        date_record: true,
        time_record: true,
        will_send_sms: false,
        will_send_sms_time: false,
    })
    const send = () => {
        const data = {
            pib: state.pib,
            phone: state.phone,
            date_record: state.date_record,
            time_record: state.time_record,
            data: {
                name: state.data.name,
                surname: state.data.surname,
                patronymic: state.data.patronymic,
                phone: state.phone,
                date_record: state.date_record,
                time_record: state.time_record,
                will_send_sms: state.will_send_sms,
                will_send_sms_time: state.will_send_sms_time,
                likar: state.data.likar,
                sms: [
                    {
                        date: state.will_send_sms,
                        time: state.will_send_sms_time,
                        status: "",
                        text: state.message
                    }
                ]
            }
        }
        apiResponse(data, 'create-record.php').then((data) => { console.log(data) })
    }

    const [message, setMessage] = useState("Вітаю! name father-name ви записані до likar на date o time !")
    useEffect(() => {
        handleMessage(message)
    }, [])
    const handleMessage = (mes) => {
        let mas = mes.split(" ")
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
                case 'name':
                    mas[index] = state.data.name
                    break;
                case 'surname':
                    mas[index] = state.data.surname
                    break;
                case 'father-name':
                    mas[index] = state.data.patronymic
                    break;

                default:
                    break;
            }

        })
        return mas.join(" ")
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
                                <label htmlFor="name" className={error.name && state.data.name !== "" ? "error" : {}}>Ім'я клієнта</label>
                                <input id="name" type="text" value={state.data.name} onChange={(e) => {
                                    setState({ ...state, data: { ...state.data, name: e.target.value } });
                                    if (e.target.value.length < 1) {
                                        setError({ ...error, name: true })
                                    } else {
                                        setError({ ...error, name: false })
                                    }
                                }}
                                />
                            </div>
                            <div className="line">
                                <label htmlFor="surname" className={error.surname && state.data.surname !== "" ? "error" : {}}>Прізвище клієнта</label>
                                <input id="surname" type="text" value={state.data.surname} onChange={(e) => {
                                    setState({ ...state, data: { ...state.data, surname: e.target.value } });
                                    if (e.target.value.length < 1) {
                                        setError({ ...error, surname: true })
                                    } else {
                                        setError({ ...error, surname: false })
                                    }
                                }}
                                />
                            </div>
                            <div className="line">
                                <label htmlFor="patronymic">По батькові клієнта</label>
                                <input id="patronymic" type="text" value={state.data.patronymic} onChange={(e) => {
                                    setState({ ...state, data: { ...state.data, patronymic: e.target.value } });
                                }}
                                />
                            </div>
                            <div className="line">
                                <label htmlFor="phone" className={error.phone && state.phone !== "" ? "error" : {}}>Номер телефону у форматі 380991117788</label>
                                <input id="phone" type="number" value={state.phone} onChange={(e) => {
                                    setState({ ...state, phone: e.target.value });
                                    if (e.target.value.length !== 12) {
                                        setError({ ...error, phone: true })
                                    } else {
                                        setError({ ...error, phone: false })
                                    }
                                }} />
                            </div>
                            <div className="line">
                                <label htmlFor="date_record" className={error.date_record && state.date_record !== "" ? "error" : {}}>Дата запису</label>
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
                                <label htmlFor="time_record" className={error.time_record && state.time_record !== "" ? "error" : {}}>Час запису</label>
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
                                    setState({ ...state, data: { ...state.data, likar: e.target.value } });

                                }} />
                            </div>
                            <div className="line">
                                <label htmlFor="send_sms"> <span>Відправити СМС</span>
                                    <input id="send_sms" type="checkbox" checked={state.send_sms} onChange={(e) => {
                                        setState({
                                            ...state,
                                            send_sms: e.target.checked,
                                            message: handleMessage("Вітаю! name father-name ви записані до likar на date o time !")
                                        })

                                    }} />
                                </label>
                                {
                                    state.send_sms && (
                                        <>
                                            <input type="date" className={state.send_sms && error.will_send_sms && state.will_send_sms !== "" ? "error" : {}} checked={state.will_send_sms} onChange={(e) => {
                                                setState({ ...state, will_send_sms: e.target.value });
                                                if (e.target.value.length < 1 && state.send_sms) {
                                                    setError({ ...error, will_send_sms: true })
                                                } else {
                                                    setError({ ...error, will_send_sms: false })
                                                }
                                            }} />
                                            <input type="time" className={state.send_sms && error.will_send_sms_time && state.will_send_sms_time !== "" ? "error" : {}} checked={state.will_send_sms_time} onChange={(e) => {
                                                setState({ ...state, will_send_sms_time: e.target.value });
                                                if (e.target.value.length < 1 && state.send_sms) {
                                                    setError({ ...error, will_send_sms_time: true })
                                                } else {
                                                    setError({ ...error, will_send_sms_time: false })
                                                }
                                            }} />
                                            <textarea value={state.message} name="" id="" cols="30" rows="10" onChange={(e) => {

                                                setState({ ...state, message: handleMessage(e.target.value) })
                                            }}></textarea>

                                        </>
                                    )
                                }

                            </div>
                            <div className="line">
                                <button onClick={() => {
                                    if (Object.values(error).some(item => item == true)) {
                                        console.log(error);
                                    } else {
                                        if (state.send_sms) {
                                            send()
                                            let obj = {};
                                                if (!obj[state.phone]) {
                                                    obj[state.phone] = {};
                                                }
                                                obj[state.phone]["recipients"] = state.phone;
                                                obj[state.phone]["start_time"] = `${state.will_send_sms} ${state.will_send_sms_time}`
                                                obj[state.phone]["sms"] = {
                                                    "sender": "IT Club",
                                                    "text": state.message
                                                };
                                            sendMulti(obj)
                                        } else {
                                            send()
                                        }

                                    }
                                }} className="successButton">Створити запис</button>
                                <button onClick={() => setState({ ...state, modal: false })} className="cancelButton">Відмінити</button>
                                <button onClick={() => sendMulti("1")} className="cancelButton">SEND SMS</button>
                                <button onClick={() => getStatus("1")} className="cancelButton">GET STATUS</button>
                            </div>
                        </div>
                    </PortalModalRoot>
                )
            }
        </>
    )
}

export default ActionButtonPlus;