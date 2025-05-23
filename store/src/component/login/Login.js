import { FiLock, FiMail } from "react-icons/fi";

import Error from "@component/form/Error";
import useLoginSubmit from "@hooks/useLoginSubmit";
import InputArea from "@component/form/InputArea";

const Login = ({ setMode, setModalOpen }) => {
  const { handleSubmit, submitHandler, register, errors, loading } =
    useLoginSubmit("login", setModalOpen);

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold font-serif">Login</h2>
        <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
          Login with your email and password
        </p>
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 gap-5">
          <InputArea
            register={register}
            defaultValue="kasunis1234@gmail.com"
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            Icon={FiMail}
          />
          <Error errorName={errors.email} />

          <InputArea
            register={register}
            defaultValue="123456"
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            Icon={FiLock}
          />
          <Error errorName={errors.password} />

          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => setMode("forgot")}
              className="text-sm text-heading ps-3 hover:no-underline focus:outline-none"
            >
              Forgot password?
            </button>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full text-center py-3 rounded bg-emerald-500 text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
