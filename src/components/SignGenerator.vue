<template>
  <div h-60 flex justify-between>
    <h1 class="leading-36 text-[24px]">邮件签名生成器</h1>
  </div>
  <ElCard w-full>
    <ElForm
      :model="form"
      label-width="120px"
      require-asterisk-position="right"
      pr-20
      pt-20
    >
      <ElFormItem label="职位" required>
        <ElInput v-model="form.title" />
      </ElFormItem>
      <ElFormItem label="姓名" required>
        <ElInput v-model="form.name" />
      </ElFormItem>
      <ElFormItem label="电话" required>
        <ElInput v-model="form.phone" />
      </ElFormItem>
      <ElFormItem label="城市列表" required>
        <InputTag @change="onCitysChange" />
      </ElFormItem>
      <ElFormItem label="所在地" required>
        <div flex flex-col w-full>
          <div
            v-for="(item, index) in form.regions"
            :key="index"
            flex
            items-center
            justify-between
            mb-8
          >
            <ElInput v-model="item.address" placeholder="办公地址" flex-1>
              <template #prepend>
                <ElSelect v-model="item.city" placeholder="城市">
                  <ElOption
                    v-for="city in form.citys"
                    :key="city"
                    :label="city"
                    :value="city"
                  />
                </ElSelect>
              </template>
            </ElInput>
            <div flex>
              <ElButton
                type="primary"
                :icon="Plus"
                circle
                ml-10
                @click="addRegion(index)"
              />
              <ElButton
                :icon="Minus"
                circle
                :disabled="form.regions?.length <= 1"
                @click="deleteRegion(index)"
              />
            </div>
          </div>
        </div>
      </ElFormItem>
      <ElFormItem label="logo" required>
        <ElInput v-model="form.logo" />
      </ElFormItem>
      <ElFormItem label="事业线" required>
        <div flex flex-col w-full>
          <div
            v-for="(item, index) in form.businesses"
            :key="index"
            flex
            items-center
            mb-8
            class="business"
          >
            <!-- <ElInput v-model="item.name" placeholder="事业线名称" />
            <ElInput v-model="item.website" placeholder="网址" /> -->
            <ElInput v-model="item.website" placeholder="网址">
              <template #prepend>
                <ElInput v-model="item.name" placeholder="名称" />
              </template>
            </ElInput>
            <ElButton
              type="primary"
              :icon="Plus"
              circle
              ml-10
              @click="addBusiness(index)"
            />
            <ElButton
              :icon="Minus"
              circle
              :disabled="form.businesses?.length <= 1"
              @click="deleteBusiness(index)"
            />
          </div>
        </div>
      </ElFormItem>
    </ElForm>
  </ElCard>
  <h4>预览</h4>
  <ElCard w-full>
    <div v-html="html" />
  </ElCard>
  <h4>代码</h4>
  <div class="code" v-text="html" />
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import {
  ElButton,
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
  ElOption,
  ElSelect
} from 'element-plus';
import { Plus, Minus } from '@element-plus/icons-vue';
import InputTag from './InputTag.vue';

const form = reactive({
  title: 'Designer',
  name: 'Panda WANG',
  phone: '+86 175-2109-6154',
  regions: [
    {
      city: 'SHANGHAI',
      address: '哈尔滨路 160 号老洋行 1913 创意园 A116-119'
    }
  ],
  citys: ['SHANGHAI', 'BEIJING', 'HONG KONG', 'TOKOYO', 'KUALA LUMPUR'],
  delivery: false,
  type: [],
  resource: '',
  desc: '',
  text: '',
  tags: [],
  logo: 'https://pics.kanjian.com/kanjiancom/logo_emali_signature_v2.png',
  businesses: [
    {
      name: '看见音乐',
      website: 'KANJIAN.COM'
    },
    {
      name: '星球发行',
      website: 'STAR.KANJIAN.COM'
    },
    {
      name: '国际版',
      website: 'EN.KANJIAN.COM'
    }
  ]
});

function onCitysChange(values: string[]) {
  form.citys = values;
}

const html = computed(() => {
  return `
      <div style="font-family: Verdana, sans-serif; font-size: x-small; color:#333;">
        <p>
          ${form.title}&nbsp;·&nbsp;
          <b>${form.name}</b>
        </p>
        <p>Mobile&nbsp;·&nbsp;
          <b>${form.phone}</b>
        </p>
        <p>
          ${form.regions
            .filter((region) => region.city && region.address)
            .map(
              (region) => `<p>${region.city}&nbsp;·&nbsp;${region.address}</p>`
            )
            .join('')}
        </p>
        <img src="https://pics.kanjian.com/kanjiancom/logo_emali_signature_v2.png" style="width:260px;height:60px;">
        <p>${form.citys.join(' · ')}</p>
        <div>
          ${form.businesses
            .filter((business) => business.name && business.website)
            .map(
              (business) =>
                `<p style="display: grid;grid-gap: 10px;grid-template-columns: 88px 1fr;">${business.name}
            <a href="https://${business.website}" target="_blank">
              <b style="color:#0000ff">${business.website}</b>
            </a>
          </p>`
            )
            .join('')}
        </div>
      </div>`;
});

// <div style="display: flex;">
//           <div  style="display: flex; flex-direction: column;">
//             ${form.businesses
//               .filter((business) => business.name && business.website)
//               .map((business) => `<p>${business.name}</p>`)}
//           </div>
//           <div  style="display: flex; flex-direction: column;">
//             ${form.businesses
//               .filter((business) => business.name && business.website)
//               .map(
//                 (business) =>
//                   `<p>
//             <a href="https://${business.website}" target="_blank">
//               <b style="color:#0000ff">${business.website}</b>
//             </a>
//           </p>`
//               )}
//           </div>
//         </div>
// <div>
//           ${form.businesses
//             .filter((business) => business.name && business.website)
//             .map(
//               (business) =>
//                 `<p style="display: grid;grid-gap: 10px;grid-template-columns: 88px 1fr;">${business.name}
//             <a href="https://${business.website}" target="_blank">
//               <b style="color:#0000ff">${business.website}</b>
//             </a>
//           </p>`
//             )
//             .join('')}
//         </div>

function addRegion(index: number) {
  form.regions.splice(index + 1, 0, {
    city: '',
    address: ''
  });
}
function deleteRegion(index: number) {
  form.regions.splice(index, 1);
}

function addBusiness(index: number) {
  form.businesses.splice(index + 1, 0, {
    name: '',
    website: ''
  });
}
function deleteBusiness(index: number) {
  form.businesses.splice(index, 1);
}
</script>

<style lang="scss">
.business .el-input-group__prepend {
  padding: 0;
  box-shadow: none;
}
.code {
  white-space: pre-wrap;
  background-color: #f5f5f5;
  font-size: 12px;
  line-height: 1.5;
  color: #333;
  font-family: monospace;
  border-radius: 2px;
  box-shadow: var(--el-box-shadow-light);
}

/* .el-form-item.is-required .el-form-item__label {
  color: #333333;
  font-weight: 600;
} */
.el-form-item.is-required .el-form-item__label::after {
  color: #0000ff !important;
}
.el-button.is-circle {
  width: 24px;
  height: 24px;
}
.el-input-group__prepend {
  padding: 0 20px;
}
</style>
