<template>
  <div class="home">
    <Head
      :title="workName"
      :userName="userName"
      :companyName="companyName"
    ></Head>
    <router-view></router-view>
  </div>
</template>

<script>
import Head from "@/components/head";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapGetters(["workName", "userName", "companyName"]),
  },
  created() {},
  components: {
    Head,
  },
};
</script>
<style lang="less" scoped>
</style>
