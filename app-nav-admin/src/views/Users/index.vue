<template>
    <div class="apps-container">
        <!-- 卡片视图 -->
        <el-card class="box-card">
            <!-- 搜索与添加 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input v-model="searchVal" placeholder="请输入内容">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="showDialog('添加')">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 列表区域 -->
            <el-table :data="dataList" border stripe>
                <el-table-column 
                    label="#" 
                    type="index" 
                    align="center">
                </el-table-column>
                <el-table-column 
                    label="用户名" 
                    prop="username" 
                    width="200px" 
                    align="center">
                </el-table-column>
                <el-table-column 
                    label="密码" 
                    prop="password" 
                    width="200px" 
                    align="center">
                </el-table-column>
                <el-table-column 
                    label="昵称" 
                    prop="nickname" 
                    width="200px" 
                    align="center">
                </el-table-column>
                <el-table-column 
                    label="头像" 
                    prop="avatar" 
                    align="center">
                </el-table-column>
                <!-- 操作区域 -->
                <el-table-column label="操作" width="200px" align="center">
                    <template #default="scope">
                        <!-- 修改按钮 -->
                        <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showDialog('修改', scope.row)"></el-button>
                        </el-tooltip>
                        <!-- 删除按钮 -->
                        <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delItem(scope.row.id)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page_num"
                :page-sizes="[2, 5, 10, 20]"
                :page-size="page_size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
        <!-- 添加/修改时的弹窗 -->
        <el-dialog
            :title="dialogTitle"
            :visible.sync="addDialogVisiable"
            width="50%"
            @close="addDialogCloesd"
        >
            <el-form
                :model="addForm"
                :rules="addFormRules"
                ref="addFormRef"
                label-width="70px"
            >
                <el-form-item label="名称" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="addForm.nickname"></el-input>
                </el-form-item>
                <el-form-item label="头像" prop="avatar">
                    <el-input v-model="addForm.avatar"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisiable = false">取消</el-button>
                <el-button type="primary" @click="submit_ok">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            value: '100',
            dataList: [],
            page_num: 1,
            page_size: 10,
            total: null,
            searchVal: "",
            // 控制 删除/修改 时的弹窗显示状态
            addDialogVisiable: false,
            // 弹窗
            dialogTitle: "提示",
            // 添加用户的表单数据
            addForm: {
                id: "",
                username: "", // 用户名
                password: "", // 密码
                nickname: "", // 昵称
                avatar: "", // 头像
            },
            // 添加表单的验证规则对象
            addFormRules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur"},
                    { max: 10,  message: "名称在3~10个字符之间", trigger: "blur"}
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur"},
                    { min: 6,  max: 16,  message: "密码长度在6~16个字符之间", trigger: "blur"}
                ],
                nickname: [
                    { required: false, message: "请输入昵称", trigger: "blur"},
                    { max: 10,  message: "昵称在3~10个字符之间", trigger: "blur"}
                ],
                avatar: [
                    { required: false, message: "请输入头像地址", trigger: "blur"}
                ],
            },
        };
    },
    methods: {
        //切换每页条数容量
        handleSizeChange(val) {
            this.page_size = val
            this.getAllList()
        },
        //切换当前页
        handleCurrentChange(val) {
            this.page_num = val
            this.getAllList()
        },
        // 获取用户列表
        getAllList() {
            this.$http.user.userList({
                params: { page_num: this.page_num, page_size: this.page_size }
            }).then(({data, paging}) => {
                this.dataList = data
                this.total = paging.total
            })
        },
        // 点击删除按钮
        delItem(id) {
            this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                this.$http.user.delUser({ id: id }).then()
                this.$message({
                    type: "success",
                    message: "删除用户成功!",
                });
                this.getAllList()
            }).catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除",
                });
            });
        },
        // 修改用户
        editItem() {
            this.$http.user.edit_user({
                username: this.addForm.username,
                password: this.addForm.password,
                nickname: this.addForm.nickname,
                avatar: this.addForm.avatar,
                id: this.addForm.id
            }).then((data) => {
                if(data.status === 200) {
                    this.getAllList()
                    this.addDialogVisiable = false
                    this.$message({
                        type: "success",
                        message: "更新用户成功!",
                    });
                }
            })
        },
        // 添加用户
        addItem() {
            this.$http.user.reguser({
                username: this.addForm.username,
                password: this.addForm.password,
                nickname: this.addForm.nickname,
                avatar: this.addForm.avatar,
                status: 1,
            }).then((data) => {
                if(data.status === 200) {
                    this.getAllList()
                    this.addDialogVisiable = false
                    this.$message({
                        type: "success",
                        message: "添加用户成功!",
                    });
                } else {
                    this.$message({
                        type: "warning",
                        message: data.message,
                    });
                }
            })
        },
        // 添加或修改时显示弹窗
        showDialog(typeStr, row) {
            this.addDialogVisiable = true // 显示弹窗
            this.dialogTitle = typeStr
            if(row) {
                console.log(row);
                this.addForm.id = row.id
                this.addForm.username = row.username
                this.addForm.password = row.password
                this.addForm.nickname = row.nickname
                this.addForm.avatar = row.avatar
            } else {
                // 清空对象中的每个 value 值
                Object.keys(this.addForm).map(key => this.addForm[key] = "")
            }
        },
        // 弹窗确认事件
        submit_ok() {
            // 验证表单规则是否通过
            this.$refs.addFormRef.validate((valid) => {
                // 验证失败
                if (!valid) return;
                // 验证通过，发起网络请求
                if(this.dialogTitle === "修改") return this.editItem()
                if(this.dialogTitle === "添加") return this.addItem()
            });
        },
        // 监听弹窗关闭事件
        addDialogCloesd() {
            this.$refs.addFormRef.resetFields();
        },
    },
    created() {
        this.getAllList()
    },
};
</script>

<style lang="less" scoped>
</style>