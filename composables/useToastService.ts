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
		classToast: 'bg-white',
		classTitle: 'text-gray-900',
		classMessage: 'text-gray-500',
		classPrimary:
			'text-secondary-600 hover:text-secondary-500 focus:shadow-outline-blue active:text-secondary-700 active:bg-gray-50',
		classSecondary:
			'text-gray-700 hover:text-gray-500 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50',
		classSingle: 'text-secondary-600 hover:text-secondary-500',
		classClose: 'text-gray-400',
		classTimeout: 'bg-gray-200',
	};
	const defaultsError = {
		title: 'Error',
		type: ToastType.NORMAL,
		classToast: 'bg-danger-600',
		classTitle: 'text-danger-100',
		classMessage: 'text-danger-200',
		classClose: 'text-danger-300',
		classPrimary: 'text-danger-100',
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
				classToast: toast.classToast
					? toast.classToast
					: defaults.classToast,
				classTitle: toast.classTitle
					? toast.classTitle
					: defaults.classTitle,
				classMessage: toast.classMessage
					? toast.classMessage
					: defaults.classMessage,
				classPrimary: toast.classPrimary
					? toast.classPrimary
					: defaults.classPrimary,
				classSecondary: toast.classSecondary
					? toast.classSecondary
					: defaults.classSecondary,
				classSingle: toast.classSingle
					? toast.classSingle
					: defaults.classSingle,
				classClose: toast.classClose
					? toast.classClose
					: defaults.classClose,
				classTimeout: toast.classTimeout
					? toast.classTimeout
					: defaults.classTimeout,
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
				classToast: defaultsError.classToast,
				classTitle: defaultsError.classTitle,
				classMessage: defaultsError.classMessage,
				classPrimary: defaultsError.classPrimary,
				classSecondary: defaults.classSecondary,
				classSingle: defaults.classSingle,
				classClose: defaultsError.classClose,
				classTimeout: defaults.classTimeout,
			};
		},
	};
};
