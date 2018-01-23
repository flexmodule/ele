<template>
	<div class="order">
	<section class="order-child">
		<img class="orderimg" src="//fuss10.elemecdn.com/f/18/9fb04779371b5b162b41032baf5f3gif.gif"/>
		<h3>登录后查看外卖订单</h3>
		<button type="button">立即登录</button>
	</section>
	</div>
</template>

<script>
export default {

  name: 'order',

  data () {
    return {

    }
  },
  mounted(){
  	this.$store.commit("hometitle","订单");
  }
}
</script>

<style lang="scss" scoped>

.order{
	background:#f5f5f5;
	height:100%;
}
.order-child{
	text-align:center;
	font-size:0;
	padding-top:2rem;
	.orderimg{
		width:3.41rem;
		height:3.41rem;
	}
	h3{
		font:.26rem/.34rem "";
		color:#999;
		margin:.2rem 0;
	}
	button{
		font:.22rem/.7rem "";
		padding:0 .6rem;
		background:#56d176;
		color:#fff;
		border:0;
		border-radius:.02rem;
	}
}
</style>