import beesPlaceAPI from "@/services/beesPlaceAPI";

export default {
    login(email, password) {
        return beesPlaceAPI.post('/login', {
            email: email,
            password: password,

        })
    },
    register(name, email, password) {
        return beesPlaceAPI.post('/register', {
            name: name,
            email: email,
            password: password,
            phone_number: '1234567890',
        })
    },
    forgot(email) {
        return beesPlaceAPI.post('/password/forgot', {
            email: email,
        })
    },
    getAnnouncements() {
        return beesPlaceAPI.get('/announcement')
    },
    getUserProfil(token) {
        beesPlaceAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return beesPlaceAPI.get('/user')
    },
    getUserAnnouncements(token) {
        beesPlaceAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return beesPlaceAPI.get('/announcement/show')
    }
}