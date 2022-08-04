<template>
  <div>
    <h1>家庭理财系统</h1>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="form.username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="form.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import basic from "@/api/basic";

export default {
  name: "login",
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      res: {}
    }
  },
  methods: {
    onSubmit: function () {
      basic.login(this.form)
        .then(res => {
          this.res = res;
          this.$store.commit('login', {
            token: res.data
          })
          this.$router.push('/home');
        })
    }
  }
}
</script>

<style scoped>
.mobile {
  width: 418px;
}

</style>
