<template lang="pug">
    input.input(type="file", ref="input", @change="upload")
</template>

<script>
import gql from "graphql-tag"

export default {

    methods: {
        upload() {
            let file = this.$refs.input.files[0]

            console.log(file)

            const self = this
            var AWS = require('aws-sdk');
            var axios = require('axios')

            const spacesEndpoint = new AWS.Endpoint('https://fra1.digitaloceanspaces.com');

            console.log(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY)

            let s3 = new AWS.S3({
                endpoint: spacesEndpoint,
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            });

            const prefix = this.isUser ? 'u' : 'p'
            const name = `${prefix}-${this.id}-${this.type}`

            var params = {
                Bucket: "kanuki-storage",
                Key: name,
                Expires: 60,
                ACL: 'public-read',
                ContentType: file.type
            }

            s3.getSignedUrl('putObject', params, function(err, data) {
                if (err) {
                    console.log(err);
                    return err;
                } else {
                    console.log(data)
                    var options = {
                        headers: {
                        'Content-Type': file.type,
                        'x-amz-acl': 'public-read'
                        }
                    };

                    return axios.put(data, file, options).then(() => {
                        self.saveData(`https://kanuki-storage.fra1.digitaloceanspaces.com/${name}`)
                    })
                }

            });


        },

        async saveData(link) {
            let mutation

            if (this.type == 'banner') {
                mutation = gql`mutation EditPill($name: ID!, $banner: String) {
                    editPill(name: $name, banner: $banner) {
                        name, banner, avatar
                    }
                }`
            }  
            else {
                mutation = gql`mutation EditPill($name: ID!, $avatar: String) {
                    editPill(name: $name, avatar: $avatar) {
                        name, banner, avatar
                    }
                }`

            }

            let {data} = await this.$apollo.mutate({
                mutation,
                variables: {
                    name: this.id,
                    banner: link,
                    avatar: link
                }
            })

            console.log(link)
            this.$emit(`change-${this.type}`, link + '?' + new Date().getTime()) //Cache breaker

        }

    },

    props: {
        id: String,
        isUser: Boolean,
        type: String
    }
}
</script>

<style lang="scss" scoped>
.input {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 100%;
    position: absolute;
    top:0; bottom: 0; left:0; right: 0;
    z-index: 18;
    cursor: pointer;
}
</style>