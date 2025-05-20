import { FiMail } from "react-icons/fi";

import Error from "@component/form/Error";
import InputArea from "@component/form/InputArea";
import useLoginSubmit from "@hooks/useLoginSubmit";

const ResetPassword = ({ setMode, setModalOpen }) => {
  const { handleSubmit, submitHandler, register, errors, loading } =
    useLoginSubmit("forgot", setModalOpen);

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold font-serif">Forgot Password</h2>
        <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
          Reset your password
        </p>
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 gap-5">
          <InputArea
            register={register}
            label="Email"
            name="verifyEmail"
            type="email"
            placeholder="Your Registered Email"
            Icon={FiMail}
          />
          <Error errorName={errors.verifyEmail} />

          <button
            disabled={loading}
            type="submit"
            className="w-full text-center py-3 rounded bg-emerald-500 text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
          >
            Recover password
          </button>
        </div>
      </form>
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => setMode("login")}
          className="text-sm text-heading ps-3 hover:no-underline focus:outline-none"
        >
          Back to Login
        </button>
      </div>
    </>
  );
};

export default ResetPassword;
