import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkIsAuth, loginUser } from "../store/slices/auth/authSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useSelector(checkIsAuth)
  useEffect(() => {
    if (status) toast(status);
    if(isAuth) navigate('/')
  }, [status,isAuth,navigate]);


  const handleSubmit = () => {
    try {
      dispatch(loginUser({ username, password }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-1/4 h-60 mx-auto mt-40"
    >
      <h1 className="text-lg text-white text-center">Авторизация</h1>
      <label className="text-xs text-white">
        Username:
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          className="mt-1 text-black w-full rounded-lg bg-purple-200 border py-2.5 px-2 text-xl outline-none placeholder:text-gray-700"
        />
      </label>
      <label className="text-xs text-white">
        Password:
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="mt-1 text-black w-full rounded-lg bg-purple-200 border py-2.5 px-2 text-xl outline-none placeholder:text-gray-700"
        />
      </label>
      <div className="flex gap-8 justify-center mt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-5 flex justify-center items-center text-sm bg-gray-600 text-white rounded-sm py-2 px-4"
        >
          Войти
        </button>
        <Link
          to="/register"
          className="mt-5 flex justify-center items-center text-sm text-white"
        >
          Нет аккаунта ?
        </Link>
      </div>
    </form>
  );
};

export default LoginPage;
