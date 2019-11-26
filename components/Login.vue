<template lang="pug">
    v-card.pa-4(color="blue", dark)
        v-subheader Login
        v-text-field(placeholder="User", v-model="user")
        v-text-field(placeholder="Password", v-model="pass", type="password")
        v-btn.font-weight-bold.blue--text.text-truncate(block, rounded, depressed, color="white", @click="login") Login
</template>

<script>
export default {
    data() {
        return {
            user: "",
            pass: ""
        }
    },
    methods: {
        login() {
            this.$store.dispatch("auth/login", {user: this.user, pass: this.pass})
        }
    }
}
</script>