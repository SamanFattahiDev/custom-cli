import {useAppStore} from "../stores/app";


export const overlay = {
    show():void{
        const appStore = useAppStore()
        appStore.showOverlay = true
    },
    close():void{
        const appStore = useAppStore()
        appStore.showOverlay = false

    }
}
