<template>
  <div class="father_box" @click="onclick">
    <div v-for="(item, index) in citys" :key="index" inline-block>
      <ElTag closable m-4 @close="deleteTags(index)">
        {{ item }}
      </ElTag>
    </div>
    <ElInput
      ref="inputRef"
      v-model="currentval"
      placeholder="输入城市名，按<回车>分隔"
      :style="inputStyle"
      type="text"
      class="inputTag"
      @keyup.enter="addTags"
    />
  </div>
</template>

<script setup lang="ts">
import { ElInput, ElMessage, ElTag } from 'element-plus';
import { computed, nextTick, ref, watch } from 'vue';
const currentval = ref('');
const citys = ref([
  'SHANGHAI',
  'BEIJING',
  'HONG KONG',
  'TOKOYO',
  'KUALA LUMPUR'
]);
const inputLength = ref(0);
const inputRef = ref<HTMLElement>();
const inputStyle = computed(() => ({ width: `${inputLength.value}px` }));

const emits = defineEmits<{
  (e: 'change', val: string[]): void;
}>();

watch(
  () => citys.value.length,
  () => {
    emits('change', citys.value);
  }
);
watch(
  currentval,
  (newValue) => {
    // 实时改变input输入框宽度，防止输入内容超出input默认宽度显示不全
    inputLength.value = newValue.length * 12 + 50;
  },
  { immediate: true }
);

function addTags() {
  //新增函数中可以加一些你所需要的校验规则。比如只能是数子，或者不能输入‘，’等
  if (currentval.value) {
    if (citys.value.includes(currentval.value)) {
      ElMessage.warning('当前城市已经存在！');
      return;
    }
    citys.value = [...citys.value, currentval.value];
    currentval.value = '';
  }
}

function deleteTags(index) {
  citys.value.splice(index, 1);
}
function onclick() {
  nextTick(() => {
    inputRef.value?.focus();
  });
}
</script>

<style>
/* 外层div */
.father_box {
  /* width: 300px; */
  box-sizing: border-box;
  background-color: white;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  font-size: 12px;
  text-align: left;
  padding-left: 5px;
  word-wrap: break-word;
  overflow: hidden;
}
.inputTag {
  width: auto;
  min-width: 250px;
  vertical-align: top;
}
.inputTag .el-input__wrapper,
.inputTag .el-input__wrapper:hover,
.inputTag .el-input__wrapper.is-focus {
  box-shadow: none;
}
</style>
