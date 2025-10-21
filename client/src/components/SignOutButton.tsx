import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Log Out Successful!", type: "SUCCESS" });
      navigate("/sign-in");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="text-blue-600 font-bold px-3 bg-white hover:bg-gray-100 rounded-md"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
