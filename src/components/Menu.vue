<template>
    <div class="row">
        <!-- 菜单 -->
        <div class="col-md-8 col-sm-12">
            <table class="table">
                <thead class="thead-default">
                    <tr>
                        <th>尺寸(寸)</th>
                        <th>价格(RMB)</th>
                        <th>加入</th>
                    </tr>
                </thead>
                <tbody v-for="item in getMenuItems" :key="item.name">
                    <tr>
                        <td><strong>{{item.name}}</strong></td>
                    </tr>
                    <tr v-for="option in item.options" :key="option.size">
                        <td>{{option.size}}</td>
                        <td>{{option.price}}</td>
                        <td><button class="btn btn-sm btn-outline-success" @click="addToBasket(item,option)">+</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 购物车 -->
        <div class="col-md-4 col-sm-12">
            <div v-if="baskets.length > 0">
                <table class="table">
                <thead class="thead-default">
                    <tr>
                        <th>数量</th>
                        <th>品种</th>
                        <th>价格</th>
                    </tr>
                </thead>
                <tbody v-for="item in baskets" :key="item.name">
                    <tr>
                        <td>
                        <button class="btn btn-light btn-sm" @click="decreaseQuantity(item)">-</button>
                        <span>{{item.quantity}}</span>
                        <button class="btn btn-sm btn-light" @click="increaseQuantity(item)">+</button>
                        </td>
                        <td>{{item.name}}{{item.size}}寸</td>
                        <td>{{item.price * item.quantity}}</td>
                    </tr>
                </tbody>
            </table>
            <p>总价:{{total +'RMB'}}</p>
            <div class="row">
              <button class="btn btn-success col-sm-6">提交订单</button>
              <button class="btn btn-danger col-sm-6" @click="clearBasket">清空购物车</button>
            </div>
            
            </div>
            <div v-else class="text-center">
                {{basketEmptyText}}
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      baskets: [],
      basketEmptyText: "还没有选购商品",
      // getMenuItems: {}
    };
  },
  created() {
    this.getMenuData();
  },
  methods: {
    addToBasket(item, option) {
      let basket = {
        name: item.name,
        size: option.size,
        price: option.price,
        quantity: 1
      };
      if (this.baskets.length > 0) {
        let result = this.baskets.filter(basket => {
          return basket.name === item.name && basket.size === option.size;
        });
        if (result != null && result.length > 0) {
          result[0].quantity++;
        } else {
          this.baskets.push(basket);
        }
      } else {
        this.baskets.push(basket);
      }
    },
    increaseQuantity(item) {
      item.quantity++;
    },
    decreaseQuantity(item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.removeBaseketItem(item);
      }
    },
    removeBaseketItem(item) {
      this.baskets.splice(this.baskets.indexOf(item), 1);
    },
    getMenuData() {
      // 使用fetch获取数据
      // fetch("https://wd5136467665zctkda.wilddogio.com/menu.json")
      //   .then(res => res.json())
      //   .then(data => {
      //     this.getMenuItems = data
      //   })
      //   .catch(err =>console.log(err))

      // 使用axios获取数据
      // this.http.get("menu.json").then(res => (this.getMenuItems = res.data));

      // 将请求到的数据存储到vuex中
      this.http.get("menu.json").then(res => this.$store.commit('setMenuItems',res.data));
    },
    clearBasket(){
      if(window.confirm("确认清空购物车？")){
        this.baskets = []
      }
    }
  },
  computed: {
    // 在 vuex 中获取数据
    getMenuItems(){
      // return this.$store.state.menuItems

      return this.$store.getters.getMenuItems
    },
    total() {
      let totalCost = 0;
      for (let item in this.baskets) {
        let currentItem = this.baskets[item];
        totalCost += currentItem.price * currentItem.quantity;
      }
      return totalCost;
    }
  }
};
</script>

