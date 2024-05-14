interface ErrorMessageProps {
  errorType: "Insufficient Funds" | "Lost/Stolen" | string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorType }) => {
  let message = "Something went wrong. Give it another chance!";

  if (errorType === "Lost/Stolen") {
    message =
      "Your card is on the lost / stolen list. Please contact your bank.";
  } else if (errorType === "Insufficient Funds") {
    message =
      "Not enough funds. Please check your account balance and try again later.";
  }

  return <p className="text-error">{message}</p>;
};
