
<template>
    <div id="webtemplate">
        <div style="position: relative; min-height: 200px">
            <img :src="content.img" alt="" style="width: 100%; height: 360px; object-fit: cover" :key="rerender">
            <div v-if="edit" :class="{'center': true, 'empty': !content.img}" style="background-color: #000000A0; top: 0; left: 0; right: 0; bottom: 0; position: absolute">
                <div style="color: white">Pulsa para cambiar imagen</div>
            </div>
            <input v-if="edit" @change="changecover" type="file" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; opacity: 0">
        </div>
        <input v-if="edit" class="input" style="color: black; margin-top: 12px; font-family: 'Roboto Slab'" v-model="content.title" type="text">
        <h1 v-else style="color: black; margin-top: 12px; margin-left: 12px; margin-bottom: 12px; font-family: 'Roboto Slab'">{{content.title}}</h1>
    </div>
</template>

<script>
export default {
    name: 'web-template',

    data() {
        return {
            files: [],
            rerender: 0
        }
    },

    props: {
        content: Object, 
        user: Object, 
        card: Object,
        isMiniature: Boolean,
        edit: Boolean
    },
    
    created() {
        if (typeof this.content.title == 'undefined') {
            this.content.title = "Titulo del Post"
        }
    },

    methods: {
        async changecover(ev) {
            this.content.img = await this.toBase64(ev.target.files[0])
            this.rerender++
            this.$emit('save')
        },

        toBase64: file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
    .center {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
    }

    .empty {
        min-height: 200px;
    }

    .input {
        width: 100%;
        padding: 8px;
        font-size: 1.2em;
        border: 0;
        font-weight: lighter;
        border-radius: 24px 0 0 24px;
    }
</style>

