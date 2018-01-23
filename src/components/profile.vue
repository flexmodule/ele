<template>
	<div class="profile">
		<section class="register">
		    <div class="register-l">
		    	<em class="iconfont icon-gerenzhongxin"></em>
				<div class="register-l-c">
					<h3>登录/注册</h3>
					<p><i class="iconfont icon-mobilephone"></i>登录后享受更多特权</p>
				</div>
			</div>
			<div class="register-r">
				>
			</div>
		</section>
		<section class="gold">
			<div class="gold-l">
				<span><i class="iconfont icon-email"></i></span>
				<p>优惠</p>
			</div>
			<div class="gold-r">
				<span><i class="iconfont icon-jifen"></i></span>
				<p>金币</p>
			</div>
		</section>
		<section class="address same-pro">
			<div class="address-l">
				<i class="iconfont icon-map"></i>
				<span>我的地址</span>
			</div>
			<div class="address-r">
				>
			</div>
		</section>
		<section class="cast">
			<div class="cast-t same-pro">
				<div class="cast-t-l">
					<i class="iconfont icon-bags"></i>
					<span>金币商城</span>
				</div>
				<div class="cast-t-r">
					>
				</div>
			</div>
			<div class="cast-b same-pro">
				<div class="cast-b-l">
					<i class="iconfont icon-gifts"></i>
					<span>分享拿5元现金</span>
				</div>
				<div class="cast-b-r">
					>
				</div>
			</div>
		</section>
		<section class="cus">
			<div class="cus-t same-pro">
				<div class="cus-t-l">
					<i class="iconfont icon-service"></i>
					<span>我的客服</span>
				</div>
				<div class="cus-t-r">
					>
				</div>
			</div>
			<div class="cus-b same-pro">
				<div class="cus-b-l">
					<i class="iconfont icon-operation"></i>
					<span>下载饿了么APP</span>
				</div>	
				<div class="cus-b-r">
					>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
export default {

  name: 'profile',

  data () {
    return {

    }
  },
  mounted(){
  	this.$store.commit("hometitle","我的");
  }
}
</script>

<style lang="scss" scoped>
.profile{
	height:100%;
	background:#f5f5f5;
	overflow: hidden;
}
.register{
	margin-top:.74rem;
	border-top:.01rem solid rgba(255,255,255,.3);
	background:#0af;
	padding:.3rem .25rem;
	display:flex;
	justify-content:space-between;

}
.register-l{
	display:flex;
	em{
		font:1.02rem "";
		color:#999;
		margin-right:.2rem;
	}
}
.register-l-c{
			color:#fff;	
	h3{
		font:700 .4rem/.43rem "";
		margin:.2rem 0 .1rem 0;
	}
	p{
		font:.22rem "";
		i{
			font:.22rem "";
		}
	}
}
.register-r{
	font:.26rem/1rem "";
	color:#fff;
}
.gold{
	display:flex;
border-bottom:.01rem solid rgba(0,0,0,.1);
background:#fff;
}
.gold-l,.gold-r{
	font-size: 0;
	flex:1;
	padding:.35rem 0;
	span{
		display:block;
		width:.46rem;
		height:.46rem;
		border-radius:50%;
		background:rgb(252, 123, 83);
		font:.32rem/.46rem "";
		text-align:center;
		margin:0 auto .1rem;
		i{
			color:#fff;
		}
	}
	p{
		font:.23rem "";
		text-align:center;
	}
}
.gold-r{
	span{
		background:rgb(148, 217, 74);
	}
	border-left:.01rem solid rgba(0,0,0,.1)
}

.same-pro{
	font:.24rem/.7rem "";
	padding:0 .2rem;
	border-top:.01rem solid rgba(0,0,0,.1);
	border-bottom:.01rem solid rgba(0,0,0,.1);
	background:#fff;
	display:flex;
	justify-content:space-between;
	i{
		color:rgb(74, 165, 240);
	}
}
.address{
	margin:.2rem 0 .2rem 0;
}
.cast{
	margin-bottom:.2rem;
	.cast-t{
		border-bottom:0;
		i{
			color:rgb(74, 165, 240);
		}
	}
	.cast-b{
		i{
			color:rgb(252, 123, 83);
		}
	}
}
.cus-t{
	border-bottom:0;
}
</style>