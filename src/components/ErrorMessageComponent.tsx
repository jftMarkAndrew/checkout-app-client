interface ErrorMessageComponentProps {
  errorType?: "LS" | "IF";
}

export const ErrorMessageComponent: React.FC<ErrorMessageComponentProps> = ({
  errorType,
}) => {
  let message = "Something went wrong. Give it another chance!";

  if (errorType === "LS") {
    message =
      "Your card is on the lost / stolen list. Please contact your bank.";
  } else if (errorType === "IF") {
    message =
      "Not enough funds. Please check your account balance and try again later.";
  }

  return <p className="text-error">{message}</p>;
};
