<template>
    <div>
        <welcome-top></welcome-top>
        <update-text-editor v-bind:song-index="id"></update-text-editor>
    </div>
</template>

<script>
import WelcomeTop from "../components/main-page/WelcomeTop.vue";
import updateTextEditor from "../components/edit-page/updateTextEditor.vue";

export default {
    name: "EditLyric",
    data() {
        return {
            lyric: {}
        };
    },
    computed: {
        id() {
            return Number(this.$route.params.id);
        }
    },
    components: {
        WelcomeTop,
        updateTextEditor
    }
};
</script>

<style></style>
