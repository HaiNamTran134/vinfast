import axios from "axios";

export let endpoints = {
    "categories": "/categories/",
    "courses": "/courses",
    "lessons": (courseId) => `/courses/${courseId}/lesons`,
    "leson-detail": (lessonId) => `/lessons/${lessonId}/`,
    "oauth2-info": "/vinfast/vinfast-backend/api/user/ReadCustomer.php",
    "login": "/o/token/",
    "current-user": "/users/current-user/"
}

export default axios.create({
    baseURL: "http://localhost:8080/"
})