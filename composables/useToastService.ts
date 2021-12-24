import { useMainStore } from '~~/stores';
import { Toast, ToastType } from '~~/types/toast';

const main = useMainStore();

export const useToastService = () => {
	const defaults = {
		title: '',
		message: 'Please specify a <b>message</b>',
		type: ToastType.NORMAL,
		progress: false,
		timeout: 2,
	};
	const defaultsError = {
		title: 'Error',
		type: ToastType.DENIED,
	};

	return {
		showToast: (toast: Toast) => {
			main.showToast = true;
			main.toast = {
				title: toast.title ? toast.title : defaults.title,
				message: toast.message ? toast.message : defaults.message,
				type: toast.type ? toast.type : defaults.type,
				progress: toast.progress ? toast.progress : defaults.progress,
				icon: toast.icon ? toast.icon : '',
				iconPrimary: toast.iconPrimary ? toast.iconPrimary : '',
				iconSecondary: toast.iconSecondary ? toast.iconSecondary : '',
				timeout: toast.timeout ? toast.timeout : defaults.timeout,
				primary: toast.primary ? toast.primary : undefined,
				secondary: toast.secondary ? toast.secondary : undefined,
			};
		},
		showError: (message: string) => {
			main.showToast = true;
			main.toast = {
				title: defaultsError.title,
				message: message ? message : defaults.message,
				type: defaultsError.type,
				progress: defaults.progress,
				timeout: defaults.timeout,
			};
		},
	};
};
