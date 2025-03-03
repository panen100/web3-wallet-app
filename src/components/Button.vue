<script setup>
import { ref } from "vue";
import { showDialog, showNotify } from "vant";
import "vant/es/dialog/style";
import "vant/es/notify/style";
import * as bip39 from "bip39";
// import ethWallet,{ hdkey } from 'ethereumjs-wallet';
// import Web3 from 'web3';

const show = ref(false);
const password = ref("");
const mnenonic = ref("");

const createWallet = () => {
  show.value = true;
};

const confirmPassword = () => {
  if (password.value == "") {
    showNotify({ type: "danger", message: "请输入密码" });
  } else {
    mnenonic.value = bip39.generateMnemonic();
  }
};
</script>

<template>
  <van-space>
    <van-button type="primary" @click="createWallet">创建钱包</van-button>
    <van-button type="primary">导入钱包</van-button>

    <van-dialog
      v-model:show="show"
      title="请输入密码"
      show-cancel-button
      @confirm="confirmPassword"
    >
      <!-- 可以使用 CellGroup 作为容器 -->
      <van-cell-group inset>
        <van-field
          v-model="password"
          label="密码"
          placeholder="在此处输入..."
          type="password"
        />
      </van-cell-group>
    </van-dialog>
  </van-space>
  <p>{{ mnenonic }}</p>
</template>

<style lang="less">
p {
  user-select: all;
}
</style>
