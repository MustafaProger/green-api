import { useState } from "react";
import "./LogForm.scss";

export default function LoginForm() {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!idInstance || !apiTokenInstance) {
      setError(true);
      return;
    }
    setError(false);
    // Логика авторизации
  };

  return (
    <div className='container'>
      <div className='login-box'>
        <h2 className='title'>Log in</h2>
        <form
          onSubmit={handleSubmit}
          className='form'>
          <div className='input-container'>
            <input
              type='text'
              id='idInstance'
              value={idInstance}
              onChange={(e) => setIdInstance(e.target.value)}
              className={`input ${error && !idInstance ? "error" : ""}`}
              required
            />
            <label
              htmlFor='idInstance'
              className={`label ${idInstance ? "active" : ""}`}>
              idInstance
            </label>
            <div className={`underline ${error && !idInstance ? "error-underline" : ""}`}></div>
          </div>
          <div className='input-container'>
            <input
              type='text'
              id='apiTokenInstance'
              value={apiTokenInstance}
              onChange={(e) => setApiTokenInstance(e.target.value)}
              className={`input ${error && !apiTokenInstance ? "error" : ""}`}
              required
            />
            <label
              htmlFor='apiTokenInstance'
              className={`label ${apiTokenInstance ? "active" : ""}`}>
              apiTokenInstance
            </label>
            <div className={`underline ${error && !apiTokenInstance ? "error-underline" : ""}`}></div>
          </div>
          {error && (
            <p className='error-message'>Все поля должны быть заполнены</p>
          )}
          <button
            type='submit'
            className='submit-button'>
            Войти
          </button>
        </form>
        <p className='register-text'>
          Если у вас нет аккаунта,{" "}
          <a
            href='https://green-api.com/docs/before-start/#mobile'
            target='_blank'
            className='register-link'>
            зарегистрируйтесь
          </a>
        </p>
      </div>
    </div>
  );
}