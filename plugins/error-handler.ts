export default defineNuxtPlugin((nuxtApp) => {
    // handle error, e.g. report to a service
    nuxtApp.hook('vue:error', (error, instance, info) => {
        console.log('error, instance, info====hook ====', error, instance, info);
    })
})