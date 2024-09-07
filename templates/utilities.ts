import type {AxiosProgressEvent} from "axios";

interface IRouteData {
    logo: string,
    title: string
}

export function useUtils() {
    const route = useRoute();
    const alert = useAlerts();
    const spinner = useSpinner();
    const authStore = useAuthStore();
    const uploadPercent = ref<number>(0);
    const appName = ref('trip')
    const logoRoutes = ref<IRouteData>({
        'trip': {
            logo: '/logo.png',
            title: 'Bashomal car'
        },
        'mal': {
            logo: '/bashomal-mal-logo.png',
            title: 'Bashomal mal'
        },
    })

    // Handle referral code in route query
    function checkAndSaveReferralCode() {
        if (route && route.query && route.query.r && route.query.r.length > 0) {
            const referralCode = useCookie<string>("_referralCode");
            referralCode.value = route.query.r as string;
        }
    }

    function prettyDate(date: Date) {
        if (date)
            return new Date(date).toLocaleDateString('fa-IR')
    }

    // Convert Numbers to english
    function convertNumbers2English(input: string) {
        if (input) {
            // @ts-ignore-next-line
            return input.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, (c: string) => {
                return c.charCodeAt(0) & 0xf;
            });
        }
        return input;
    }

    // Global upload progress (Will be shown instead of spinner)
    function handleUploadProgress(progressEvent: AxiosProgressEvent) {
        if (uploadPercent.value == 100) {
            uploadPercent.value = 0;
        }
        uploadPercent.value = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total!
        );
        spinner.setUploadProgressPercent(uploadPercent.value);
    }

    // Handle weather or not render the pwa modal
    function handlePWAInstallDialog() {
        const isFirstVisitCookie = useCookie<boolean>("_firstVisit");
        if (isFirstVisitCookie.value == false) {
            return;
        } else {
            if (
                // @ts-ignore-next-line
                !navigator.standalone &&
                !window.matchMedia("(display-mode: standalone)").matches
            ) {
                if (navigator.userAgent.match(/iPhone|iPad|iPod/)) {
                    authStore.setIphone();
                    authStore.updatePwaModalState(true);
                } else if (/android/i.test(navigator.userAgent)) {
                    authStore.setAndroid();
                    authStore.updatePwaModalState(true);
                }
            }
        }
    }

    function getCurrentApplicationName(): string {
        if (route.path.includes('/trip')) {
            appName.value = 'trip'
        } else if (route.path.includes('/market')) {
            appName.value = 'mal'
        }
        return appName.value
    }

    function getLogoBasedOnApplicationName(): IRouteData | string {
        getCurrentApplicationName()
        if (appName.value) {
            return logoRoutes.value[appName.value]
        } else {
            return '/logo.png'
        }
    }

    // Get user location with access
    async function getUserLocation(): Promise<GeolocationPosition | void> {
        return new Promise<GeolocationPosition | void>((resolve, reject) => {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (res: GeolocationPosition) => {
                        resolve(res);
                    },
                    (error) => {
                        if (error.code) {
                            alert.error(geoLocErrors[error.code], 6000);
                        }
                        reject(error);
                    }
                );
            }
        });
    }

    return {
        convertNumbers2English,
        getUserLocation,
        handleUploadProgress,
        handlePWAInstallDialog,
        checkAndSaveReferralCode,
        prettyDate,
        getLogoBasedOnApplicationName,
        getCurrentApplicationName
    };
}

