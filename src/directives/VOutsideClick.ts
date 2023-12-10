export default {
    mounted(el: any, binding: any) {
        el.outsideClick = function (event: any) {
            if (!(el == event.target || el.contains(event.target))) {
                binding.value.toggle()
            }
        }
        document.body.addEventListener('click', el.outsideClick);
    },
    unmounted(el: any) {
        document.body.removeEventListener('click', el.outsideClick);
    }
}