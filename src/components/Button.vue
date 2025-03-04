<script setup>
import { ref } from "vue";
import { showDialog, showNotify } from "vant";
import "vant/es/dialog/style";
import "vant/es/notify/style";
import * as bip39 from "bip39";
import { hdkey } from "ethereumjs-wallet";
import store2 from "store2";

const show = ref(false);
const password = ref("");
const mnenonic = ref("");
const mnenonic2 = ref("");
const showMn = ref(false);
const showMnDialog = ref(false);

const createWallet = () => {
  show.value = true;
};

const confirmPassword = () => {
  if (password.value == "") {
    showNotify({ type: "danger", message: "请输入密码" });
  } else {
    const walletInfo = store2.get("walletInfo");
    mnenonic.value = walletInfo
      ? walletInfo[0]["mnemonic"]
      : bip39.generateMnemonic();
    showMn.value = true;
  }
};

const confirmSaveMnemonic = () => {
  showMnDialog.value = true;
};

const confirmMn = async () => {
  console.log(mnenonic.value);
  console.log(mnenonic2.value);
  showMn.value = false;
  if (mnenonic.value == mnenonic2.value) {
    const seed = await bip39.mnemonicToSeed(mnenonic.value);
    const hdWallet = hdkey.fromMasterSeed(seed);
    const storeWallet = store2.get("walletInfo") || [];
    const addressIndex = storeWallet.length == 0 ? 0 : storeWallet.length + 1;
    const keyPair = hdWallet.derivePath(`m/44'/60'/0'/0'/${addressIndex}`);
    const wallet = keyPair.getWallet();

    const lowerCaseAddress = wallet.getAddressString();
    const checkSumAddress = wallet.getChecksumAddressString();
    const privateKey = wallet.getPrivateKey().toString("hex");
    const keyStore = await wallet.toV3(password.value);
    const walletInfo = [
      {
        id: addressIndex,
        address: lowerCaseAddress,
        privateKey,
        keyStore,
        mnenonic: mnenonic.value,
        balance: 0,
      },
    ];
    store2("walletInfo", walletInfo);
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

  <template v-if="showMn">
    <p>{{ mnenonic }}</p>
    <van-button size="mini" @click="confirmSaveMnemonic"
      >我已保存助记词</van-button
    >

    <van-dialog
      v-model:show="showMnDialog"
      title="请按照顺序输入助记词"
      show-cancel-button
      @confirm="confirmMn"
    >
      <!-- 可以使用 CellGroup 作为容器 -->
      <van-cell-group inset>
        <van-field
          v-model="mnenonic2"
          label="助记词"
          placeholder="在此处输入..."
        />
      </van-cell-group>
    </van-dialog>
  </template>
</template>

<style lang="less">
p {
  user-select: all;
}
</style>
