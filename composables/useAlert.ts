import {useToastStore} from "../stores/toast";


export function alert() {
    function toastSuccess(content: string) {
        const toastStore = useToastStore()
        toastStore.success(content)
    }

    function toastError(content: string) {
        const toastStore = useToastStore()
        toastStore.error(content)
    }

    function toastInfo(content: string) {
        const toastStore = useToastStore()
        toastStore.info(content)
    }

    return {
        toastSuccess,
        toastError,
        toastInfo
    }
}

