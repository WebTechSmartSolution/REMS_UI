



import { notifyPromise } from "../services/errorHandlerService";

const Signup = () => {
  const { userDetail, handleChange, handleSubmit } = useSignupForm();

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
notify("success", "Account information updated successfully.");

  //   const promise = handleSubmit(e); // handleSubmit returns a promise

  //   notifyPromise(promise, {
  //     pending: "Signing up...",
  //     success: "Signup Successfully",
  //     error: "Failed to signup!",
  //   });
  // };
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This will navigate to the previous page
  };
