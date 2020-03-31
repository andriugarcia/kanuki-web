<template lang="pug">
    v-card.pa-4(color="kyellow")
        v-subheader Register
        v-text-field(placeholder="User", color="black", v-model="user")
        v-text-field(placeholder="Email", color="black", v-model="email")
        v-text-field(placeholder="Password", color="black", :type="visible ? 'text' : 'password'", v-model="pass", :append-icon="!visible ? 'mdi-eye' : 'mdi-eye-off'", @click:append="() => (visible = !visible)")
        v-btn.font-weight-bold.kyellow--text.text-truncate(block, rounded, depressed, @click="register", color="black") Register
</template>

<script>
export default {
    data() {
        return {
            user: "",
            email: "",
            pass: "",
            visible: false
        }
    },
    methods: {
        register() {
            this.$store.dispatch("auth/register", {user: this.user, email: this.email, pass: this.pass})
        }
    }
}
</script>