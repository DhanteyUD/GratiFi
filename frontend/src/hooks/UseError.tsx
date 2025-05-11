import ReactDOMServer from "react-dom/server";
import { showToastError } from "@/utils/notification.utils";
import { AxiosError } from "axios";
import type { AxiosResponse } from "axios";


interface CustomAxiosResponse extends Omit<AxiosResponse, "data"> {
  data: {
    message?: string | string[];
  };
}

interface CustomError extends AxiosError<unknown, Record<string, unknown>> {
  response?: CustomAxiosResponse;
}

export default function UseError(error: CustomError) {
  const errorMsg = error.response?.data?.message;

  if (!error?.response) {
    return showToastError(
      "Network error, check your internet connection 🛜",
      "top-center",
      5000,
      true
    );
  }
  if (error?.response?.status >= 500 && !errorMsg) {
    return showToastError(
      "Server error, please try again later.",
      "top-center",
      5000,
      true
    );
  } else {
    if (typeof errorMsg === "string") {
      return showToastError(
        errorMsg || "An error occurred.",
        "top-center",
        3000,
        true
      );
    }

    if (typeof errorMsg === "object") {
      const allErrors = [...errorMsg];

      const CustomToast = () => (
        <div>
          {allErrors.map((error, index) => (
            <div
              key={index}
              className="inline-block px-4 py-1 m-1 bg-red-500 text-white rounded-full text-sm font-semibold"
            >
              {error}
            </div>
          ))}
        </div>
      );

      return showToastError(
        ReactDOMServer.renderToStaticMarkup(<CustomToast />),
        "top-center",
        1000 * allErrors.length,
        true
      );
    }
  }
}
