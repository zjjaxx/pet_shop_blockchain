<template>
  <div class="container">
    <h2 class="title">宠物商店</h2>
    <div class="pet-list">
      <el-row :gutter="20">
        <el-col
          :span="6"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          v-for="item in petList"
          :key="item.id"
        >
          <div class="pet-item">
            <div class="name">{{ item.name }}</div>
            <div class="body">
              <img class="img" :src="item.picture" alt="" />
              <div class="breed">Breed: {{ item.breed }}</div>
              <div class="age">Age: {{ item.age }}</div>
              <div class="location">Location: {{ item.location }}</div>
              <el-button
                :disabled="item.status"
                @click="adopt(item.id)"
                class="adopt-btn"
                type="primary"
                size="small"
                >{{ item.status ? "success" : "adopt" }}</el-button
              >
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { getPets } from "../api/api";
import { useStore } from "vuex";
export default {
  setup() {
    const petList = ref([]);
    const store = useStore();
    const mapAdoptersStatus = async () => {
      const adopters = await await store.state.contractInstance.methods.getAdopters().call()
      adopters.forEach((element, index) => {
        if (adopters[index] !== "0x0000000000000000000000000000000000000000") {
          petList.value[index].status = true;
        }
      });
    };
    const adopt = async (id) => {
      await store.state.contractInstance.methods.adopt(id).send({
        from: store.state.account,
      });
      await mapAdoptersStatus();
    };
    onMounted(async () => {
      petList.value = (await getPets()).data;
      await mapAdoptersStatus();
    });
    return { petList, adopt };
  },
};
</script>

<style lang="less" scoped>
.container {
  .title {
    text-align: center;
  }
  .pet-list {
    margin: 50px auto;
    .pet-item {
      margin-bottom: 20px;
      background-color: #fff;
      border: 1px solid transparent;
      border-radius: 4px;
      box-shadow: 0px 7px 27px 0px #bfbfbf;
      font-size: 14px;
      .name {
        color: #333;
        background-color: #f5f5f5;
        border-color: #ddd;
        padding: 10px 15px;
        border-bottom: 1px solid transparent;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
      }
      .body {
        padding: 15px;
        line-height: 24px;
      }
      .img {
        width: 100%;
        border-radius: 6px;
      }
      .adopt-btn {
        margin-top: 10px;
        color: #fff;
      }
    }
  }

  @media (min-width: 768px) {
    .pet-list {
      width: 750px;
    }
  }
  @media (min-width: 992px) {
    .pet-list {
      width: 970px;
    }
  }
  @media (min-width: 1200px) {
    .pet-list {
      width: 1170px;
    }
  }
}
</style>