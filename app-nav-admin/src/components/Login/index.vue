<template>
    <div class="login-register">
        <div class="contain">
            <div class="big-box">
                <div class="big-contain">
                    <div class="btitle">后台管理系统</div>
                    <el-form ref="formRef" :model="formData" :rules="formRules" class="bform">
                        <!-- 用户名-->
                        <el-form-item prop="username">
                            <el-input v-model="formData.username" prefix-icon="iconfont icon-user" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <!-- 密码-->
                        <el-form-item prop="password">
                            <el-input v-model="formData.password" prefix-icon="iconfont icon-3702mima" placeholder="请输入密码" type="password"></el-input>
                        </el-form-item>
                    </el-form>
                    <button class="login_btn" @click="login">登录</button>
                </div>
            </div>
            <!-- 切换登录/注册 -->
            <div class="small-box">
                <div class="small-contain">
                    <div class="stitle">你好，朋友!</div>
                    <p class="scontent">感谢您的支持，本项目免费开源</p>
                    <button class="to-path">
                        <a href="https://gitee.com/lifeixue/app-nav" target="_blank">前往 GITEE 下载源码</a>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "login-register",
    data() {
        return {
            // 表单的数据绑定
            formData: {
                username: "",
                password: "",
            },
            // 表单验证规则
            formRules: {
                username: [
                    {
                        required: true,
                        message: "请输入登录名称",
                        trigger: "blur",
                    },
                    {
                        min: 3,
                        max: 10,
                        message: "用户名长度在 3 到 10 个字符",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur",
                    },
                    {
                        min: 6,
                        max: 16,
                        message: "密码长度在 6 到 16 个字符",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        // 登录
        login() {
            // 表单数据规则校验
            this.$refs.formRef.validate((valid) => {
                if (!valid) {
                    return;
                }
                // 校验通过,发起登录请求
                this.$http.user.loginAdmin({
                    username: this.formData.username,
                    password: this.formData.password
                }).then((data) => {
                    if (data.status === 200) {
                        sessionStorage.setItem("token", "adminToken")
                        this.$message.success("登录成功")
                        this.$router.push("/home")
                    } else {
                        this.$message.warning(data.message);
                        sessionStorage.removeItem("token")
                    }
                })
            });
        },
        // 重置
        resetLoginForm() {
            this.$refs.formRef.resetFields();
        },
    },
};
</script>

<style scoped="scoped">
.login-register {
    position: relative;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    background: linear-gradient(to right,rgba(57, 167, 176),rgba(56, 183, 145));
}
.contain {
    width: 60%;
    height: 60%;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
}
/* 登录/注册表单样式 */
.big-box {
    width: 70%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 30%;
}
.big-contain {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.btitle {
    font-size: 1.5em;
    font-weight: bold;
    color: rgb(57, 167, 176);
}
.bform {
    width: 40%;
    height: 40%;
    padding: 2em 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    /* align-items: center; */
}
.login_btn, .reg_btn {
    width: 20%;
    height: 40px;
    border-radius: 24px;
    border: none;
    outline: none;
    background-color: rgb(57, 167, 176);
    color: #fff;
    font-size: 0.9em;
    cursor: pointer;
}
/* 小盒子样式 */
.small-box {
    width: 30%;
    height: 100%;
    background: linear-gradient(135deg, rgba(57, 167, 176), rgba(56, 183, 145));
    position: absolute;
    top: 0;
    right: 0;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
}
.small-contain {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.stitle {
    font-size: 1.5em;
    font-weight: bold;
    color: #fff;
}
.scontent {
    font-size: 0.9em;
    color: #fff;
    text-align: center;
    padding: 2em 4em;
    line-height: 1.7em;
}
.to-path {
    width: 60%;
    height: 40px;
    border-radius: 24px;
    border: 1px solid #fff;
    outline: none;
    background-color: transparent;
    color: #fff;
    font-size: 0.9em;
    cursor: pointer;
}
.to-path a {
    color: #fff;
    text-decoration: none;
}
</style>
