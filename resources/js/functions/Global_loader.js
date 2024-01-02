export default () => {
    const loader_element = '#global_loader'
    let loader_status = false
    const html = '<div class="w-6 h-6 border-b-4 border-fuchsia-600 dark:border-fuchsia-50 rounded-full animate-spin"></div>'


    const GL_start = (el = null) => {
        $(loader_element || el).html(html).fadeIn()
        loader_status = true
        window.loadded = false
    }
    const GL_stop = (el = null) => {
        $(loader_element || el).fadeOut()
        loader_status = false
        window.loadded = true
    }
    return {
        GL_start,
        GL_stop,
        loader_status,
    }
}
