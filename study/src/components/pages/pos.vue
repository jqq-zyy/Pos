<template>
	<div class="wrap">
		<left-nav></left-nav>
		<div class="main">
			<el-row>
				<el-col :span="9" class="pos-order" id="pos-order">

					<el-tabs>
						<el-tab-pane label="点餐">
							<el-table :data="tableData" style="width: 100%;" height="272">
								<el-table-column prop="goodsName" label="商品名称"></el-table-column>
								<el-table-column prop="count" label="数量" width="60"></el-table-column>
								<el-table-column prop="price" label="金额" width="70"></el-table-column>
								<el-table-column prop="options" label="操作" fixed="right" width="100">
									<template scope="scope">
										<el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除
										</el-button>
										<el-button type="text" size="small" @click="addOrderList(scope.row)">增加
										</el-button>
									</template>
								</el-table-column>
							</el-table>
							<div class="statistics">总数量：{{totalCount}} &nbsp;&nbsp;&nbsp;&nbsp;总金额：{{totalMoney}}</div>
							<div class="btn-box">
								<el-button type="warning">挂单</el-button>
								<el-button type="danger" @click="delAllGood()">删除</el-button>
								<el-button type="success" @click="settle()">结账</el-button>
							</div>
						</el-tab-pane>
						<el-tab-pane label="挂单">
						</el-tab-pane>
						<el-tab-pane label="外卖"></el-tab-pane>
					</el-tabs>

				</el-col>
				<el-col :span="15" class="pos-product" id="pos-product">
					<div class="goods-top">
						<h4 class="title">热销产品</h4>
						<ul class="goods-list">
							<li class="goods-item" v-for="item in topList" @click="addOrderList(item)">
								<span>{{item.goodsName}}</span>
								<span class="price">￥{{item.price}}元</span>
							</li>
						</ul>
					</div>
					<div class="goods-type">
						<el-tabs>
							<el-tab-pane label="主食">
								<ul class="staple-list">
									<li class="staple-item" v-for="item in stapleList" @click="addOrderList(item)">
										<span class="goods-img"><img :src="item.goodsImg" alt=""></span>
										<span class="name">{{item.goodsName}}</span>
										<span class="price">{{item.price}}</span>
									</li>
								</ul>
							</el-tab-pane>
							<el-tab-pane label="小食">
								<ul class="staple-list">
									<li class="staple-item" v-for="item in snacksList" @click="addOrderList(item)">
										<span class="goods-img"><img :src="item.goodsImg" alt=""></span>
										<span class="name">{{item.goodsName}}</span>
										<span class="price">{{item.price}}</span>
									</li>
								</ul>
							</el-tab-pane>
							<el-tab-pane label="饮品">
								<ul class="staple-list">
									<li class="staple-item" v-for="item in drinkList" @click="addOrderList(item)">
										<span class="goods-img"><img :src="item.goodsImg" alt=""></span>
										<span class="name">{{item.goodsName}}</span>
										<span class="price">{{item.price}}</span>
									</li>
								</ul>
							</el-tab-pane>
							<el-tab-pane label="套餐">
								<ul class="staple-list">
									<li class="staple-item" v-for="item in comboList" @click="addOrderList(item)">
										<span class="goods-img"><img :src="item.goodsImg" alt=""></span>
										<span class="name">{{item.goodsName}}</span>
										<span class="price">{{item.price}}</span>
									</li>
								</ul>
							</el-tab-pane>
						</el-tabs>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import LeftNav from './../common/leftNav.vue'
	import axios from 'axios'
	import topData from '@/data/topData'
	import typeData from '@/data/typeData'
	export default{
		data(){
			return {
				tableData: [],
				topList: topData,
				stapleList: typeData[0],
				snacksList: typeData[1],
				drinkList: typeData[2],
				comboList: typeData[3],
				totalCount: 0,
				totalMoney: 0,
			}
		},
		components: {
			LeftNav
		},
		created(){
//      axios.get('http://jspang.com/DemoApi/oftenGoods.php').then(response=>
//      {
//        this.topList = response.data;
//      }).catch(error=>
//      {
//        alert("网络出错了");
//      }),
//			axios.get('http://jspang.com/DemoApi/typeGoods.php').then(response=>
//			{
//				this.stapleList = response.data[0];
//				this.snacksList = response.data[1];
//				this.drinkList = response.data[2];
//				this.comboList = response.data[3];
//			}).catch(error=>
//			{
//				alert("网络出错了");
//			})
		},
		mounted(){
			var orderHeight = document.body.clientHeight;
			//      console.log(orderHeight)
			document.getElementById('pos-order').style.height = orderHeight + 'px';
		},
		methods: {
			addOrderList($goods)
			{
				//商品是否存在订单列表中
				this.totalCount = 0;
				this.totalMoney = 0;
				let isHave = false;
				for (let i = 0; i < this.tableData.length; i++)
				{
					if (this.tableData[i].goodsId == $goods.goodsId)
					{
						isHave = true;
					}
				}

				//根据判断的值，编写业务逻辑，如果有，加数量，如果没，加在数组中
				if (isHave)
				{
					let arr = this.tableData.filter(a=>a.goodsId == $goods.goodsId);
					arr[0].count++;
				}
				else
				{
					let newGoods = {
						goodsId: $goods.goodsId,
						goodsName: $goods.goodsName,
						price: $goods.price,
						count: 1,
					}
					this.tableData.push(newGoods);
				}

				this.tableData.forEach((element)=>
				{
//					this.totalCount+=element.count;
					this.totalCount += element.count;
					this.totalMoney = this.totalMoney + (element.price * element.count)
				})
			},
//			删除单个单品
			delSingleGoods($item)
			{
//				debugger;
				console.log($item)
				this.tableData = this.tableData.filter(o=> o.goodsId != $item.goodsId)
				this.getAllMoney();
			},
//			汇总数量金额
			getAllMoney()
			{
				this.totalCount = 0;
				this.totalMoney = 0;
				if (this.tableData)
				{
					this.tableData.forEach((element)=>
					{
//					this.totalCount+=element.count;
						this.totalCount += element.count;
						this.totalMoney = this.totalMoney + (element.price * element.count)
					})
				}
			},
//			删除所有商品
			delAllGood()
			{
				this.tableData = [];
				this.totalCount = 0;
				this.totalMoney = 0;
			},
//			模拟结账
			settle()
			{
				if(this.totalCount!=0){
					this.tableData = [];
					this.totalCount = 0;
					this.totalMoney = 0;
					this.$message({
						message: '结账成功，感谢你又为店里出了一份力!',
						type: 'success'
					});
				}else{
					this.$message.error('暂时没有加购商品！');
				}
			}
		}
	}
</script>
<style lang='sass' type="text/scss" rel="stylesheet/scss">
	@import './../../css/base.scss';
	@import './../../css/common.scss';
	@import './../../css/pos.scss';
</style>
