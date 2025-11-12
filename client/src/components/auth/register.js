import React, { useState, useEffect } from "react";
import { useRegisterMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import '../../css/register.css';

const Register = () => {
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [register, { data: user, isSuccess, isError, error, isLoading }] = useRegisterMutation();
    const navigate = useNavigate();
    useEffect(() => {
        if (isSuccess) {
            alert(`שלום ${name}, תודה שנרשמת לאתר!`);
            navigate("/login");
        }
    }, [isSuccess]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        register({ userName, name, phone, email, password });
    };

    return (
        <div className="register-container">
            <h1>הרשמה</h1>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon"><i className="pi pi-user" /></span>
                    <InputText placeholder="שם" required onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon"><i className="pi pi-user" /></span>
                    <InputText placeholder="שם משתמש" required onChange={(e) => setUserName(e.target.value)} />
                </div>

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon"><i className="pi pi-phone" /></span>
                    <InputText placeholder="טלפון" required onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon"><i className="pi pi-at" /></span>
                    <InputText placeholder="מייל" required onChange={(e) => setEmail(e.target.value)} />
                </div>

                <Password placeholder="סיסמה" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask feedback={false} />

                <Button type="submit" label="הרשמה" className="p-button-success w-full mt-3" />
                {isLoading && <p className="loading">טוען...</p>}
                {isError && <p className="error">שגיאה: {error?.data?.message || "שגיאה לא צפויה"}</p>}
            </form>
        </div>
    );
};

export default Register;