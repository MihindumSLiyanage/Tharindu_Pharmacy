import { FiLock, FiMail, FiUser } from "react-icons/fi";

import Error from "@component/form/Error";
import InputArea from "@component/form/InputArea";
import useLoginSubmit from "@hooks/useLoginSubmit";

const Register = ({ setModalOpen }) => {
  const { handleSubmit, submitHandler, register, errors, loading } =
    useLoginSubmit("register", setModalOpen);

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold font-serif">Register</h2>
        <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
          Create an account with email
        </p>
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 gap-5">
          <div className="form-group">
            <InputArea
              register={register}
              label="Name"
              name="name"
              type="text"
              placeholder="Full Name"
              Icon={FiUser}
            />
            <Error errorName={errors.name} />
          </div>
          <div className="form-group">
            <InputArea
              register={register}
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
              Icon={FiMail}
            />
            <Error errorName={errors.email} />
          </div>
          <div className="form-group">
            <InputArea
              register={register}
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              Icon={FiLock}
            />
            <Error errorName={errors.password} />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full text-center py-3 rounded bg-emerald-500 text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
          >
            Register
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
