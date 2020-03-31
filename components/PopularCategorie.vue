<template lang="pug">
    #PopularCategorie
        b Books más populares en Deporte
        v-list(color="transparent")
            v-list-item(v-for="i in 6", :key="i", @click="")
                v-list-item-avatar
                    v-icon mdi-circle
                v-list-item-content
                    v-list-item-title.font-weight-bold p/Pill
                    v-list-item-subtitle 1200 Seguidores
                v-list-item-action
                    follow.mt-2(name="pill")
</template>