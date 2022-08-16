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
                    <el-button type="primary" @click="showDialog('添加')">添加应用</el-button>
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
                    label="名称" 
                    prop="title" 
                    width="120px" 
                    align="center">
                </el-table-column>
                <el-table-column 
                    label="图片" 
                    prop="pic" 
                    align="center">
                </el-table-column>
                <el-table-column 
                    label="详情" 
                    prop="details" 
                    align="center">
                </el-table-column>
                <el-table-column 
                    label="下载地址" 
                    prop="url" 
                    align="center">
                </el-table-column>
                <el-table-column 
                    label="下载量" 
                    prop="num" 
                    width="120px" 
                    align="center">
                </el-table-column>
                <el-table-column 
                    label="所属分类" 
                    prop="class" 
                    width="120px" 
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
                <el-form-item label="名称" prop="title">
                    <el-input v-model="addForm.title"></el-input>
                </el-form-item>
                <el-form-item label="图标" prop="pic">
                    <el-input v-model="addForm.pic"></el-input>
                </el-form-item>
                <el-form-item label="详情" prop="details">
                    <el-input v-model="addForm.details"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="url">
                    <el-input v-model="addForm.url"></el-input>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input v-model="addForm.num"></el-input>
                </el-form-item>
                <el-form-item label="分类" prop="class">
                    <el-select v-model="addForm.class" placeholder="请选择">
                        <el-option
                            v-for="item in classifyArr"
                            :key="item.id"
                            :label="item.classify"
                            :value="item.classify">
                        </el-option>
                    </el-select>
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
                title: "", // 应用名称
                pic: "", // 应用图标
                details: "", // 应用详情
                url: "", // 下载地址
                num: "", // 下载量
                class: "", // 所属分类
            },
            // 添加表单的验证规则对象
            addFormRules: {
                title: [
                    { required: true, message: "请输入名称", trigger: "blur"},
                    { max: 20,  message: "名称在1~20个字符之间", trigger: "blur"}
                ],
                pic: [
                    { required: true, message: "请输入图标地址", trigger: "blur"}
                ],
                details: [
                    { required: true, message: "请输入详情", trigger: "blur"}
                ],
                url: [
                    { required: true, message: "请输入下载地址", trigger: "blur"}
                ],
                class: [
                    { required: true, message: "请选择分类", trigger: "blur"}
                ]
            },
            // 分类
            classifyArr: [],
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
        // 获取应用列表
        getAllList() {
            this.$http.user.get_apps({
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
                this.$http.user.delete_app({ id: id }).then()
                this.$message({
                    type: "success",
                    message: "删除成功!",
                });
                this.getAllList()
            }).catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除",
                });
            });
        },
        // 修改应用
        editItem() {
            this.$http.user.edit_app({
                title: this.addForm.title,
                pic: this.addForm.pic,
                details: this.addForm.details,
                url: this.addForm.url,
                num: this.addForm.num,
                class: this.addForm.class,
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
        // 添加应用
        addItem() {
            this.$http.user.add_app({
                title: this.addForm.title,
                pic: this.addForm.pic,
                details: this.addForm.details,
                url: this.addForm.url,
                num: this.addForm.num,
                class: this.addForm.class,
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
            this.addDialogVisiable = true
            this.dialogTitle = typeStr
            if(row) {
                this.addForm.id = row.id
                this.addForm.title = row.title
                this.addForm.pic = row.pic
                this.addForm.details = row.details
                this.addForm.url = row.url
                this.addForm.num = row.num
                this.addForm.class = row.class
            } else {
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
        // 获取分类列表
        getClassifyAll() {
            this.$http.user.getClassify().then(({data}) => {
                this.classifyArr = data
            })
        },
    },
    created() {
        this.getAllList()
        this.getClassifyAll()
    },
};
</script>

<style lang="less" scoped>
</style>