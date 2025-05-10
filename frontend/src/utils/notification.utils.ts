import { toast } from "react-toastify";

const customId = "toast-custom-id";

interface ToastHelperOptions {
	position?: "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center";
	timeOut?: number;
	hideProgressBar?: boolean;
}

type ToastType = "success" | "info" | "warn" | "error" | null;

const toastHelper = (
	type: ToastType,
	message: string,
	position: ToastHelperOptions["position"] = "top-center",
	timeOut: ToastHelperOptions["timeOut"] = 2000,
	hideProgressBar: ToastHelperOptions["hideProgressBar"] = true
): void => {
	if (type && toast[type]) {
		toast[type](message, {
			position,
			toastId: customId,
			autoClose: timeOut,
			hideProgressBar,
		});
	} else {
		toast(message, {
			position,
			toastId: customId,
			autoClose: timeOut,
			hideProgressBar,
		});
	}
};

export const showToastSuccess = (
	message: string,
	position?: ToastHelperOptions["position"],
	timeOut?: ToastHelperOptions["timeOut"],
	hideProgressBar?: ToastHelperOptions["hideProgressBar"]
): void => toastHelper("success", message, position, timeOut, hideProgressBar);

interface ShowToastInfoOptions {
	message: string;
	position?: ToastHelperOptions["position"];
	timeOut?: ToastHelperOptions["timeOut"];
	hideProgressBar?: ToastHelperOptions["hideProgressBar"];
}

export const showToastInfo = (
	message: ShowToastInfoOptions["message"],
	position?: ShowToastInfoOptions["position"],
	timeOut?: ShowToastInfoOptions["timeOut"],
	hideProgressBar?: ShowToastInfoOptions["hideProgressBar"]
): void => toastHelper("info", message, position, timeOut, hideProgressBar);

interface ShowToastWarningOptions {
	message: string;
	position?: ToastHelperOptions["position"];
	timeOut?: ToastHelperOptions["timeOut"];
	hideProgressBar?: ToastHelperOptions["hideProgressBar"];
}

export const showToastWarning = (
	message: ShowToastWarningOptions["message"],
	position?: ShowToastWarningOptions["position"],
	timeOut?: ShowToastWarningOptions["timeOut"],
	hideProgressBar?: ShowToastWarningOptions["hideProgressBar"]
): void => toastHelper("warn", message, position, timeOut, hideProgressBar);

interface ShowToastErrorOptions {
	message: string;
	position?: ToastHelperOptions["position"];
	timeOut?: ToastHelperOptions["timeOut"];
	hideProgressBar?: ToastHelperOptions["hideProgressBar"];
}

export const showToastError = (
	message: ShowToastErrorOptions["message"],
	position?: ShowToastErrorOptions["position"],
	timeOut?: ShowToastErrorOptions["timeOut"],
	hideProgressBar?: ShowToastErrorOptions["hideProgressBar"]
): void => toastHelper("error", message, position, timeOut, hideProgressBar);

interface ShowToastOptions {
	message: string;
	position?: ToastHelperOptions["position"];
	timeOut?: ToastHelperOptions["timeOut"];
	hideProgressBar?: ToastHelperOptions["hideProgressBar"];
}

export const showToast = (
	message: ShowToastOptions["message"],
	position?: ShowToastOptions["position"],
	timeOut?: ShowToastOptions["timeOut"],
	hideProgressBar?: ShowToastOptions["hideProgressBar"]
): void => toastHelper(null, message, position, timeOut, hideProgressBar);
