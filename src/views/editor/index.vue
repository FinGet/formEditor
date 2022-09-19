<template>
  <div>
    <visual-editor
      v-model="jsonData"
      :config="visualConf"
      :form-data="formData"
      :customProps="customProps"
    >
      <!-- <template #subBtn>
        <el-button v-if="formData.food === 'dangao'">自定义的按钮</el-button>
        <el-tag v-else>自定义的标签</el-tag>
      </template> -->
    </visual-editor>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { VisualEditor } from '@/components/visualEditor';
  import jsonData from './data.json';
  import { visualConf } from './visual.config';
  import { ElNotification } from 'element-plus';

  const formData = reactive({
    username: 'admin',
    food: '',
    acctType: '',
  });
  const customProps = {
    subBtn: {
      onClick: () => {
        ElNotification.success({ message: '执行表单数据校验以及提交到服务器的动作' });
      },
    },
    mySelect: {
      onChange: (val: string) => {
        // _this?.appContext.config.globalProperties.$message.success(`食物发生变化:${val}`);
        formData.acctType = '';
      },
    },
  };
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
}
</style>
