import OrderStatusFrozenNotification from "@/CRUD/notifications/OrderStatusFrozenNotification";

export default class Notification {
    notification
    constructor(notification) {
        this.notification = notification
    }

    generate_html() {
        return  new OrderStatusFrozenNotification(this.notification).renderHtml()
    }

}
