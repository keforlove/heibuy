<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-show="goodsList.length == 0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-show="goodsList.length != 0" v-for="(item, index) in goodsList" :key="item.id">
                                    <td>
                                        <el-switch v-model="item.selected" active-color="#13ce66" inactive-color="#ff4949">
                                        </el-switch>
                                    </td>
                                    <td><img :src="item.img_url" alt=""></td>
                                    <td>{{item.title}}</td>
                                    <td>{{item.sell_price}}</td>
                                    <td>
                                        <el-input-number v-model="item.buycount" @change="changCount(item.id,item.buycount)" :min="0" label="描述文字"></el-input-number>
                                    </td>
                                    <td>{{item.sell_price*item.buycount}}</td>
                                    <td>
                                        <el-button @click="delOne(item.id)" type="danger" icon="el-icon-delete" circle></el-button>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{totalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <router-link :to="'/order/'+checkIds">
                            <button class="submit" >立即结算</button>
                            </router-link>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "shopCart",
  data: function() {
    return {
      goodsList: [],
    };
  },
  methods: {
    changCount(id, newCount) {
      this.$store.commit("updateCart", {
        id,
        newCount
      });
    },
    delOne(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$store.commit('delOneById',id)
            this.goodsList.forEach((v,index)=>{
                if(v.id == id){
                    this.goodsList.splice(index,1)
                }
            })
          this.$message({  
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
  created() {
    let ids = "";
    for (let key in this.$store.state.cartData) {
      ids += key;
      ids += ",";
    }
    ids = ids.slice(0, -1);
    //console.log(ids);
    /* 发请求 */
    this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(res => {
      //console.log(res);
      this.goodsList = res.data.message;
      res.data.message.forEach(v => {
        v.buycount = this.$store.state.cartData[v.id];
        this.$set(v,'selected',true)
        //v.selected = true;
      });
    });
  },
  computed: {
    totalCount() {
      let num = 0;
      this.goodsList.forEach(v => {
        if (v.selected == true) {
          num += v.buycount;
        }
      });
      return num;
    },
    totalPrice() {
      let price = 0;
      this.goodsList.forEach(v => {
        if (v.selected == true) {
          price += v.buycount * v.sell_price;
        }
      });
      return price;
    },
    checkIds(){
        let ids = '';
        this.goodsList.forEach(v=>{
            //console.log(v)
            if(v.selected == true){
                ids += v.id;
                ids += ','
            }   
        })
        ids = ids.slice(0,-1);
        return ids
        console.log(ids);
    }
  },
  /* 深度侦听 */
  /* watch: {
      goodsList: {
          handler: function (val, oldVal) {
              console.log(val)
              let obj = {}
              val.forEach(v=>{
                  obj[v.id] = v.buycount;
              })
              this.$store.commit('updateCart',obj)
           },
          deep: true
      }
  } */
}; 
</script>
<style>
td img {
  width: 100px;
}
</style>
