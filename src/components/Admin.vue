<template>
    <div class="row">
        <!-- 新的商品 -->
       <div class="col-md-8 col-sm-12">
           <my-app-pizza></my-app-pizza>
       </div>

       <!-- 管理 -->
        <div class="col-md-4 col-sm-12">
            <h3 class="twxt-muted my-5">菜单</h3>
            <table class="table">
                <thead class="table table-default">
                    <tr>
                        <th>品种</th>
                        <th>删除</th>
                    </tr>
                </thead>
                <tbody v-for="item in getMenuData" :key="item.name">
                    <tr>
                        <td>{{item.name}}</td>
                        <td>
                            <button @click="deleteData(item)" class="btn btn-outline-danger btn-sm">&times;</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
  </div>
   

</template>

<script>
import newPizza from "./newPizza.vue";
export default {
  data() {
    return {
      getMenuData: []
    };
  },
  components: {
    "my-app-pizza": newPizza
  },
  created() {
    fetch("https://wd5136467665zctkda.wilddogio.com/menu.json")
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        let menuArray = [];
        for (let key in data) {
          // console.log(key)
          data[key].id = key
          // console.log(data[key].id)
          menuArray.push(data[key])
        }
        this.getMenuData = menuArray
      })
      .catch(err => console.log(err));
  },
  methods:{
      deleteData(item){
           fetch("https://wd5136467665zctkda.wilddogio.com/menu/"+item.id+".json",{
               method:'DELETE',
               headers:{
                   'Content-type':'application/json'
               },
           })
           .then(() => this.getMenuData.splice(this.getMenuData.indexOf(item.id),1))
           .then(() => this.getMenuData.json())
           .then((data) => console.log(data))
           .catch(err => console.log(err))
      }
  }
};
</script>

