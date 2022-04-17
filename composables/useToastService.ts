import { Toast, ToastType } from '~~/models/toast';

export const useToastService = () => {
    const defaults = {
        title: '',
        message: 'Please specify a <b>message</b>',
        type: ToastType.NORMAL,
        progress: false,
        timeout: 2
    };
    const defaultsError = {
        title: 'Error',
        type: ToastType.DENIED
    };

    return {
        showToast: (t: Toast) => {
            const active = useState<boolean>('showToast', () => false);
            const toast = useState<Toast>('toast');

            active.value = true;
            toast.value = {
                title: t.title ? t.title : defaults.title,
                message: t.message ? t.message : defaults.message,
                type: t.type ? t.type : defaults.type,
                progress: t.progress ? t.progress : defaults.progress,
                icon: t.icon ? t.icon : '',
                iconPrimary: t.iconPrimary ? t.iconPrimary : '',
                iconSecondary: t.iconSecondary ? t.iconSecondary : '',
                timeout: t.timeout ? t.timeout : defaults.timeout,
                primary: t.primary ? t.primary : undefined,
                secondary: t.secondary ? t.secondary : undefined
            };
        },
        showError: (message: string) => {
            const active = useState<boolean>('showToast', () => false);
            const toast = useState<Toast>('toast');

            active.value = true;
            toast.value = {
                title: defaultsError.title,
                message: message ? message : defaults.message,
                type: defaultsError.type,
                progress: defaults.progress,
                timeout: defaults.timeout
            };
        }
    };
};
