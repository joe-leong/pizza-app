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
            <button class="btn btn-success btn-block">提交订单</button>
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
      getMenuItems: []
      // {
      //   1: {
      //     name: "榴莲pizza",
      //     description: "这是喜欢吃榴莲朋友的最佳选择",
      //     options: [
      //       {
      //         size: 9,
      //         price: 38
      //       },
      //       {
      //         size: 12,
      //         price: 48
      //       }
      //     ]
      //   },
      //   2: {
      //     name: "芝士pizza",
      //     description: "芝士杀手,浓浓的芝士丝, 食欲瞬间爆棚",
      //     options: [
      //       {
      //         size: 9,
      //         price: 38
      //       },
      //       {
      //         size: 12,
      //         price: 48
      //       }
      //     ]
      //   },
      //   3: {
      //     name: "夏威夷pizza",
      //     description: "众多人的默认选择",
      //     options: [
      //       {
      //         size: 9,
      //         price: 36
      //       },
      //       {
      //         size: 12,
      //         price: 46
      //       }
      //     ]
      //   }
      // }
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
      fetch("https://wd5136467665zctkda.wilddogio.com/menu.json")
        .then(res => res.json())
        .then(data => {
          let menuArray = [];
          for (let key in data) {
            menuArray.push(data[key])
          }
          this.getMenuItems = menuArray
        })
        .catch(err =>console.log(err))
    }
  },
  computed: {
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

