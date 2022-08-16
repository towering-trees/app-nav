<template>
    <div class="setting-conmtainer">
        <el-card class="box-card">
        <el-form
            :model="addForm"
            :rules="addFormRules"
            ref="addFormRef"
            label-width="70px">
            <el-form-item label="名称" prop="title">
                <el-input v-model="addForm.title"></el-input>
            </el-form-item>
            <el-form-item label="公告" prop="notice">
                <el-input v-model="addForm.notice"></el-input>
            </el-form-item>
            <el-button type="primary" @click="submit_ok">确定</el-button>
        </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 添加用户的表单数据
            addForm: {
                id: "",
                title: "", // 网站名称
                notice: "", // 公告
            },
            // 添加表单的验证规则对象
            addFormRules: {
                title: [
                    { required: true, message: "请输入网站名称", trigger: "blur"},
                    { max: 20,  message: "名称在1~10个字符之间", trigger: "blur"}
                ],
                notice: [
                    { required: true, message: "请输入公告", trigger: "blur"},
                    { max: 50,  message: "名称在1~50个字符之间", trigger: "blur"}
                ],
            },
        };
    },
    methods: {
        // 获取网站信息
        getInfo() {
            this.$http.user.getWebInfo().then(({data}) => {
                this.addForm.title = data[0].title
                this.addForm.notice = data[0].notice
                this.addForm.id = data[0].id
            })
        },
        // 修改网站信息
        submit_ok() {
            // 验证表单规则是否通过
            this.$refs.addFormRef.validate((valid) => {
                // 验证失败
                if (!valid) return;
                // 验证通过，发起网络请求
                this.$http.user.setWebInfo({
                    notice: this.addForm.notice,
                    title: this.addForm.title,
                    id: this.addForm.id
                }).then((data) => {
                        if(data) {
                            this.$message({
                            type: "success",
                            message: "修改成功!",
                        });
                    } 
                })
            });
        },
    },
    created() {
        this.getInfo()
    }
};
</script>

<style lang="less" scoped>
</style>