<script setup>
import { ref } from "vue";
import ButtonVue from "./components/Button.vue";
</script>

<template>
  <body>
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100vh;
        padding: 20px;
        box-sizing: border-box;
        overflow: hidden;
      "
    >
      <!-- 顶部内容 -->
      <div style="text-align: center; width: 100%">
        <h1>让我们开始吧</h1>
        <p style="max-width: 80%; margin: 0 auto">
          MIMI-Wallet深受数百万人信任，是一款可以让所有进入web3世界的安全钱包。
        </p>
        <img
          src="./img/logo.png"
          alt="Logo"
          style="max-width: 80%; height: auto; object-fit: contain"
        />
      </div>

      <!-- 复选框 + 按钮 -->
      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        "
      >
        <div>
          <input type="checkbox" id="agree" />
          <a
            href="https://baike.baidu.com/item/%E6%9A%B9%E7%BD%97%E7%8C%AB/556082"
            target="_blank"
            >我同意MIMI-Wallet的使用条款</a
          >
          <!-- <label for="agree">
            我同意MIMI-Wallet的使用条款</label> -->
        </div>

        <ButtonVue />
      </div>
    </div>
  </body>
  <ButtonVue />
</template>

<style lang="less"></style>
