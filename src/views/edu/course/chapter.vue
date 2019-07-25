<template >
  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="active" finish-status="success" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="发布课程"/>
    </el-steps>

    <!--课程章节列表 TODO-->

    <div style="text-align:center">
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
    </div>
  </div>
</template>

<script>
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'

export default {
  data() {
    return {
      active: 1,
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseId: '',
      subjectNestedList: []
    }
  },

  created() {
    console.log('chapter created')
    this.init()
  },

  methods: {
    previous() {
      console.log('previous')
      this.$router.push({
        path: '/edu/course/info/' + this.courseId
      })
    },
    next() {
      console.log('next')
      this.$router.push({ path: '/edu/course/publish/' + this.courseId })
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id
        const id = this.$route.params.id
        this.fetchCourseInfoById(id)
      }
    },
    fetchCourseInfoById(id) {
      console.log('准备查询的id' + id)
      course.getCourseInfoById(id).then(response => {
        this.courseInfo = response.data.item

        subject.getNestedTreeList().then(response => {
          this.subjectNestedList = response.data.items

          // 遍历一级分类 二级分类的parentId=一级分类的id
          for (let i = 0; i < this.subjectNestedList.length; i++) {
            if (this.subjectNestedList[i].id === this.courseInfo.subjectParentId) {
              this.subSubjectList = this.subjectNestedList[i].children
            }
          }
        })
      })
    }
  }
}
</script>
