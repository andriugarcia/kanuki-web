<template lang="pug">
    v-card.pa-4(color="kyellow")
        v-subheader Register
        v-text-field(placeholder="User", v-model="user")
        v-text-field(placeholder="Email", v-model="email")
        v-text-field(placeholder="Password", type="password", v-model="pass")
        v-btn.font-weight-bold.kyellow--text.text-truncate(block, rounded, depressed, @click="register", color="black") Register
</template>

<script>
export default {
    data() {
        return {
            user: "",
            email: "",
            pass: ""
        }
    },
    methods: {
        register() {
            this.$store.dispatch("auth/register", {user: this.user, email: this.email, pass: this.pass})
        }
    }
}
</script>