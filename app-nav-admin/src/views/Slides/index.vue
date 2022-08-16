<template>
    <div class="slides-container">
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
                    <el-button type="primary" @click="showDialog('添加')">添加轮播</el-button>
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
                    label="轮播标题" 
                    prop="title" 
                    width="120px" 
                    align="center">
                </el-table-column>
                <el-table-column 
                    label="轮播图地址" 
                    prop="pic"  
                    align="center">
                </el-table-column>
                <!-- 操作区域 -->
                <el-table-column label="操作" width="120px" align="center">
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
                <el-form-item label="名称" prop="title">
                    <el-input v-model="addForm.title"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="pic">
                    <el-input v-model="addForm.pic"></el-input>
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
            dataList: [],
            searchVal: "",
            // 控制 删除/修改 时的弹窗显示状态
            addDialogVisiable: false,
            // 弹窗
            dialogTitle: "提示",
            // 添加用户的表单数据
            addForm: {
                id: "",
                title: "",
                pic: "",
            },
            // 添加表单的验证规则对象
            addFormRules: {
                pic: [
                    { required: true, message: "请输入地址", trigger: "blur"},
                ],
                title: [
                    { required: true, message: "请输入名称", trigger: "blur"},
                    { max: 20,  message: "名称在1~50个字符之间", trigger: "blur"}
                ]
            },
        };
    },
    methods: {
        // 获取轮播列表
        getAllList() {
            this.$http.user.getSwiper().then(({data}) => {
                this.dataList = data
            })
        },
        // 点击删除按钮
        delItem(id) {
            this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                this.$http.user.delSwiper({ id: id }).then()
                this.$message({
                    type: "success",
                    message: "删除成功!",
                });
                // this.deleteItem(id)
                this.getAllList()
            }).catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除",
                });
            });
        },
        // 修改分类
        editItem() {
            this.$http.user.editSwiper({
                title: this.addForm.title,
                pic: this.addForm.pic,
                id: this.addForm.id
            }).then((data) => {
                if(data.status === 200) {
                    this.getAllList()
                    this.addDialogVisiable = false
                    this.$message({
                        type: "success",
                        message: "修改成功!",
                    });
                }
            })
        },
        // 添加轮播
        addItem() {
            this.$http.user.addSwipwe({
                title: this.addForm.title,
                pic: this.addForm.pic
            }).then((data) => {
                if(data.status === 200) {
                    this.getAllList()
                    this.addDialogVisiable = false
                    this.$message({
                        type: "success",
                        message: "添加成功!",
                    });
                }
            })
        },
        // 添加或修改时显示弹窗
        showDialog(typeStr, row) {
            this.addDialogVisiable = true // 显示弹窗
            this.dialogTitle = typeStr
            if(row) {
                this.addForm.id = row.id
                this.addForm.title = row.title
                this.addForm.pic = row.pic
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