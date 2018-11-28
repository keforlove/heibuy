<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input id="txtUserName" v-model.trim="userName" name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                        </div>
                        <div class="input-box">
                            <input id="txtPassword" v-model.trim="password" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input id="btnSubmit" name="btnSubmit" type="submit" @click="login" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
  name: "login",
  data: function() {
    return {
      userName: "",
      password: ""
    };
  },
  methods: {
    login() {
      if (this.userName == "" || this.password == "") {
        this.$Message.warning("哥们,你还有内容没有输入");
      } else {
        this.$axios
          .post("site/account/login", {
            user_name: this.userName,
            password: this.password
          })
          .then(res => {
            console.log(res);
            /* 登录失败 */
            if (res.data.status == 1) {
              this.$Notice.warning({
                title: "友情提示",
                desc: res.data.message
              });
            } else {
              this.$Notice.success({
                title: "欢迎您",
                desc: res.data.message
              });
              //this.$router.push("/order");
              this.$store.commit("changeLoginState", true);
              //this.$router.back();
              this.$router.go(-1)
            }
          });
      }
    }
  }
};
</script>
<style>
.login-box .input-box input {
  height: 42px;
}
</style>
