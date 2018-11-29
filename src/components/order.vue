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
                                <li class="active">
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
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div id="orderForm" name="orderForm" url="">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                <el-form-item label="收货人姓名" prop="accept_name">
                                    <el-input v-model="ruleForm.accept_name"></el-input>
                                </el-form-item>
                                <el-form-item label="所属地区" prop="area">
                                    <v-distpicker :province="ruleForm.area.province.value" :city="ruleForm.area.city.value" :area="ruleForm.area.area.value" @selected="selectedArea"></v-distpicker>
                                </el-form-item>
                                
                                <el-form-item label="详细地址" prop="address">
                                    <el-input v-model="ruleForm.address"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号码" prop="mobile">
                                    <el-input v-model="ruleForm.mobile"></el-input>
                                </el-form-item>
                                <el-form-item label="电子邮箱" prop="email">
                                    <el-input v-model="ruleForm.email"></el-input>
                                </el-form-item>
                                <el-form-item label="邮政编码" prop="post_code">
                                    <el-input v-model="ruleForm.post_code"></el-input>
                                </el-form-item>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                            <el-radio v-model="ruleForm.payment_id" label="6">支付方式</el-radio>
                                            &nbsp&nbsp<em>手续费：0.00元</em>
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                            <el-radio v-model="ruleForm.express_id" label="1" @change="ruleForm.expressMoment=24">顺丰</el-radio>&nbsp&nbsp<em>运费：24元</em>&nbsp&nbsp
                                            <el-radio v-model="ruleForm.express_id" label="2" @change="ruleForm.expressMoment=15">圆通</el-radio>&nbsp&nbsp<em>运费：15元</em>&nbsp&nbsp
                                            <el-radio v-model="ruleForm.express_id" label="3" @change="ruleForm.expressMoment=8">韵达</el-radio>&nbsp&nbsp<em>运费：8元</em>
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="(item, index) in goodsList" :key="item.id">
                                            <td width="68">
                                                <a target="_blank" href="/goods/show-89.html">
                                                    <img :src="item.img_url" class="img">
                                                </a>
                                            </td>
                                            <td>
                                                <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.buycount*item.sell_price}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <textarea v-model="ruleForm.message" name="message" class="input" style="height:35px;"></textarea>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{ruleForm.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{totalPrice + ruleForm.expressMoment}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <router-link to="/shopCart">返回购物车</router-link>
                                            <a id="btnSubmit" class="btn submit" @click="submitForm('ruleForm')">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VDistpicker from "v-distpicker";
export default {
  name: "order",
  components: { VDistpicker },
  data: function() {
      /* 手机号码 */
      var validateMobile = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'));
        } else {
          let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
          if(reg.test(value)==true){
              callback();
          }else{
              callback(new Error('格式输入错误'));
          }
        }
      };
      /* 电子邮箱 */
      var validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入电子邮箱'));
        } else {
          let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
          if(reg.test(value)==true){
              callback();
          }else{
              callback(new Error('格式输入错误'));
          }
        }
      };
      /* 邮编 */
      var validatePostCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮编'));
        } else {
          let reg = /^[1-9]\d{5}(?!\d)$/;
          if(reg.test(value)==true){
              callback();
          }else{
              callback(new Error('格式输入错误'));
          }
        }
      };
    return {
      ids: "",
      goodsList: [],
      totalCount: 0,
      totalPrice: 0,
      ruleForm: {
        /* 收货人姓名 */
        accept_name: "放屁张",
        /* 收货地址 */
        address: "大桥旁边的一个公共厕所",
        /* 手机号码 */
        mobile: "18888886666",
        /* 电子邮箱 */
        email: "fangpizhang@qq.com",
        /* 邮编 */
        post_code: "888888",
        /* 地区 */
        area: {
            province: {
                code: 420000,
                value: "湖北省"
            },
            city: {
                code: 420200,
                value: "黄石市"
            },
            area: {
                code: 420222,
                value: "阳新县"
            }
        },
        /* 支付方式 */
        payment_id: "6",
        /* 快递 */
        express_id: "1",
        /* 运费 */
        expressMoment: 24,
        /* 备注 */
        message: "请勿随地放屁!",
      },
      rules: {
        /* 收货人姓名 */
        accept_name: [
          { required: true, message: "请输入收货人姓名", trigger: "change" },
          { min: 2, max: 10, message: "长度在 3 到 10 个字符", trigger: "change" }
        ],
        /* 收货地址 */
        address: [
          { required: true, message: "请输入详细地址", trigger: "change" },
          { min: 2, message: "张经理只有这么短吗",trigger: "change" }
        ],
        /* 手机号码 */
        mobile: [
            { validator: validateMobile, trigger: 'change' }
          ],
        /* 电子邮箱 */
        email: [
            { validator: validateEmail, trigger: 'change' }
          ],
        /* 邮编 */
        post_code: [
            { validator: validatePostCode, trigger: 'change' }
          ],
      }
    };
  },
  methods: {
      selectedArea(area){
          this.ruleForm.area = area;
      },
      submitForm(formName) {
          /* 表单验证 */
        this.$refs[formName].validate((valid) => {
          if (valid) {
            /* 验证通过 发请求提交订单*/
            this.ruleForm.goodsAmount = this.totalPrice;
            this.ruleForm.goodsids = this.ids;
            let obj = {}
            this.goodsList.forEach(v=>{
                obj[v.id] = v.buycount
            })
            this.ruleForm.cargoodsobj = obj
            //console.log(this.$store.state.cartData)
            //console.log(this.ruleForm)
            this.$axios.post('site/validate/order/setorder',this.ruleForm)
            .then(res=>{
                //console.log(res)
                this.$Message.success('数据提交成功')
                this.$router.push('/payMoney/'+res.data.message.orderid)
                /* 删除选中的商品 */
                this.goodsList.forEach(v=>{
                    this.$store.commit('delOneById',v.id)
                })
            })
          } else {
            /* 验证未通过 */
            this.$Message.warning('数据提交不完整')
            return false;
          }
        });
      },
  },
  created() {
    //console.log(this.$route);
    this.ids = this.$route.params.ids;
    /* 发请求 */
    this.$axios
      .get(`site/validate/order/getgoodslist/${this.ids}`)
      .then(res => {
        //console.log(res)
        this.goodsList = res.data.message;
        res.data.message.forEach(v => {
          v.buycount = this.$store.state.cartData[v.id];
          this.totalCount += v.buycount;
          this.totalPrice += (v.sell_price*v.buycount);
        });
        //console.log(this.goodsList);
      });
  }
};
</script>
<style>
</style>

