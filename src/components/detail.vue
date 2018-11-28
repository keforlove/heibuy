<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box" v-if="images.normal_size.length != 0">
                                <ProductZoomer :base-images="images" :base-zoomer-options="zoomerOptions"/>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="buyCount" @change="handleChange" :min="1" :max="10" ></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="add2Cart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a @click="tabIndex=0" href="javascript:;" :class="{selected:tabIndex==0}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a @click="tabIndex=1" href="javascript:;" :class="{selected:tabIndex==1}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            </Affix>
                            <div class="tab-content entry" v-show="tabIndex == 0" v-html="goodsinfo.content"> 
                            </div>
                            <div class="tab-content" v-show="tabIndex == 1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model.trim="comment" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit" @click="subComment">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"v-show="totalcount == 0">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | shorttimePlus}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <Page :current="pageIndex" :total="totalcount" show-sizer placement="top" :page-size-opts="[6,8,12]" :page-size="6" show-elevator @on-change="changPage" @on-page-size-change="changSize"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>    
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>                  
                                            <span>{{item.add_time | shorttime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 返回顶部 -->
        <BackTop></BackTop>
    </div>
</template>
<script>
/* 导入axios */
//import axios from 'axios';
/* 导入moment */
//import moment from 'moment'
export default {
    name: 'detail',
    data: function(){
        return {
            artID: '',
            goodsinfo: {},
            hotgoodslist: [],
            imglist: [],
            buyCount: 1,
            tabIndex: 0,
            pageIndex: 1,
            pageSize: 6,
            comments:[],
            totalcount: '',
            comment:'',
            images:
                    {                                               
                normal_size: [ ]                                                                     
                     }, 
            zoomerOptions: {
                zoomFactor: 16,
                pane: 'container-round',
                hoverDelay: 300,
                namespace: 'inline-zoomer',
                move_by_click:true,
                scroll_items: 5,
                choosed_thumb_border_color: "#bbdefb"
            }        
        }  
    },
    methods: {
        handleChange(){

        },
        initData(){
            /* 初始化计数器里的数字 */
            this.buyCount = 1
            this.artID = this.$route.params.id;
            this.images.normal_size = [];
            this.$axios.get('http://111.230.232.110:8899/site/goods/getgoodsinfo/'+this.artID)
            .then(res=>{
            //console.log(res)
            this.goodsinfo = res.data.message.goodsinfo;
            this.hotgoodslist = res.data.message.hotgoodslist;
            this.imglist = res.data.message.imglist
            this.imglist.forEach(v=>{
                this.images.normal_size.push({
                    id:v.id,
                    url:v.thumb_path
                })
            })
        })
        },
        /* 获取评论数据 */
        getComments(){
            this.$axios.get(`http://111.230.232.110:8899/site/comment/getbypage/goods/${this.artID}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`).then(res=>{
                //console.log(res);
                this.comments = res.data.message;
                this.totalcount = res.data.totalcount;
            })
        },
        changPage(pageIndex){
            this.pageIndex = pageIndex;
            this.getComments();
        },
        changSize(pageSize){
            this.pageSize = pageSize;
            this.getComments();
        },
        subComment(){
            //console.log('11')
            if(this.comment == ""){
                this.$Message.warning('请输入内容')
            }
            this.$axios.post(`site/validate/comment/post/goods/${this.artID}`,{"commenttxt":this.comment})
            .then(res=>{
                console.log(res)
                if(res.data.status == 0){
                    this.$Message.success(res.data.message)
                    this.comment = ""
                    this.pageIndex = 1
                    this.getComments();
                }
                
            })
        },
        add2Cart(){
            this.$store.commit('add2Cart',{
                goodId:this.artID,
                goodNum:this.buyCount
            })
            this.$notify({
            title: 'success',
            message: '加入购物车成功',
            type: 'success',
            duration: 1000
        });
        }

    },
    created() {
        this.initData()
        this.getComments()
    },
    /* filters: {
    shorttime: function(value) {
      //console.log(moment().format('YYYY-MM-DD'))
      return moment().format("YYYY-MM-DD");
    }
  } */
    watch: {
       $route(newVal,oldVal){
           console.log('数据改变了')
           this.initData()
           this.getComments()
       } 
    }
    
}
</script>
<style>
    .tab-content img{
        display: block;
        max-width: 100%;
    }
    .pic-box{
        width: 395px;
    }
    .thumb-list img{
    width: 100px;
    height: 100px;
}

</style>
