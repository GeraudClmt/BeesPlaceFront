import beesPlaceAPI from "@/services/beesPlaceAPI";

export default {
    login(email, password) {
        return beesPlaceAPI.post('/login', {
            email: email,
            password: password,

        })
    }
}