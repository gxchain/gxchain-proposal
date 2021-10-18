<template>
  <div class="home">
    <div class="header">
      <div style="display:flex;align-items:center">
        <img class="logoImg" src="@/assets/gxchain.svg" alt="" />
        <div>proposal</div>
      </div>
      <div class="header-right">
        <div class="link-wallet" @click="login()" v-if="this.accountName===''">
          {{ $t("home.wallet") }}
        </div>
        <div class="link-wallet" v-else>
          <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{this.accountName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="width:50px;padding:8px;padding-left:25px;cursor:pointer;" onMouseOver="this.style.background='rgb(219, 229, 255)'"
   onMouseOut="this.style.background='#FFF'">
            <div class="" @click="logout()">{{ $t("home.sign_out") }}</div>
          </el-dropdown-menu>
        </el-dropdown>
        </div>
        <div class="language">
          <div @click="swicthLanguage('zh-CN')" :class="language == 'zh-CN' ? 'switch' : 'not-switch'">中</div>
          <div @click="swicthLanguage('en-US')" :class="language == 'en-US' ? 'switch' : 'not-switch'">EN</div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section-left">
        <div class="block-item">
          <h2 class="title">IP-82: Move yUSD funds to yDAI Vault</h2>
          <div class="share-active">
            <div class="active">{{ $t("home.active") }}</div>
          </div>
          <p>
            Yam Finance YIP-82: Move yUSD funds to yDAI Vault 活跃 Yearn's yUSD
            vault was their first product and the only one available when YAM
            launched. Since then, Yearn has developed numerous other vault
            products and the yUSD vault no longer earns comparable returns to the
            newer, more robust and flexible products.
          </p>
          <p>
            As we rebalance the Treasury and YDS per YIPs 80, and 81, we have an
            opportunity to upgrade our yield bearing stable-coins to one of these
            newer products. yDAI is the most philosophically aligned with our
            mission as DAI is an un-censorable stablecoin backed by ETH and other
            assets.
          </p>
          <p>
            Making this change should earn the DAO additional interest from our
            stablecoins, and although no rates are set in stone, the returns on
            yDAI should be consistently higher than yUSD due to how the vault is
            constructed.
          </p>
          <p>
            See the full post with rationale and data here:
            https://forum.yam.finance/t/yip-82-transition-yusd-to-new-vault/1493
          </p>
        </div>
        <div class="vote">
          <div class="voteText">
            <div>{{ $t("home.vote") }}</div>
          </div>
          <div class="voting-button">
            <el-button @click="select(1)" :class="index==1?'use':'notuse'">yes</el-button>
            <el-button @click="select(2)" :class="index ==2?'use':'notuse'" >no</el-button>
            <el-button :disabled="disabled" :class="disabled?'disabled-button':'no-disabled'" @click="vote()" :loading="loading">确认</el-button>
          </div>
        </div>
        <div class="vote-number">
          <div class="numberText">{{ $t("home.vote_number") }}</div>
          <ul>
            <li v-for="(item, index) in voteList" :key="index" style="align-items:center">
              <div class="vote-head">
                <account-image :account="item.userName" :size="15" style="margin-right:10px"></account-image>
                <div>
                  {{ item.userName }}
                </div>
              </div>
                <div v-if="item.votingstate">Yes</div>
                <div v-else>No</div>
              <!-- <div
                class="vote-detail"
                v-show="isVoteDetail && index == current"
                @mouseleave="onMousteOut(index)"
              >
                <img class="img" src="@/assets/logo.png" alt="" />
                <div style="margin-top: 1.2rem">{{ item.name }}</div>
                <div class="browser-view">
                  <div>在浏览器上查看</div>
                  <div>#</div>
                </div>
              </div> -->
            </li>
          </ul>
          <button
            class="unfold-hide"
            v-if="detailList.length > 6"
            @click="changeFoldState"
          >
            {{ $t("home.expand") }}&gt;&gt;
          </button>
        </div>
      </div>
      <div class="section-right">
        <div class="right-fomat">
          <div style="display:flex;align-items:center">
            <div class="inforText">{{ $t("home.totalVote") }}</div>
            <div class="totalVote">{{totalVote}}</div>
          </div>
          <div class="result">
            <div class="result-content">
              <div>Yes</div>
              <el-progress
                :percentage="voteNumberTrue"
                :stroke-width="8"
                color="rgb(73,129,255)"
              ></el-progress>
            </div>
            <div class="result-content">
              <div>No</div>
              <el-progress
                :percentage="voteNumberFalse"
                :stroke-width="8"
                color="rgb(73,129,255)"
              ></el-progress>
            </div>
            <el-button class="download">{{ $t("home.report") }}</el-button>
          </div>
        </div>
        <div class="right-fomat">
          <div style="display:flex;align-items:center">
            <div class="inforText">{{ $t("home.totalUserVote") }}</div>
            <div class="totalVote">{{totalUserVote}}</div>
          </div>
          <div class="result">
            <div class="result-content">
              <div>Yes</div>
              <el-progress
                :percentage="voteUserTrue"
                :stroke-width="8"
                color="rgb(73,129,255)"
              ></el-progress>
            </div>
            <div class="result-content">
              <div>No</div>
              <el-progress
                :percentage="voteUserFalse"
                :stroke-width="8"
                color="rgb(73,129,255)"
              ></el-progress>
            </div>
            <el-button class="download">{{ $t("home.report") }}</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import axios from "axios";
import AccountImage from './sub/AccountImage.vue';
 const network = {
    blockchain: 'gxc',
    protocol: 'https',
    host: 'testnet.gxchain.org',
    port: 443,
    chainId: 'c2af30ef9340ff81fd61654295e98a1ff04b23189748f86727d0b26b40bb0ff4'
    }

    let contractName = 'bjnvoting'
    let gscatter
    let gxc
export default {
  name: "Home",
  data() {
    return {
      size:20,
      accountName:'',
      logs: [],
      brandFold: true,
      isVoteDetail: false,
      current: 0,
      index: 0,
      disabled:true,
      language:'zh-CN',
      signShow:false,
      detailList: [],
      loading:false,
      totalVote:90,
      voteNumberTrue:16,
      voteNumberFalse:49,
      totalUserVote:40,
      voteUserTrue:22,
      voteUserFalse:6
    };
  },
  computed: {
    voteList: {
      get: function () {
        if (this.brandFold) {
          if (this.detailList.length < 7) {
            return this.detailList;
          }
          let newArr = [];
          for (var i = 0; i < 6; i++) {
            let item = this.detailList[i];
            newArr.push(item);
          }
          return newArr;
        }
        return this.detailList;
      },
      set: function (val) {
        this.voteList = val;
      },
    },
  },
  mounted:function(){
      var _language = localStorage.language
      this.$i18n.locale = _language
      this.language = _language
      GScatterJS.gscatter.connect('starProgram').then(async connected => {
        if (!connected) return false
          gscatter = GScatterJS.gscatter
          gxc = gscatter.gxc(network)
          if (gscatter.identity) {
            let account = gscatter.identity.accounts.find(x => x.blockchain === 'gxc')
            this.accountName = account.name
          }
      })
      this.send();
  },
  methods: {
    //显示下拉框
    signOut(){
      this.signShow = !this.signShow
    },
    //显示更多
    changeFoldState() {
      this.brandFold = !this.brandFold;
    },
    // voteDetail: function (index) {
    //   this.isVoteDetail = true; //鼠标移入显示
    //   this.current = index;
    // },
    // onMousteOut: function (index) {
    //   this.isVoteDetail = false; //鼠标移出隐藏
    //   this.current = null;
    // },
    vote(){
      let flag = false;
      for(var i = 0; i < this.detailList.length; i++){
        if(this.accountName === this.detailList[i].userName){
          flag = true;
        }
    }
      if(this.accountName==''){
        this.$message({
          message:this.$t("home.not_connect"),
            type: 'error'
          });
      }else{
        if(this.index === 1){
          this.loading = true
          this.$alert(!flag?this.$t("home.support"):this.$t("home.change_support"), this.$t("home.vote"), {
            confirmButtonText: this.$t("home.yes"),
            callback: (action) => {
              if (action === 'confirm') {
                gxc.callContract(contractName, 'vote', {approve:true}, '', true).then(trx => {
                  this.output(`call contract success`, trx)
                  this.$message({
                    message: this.$t("home.vote_success"),
                    type: 'success'
                  });
                  location.reload();
                }).catch(error => {
                  this.output(error)
                  this.$message({
                    message:this.$t("home.vote_fail"),
                    type: 'error'
                  });
                })
              }
            }
          })
          this.loading = false
        }else{
          this.$alert(!flag?this.$t("home.no_support"):this.$t("home.change_noSupport"), this.$t("home.vote"), {
            confirmButtonText: this.$t("home.yes"),
            callback: (action) => {
              if (action === 'confirm') {
                gxc.callContract(contractName, 'vote', {approve:false}, '', true).then(trx => {
                  this.output(`call contract success`, trx)
                  this.$message({
                    message: this.$t("home.vote_success"),
                    type: 'success'
                  });
                  location.reload();
                }).catch(error => {
                  this.output(error)
                  this.$message({
                    message:this.$t("home.vote_fail"),
                    type: 'error'
                  });
                })
              }
            }
          })
        }
      }
    },
    //投票列表
    send(){
        axios({
          method:'get',
          url:'/proposal/api/voter'
        }).then((resp)=>{
          console.log(resp.data);
          this.detailList = resp.data.result;
        }).catch(resp => {
          console.log(this.$t("home.request")+resp.status+','+resp.statusText);
        });
         axios({
          method:'get',
          url:'/proposal/api/statistics'
        }).then((resp)=>{
          this.totalVote = resp.data.statistics.totalVoteGXCNumber; //投票总数
          this.voteNumberTrue = (resp.data.statistics.totalVoteGXCNumberTrue/this.totalVote*100); //投true总数
          this.voteNumberFalse = (resp.data.statistics.totalVoteGXCNumberFalse/this.totalVote*100); //投false总数
          this.totalUserVote = resp.data.statistics.voteUserNumber; //投票总人数
          this.voteUserTrue = (resp.data.statistics.voteUserNumberTrue/totalUserVote*100); //投true总人数
          this.voteUserFalse = (resp.data.statistics.voteUserNumberFalse/totalUserVote*100); //投false总人数
          console.log(resp.data);
        }).catch(resp => {
          // console.log(this.$t("home.request")+resp.status+','+resp.statusText);
        });
      },
    //选择yes or no
    select(i) {
      this.disabled=false
      this.index = i;
    },
    //切换语言
    swicthLanguage(index) {
      this.language = index
      if(this.language==='zh-CN'){
        this.$i18n.locale='zh-CN'
        localStorage.setItem('language',this.language);
      }else{
        this.$i18n.locale='en-US'
        localStorage.setItem('language',this.language);
        // localStorage.clear();
      }
    },
    output() {
      const combined = Array.from(arguments).map(arg => {
        if (typeof arg === 'object') {
          return JSON.stringify(arg)
        } else {
          return arg
        }
      })
      console.log(...arguments)
      this.logs.push({ time: new Date(), text: combined.join('\n--------------\n') })
    },
    async login(){
      const identity = await GScatterJS.gscatter.getIdentity({ accounts: [network] })
      if (identity) {
        const account = gscatter.identity.accounts.find(x => x.blockchain === 'gxc')
        this.accountName = account.name
      }
      this.output(identity)
    },
    async logout() {
      try {
        await GScatterJS.gscatter.forgetIdentity()
        this.accountName = "";
      } catch (err) {
        // no identity found
        this.output(err)
      }
    },
  },
  components: {
    AccountImage
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
* {
  margin: 0;
  padding: 0;
}
>>> .el-message-box {
  width: 250px;
  background-color:red;
}
.home {
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1.5rem 4%;
    background-color: #fff;
    z-index: 9;
    .logoImg{
      width: 10rem;
      margin-right: 1rem;
    }
    .header-right {
      display: flex;
      flex-direction: row;
      align-items: center;
      .el-dropdown-link {
        cursor: pointer;
        color: rgb(123, 166, 255);
        font-size: 1em;
      }
      .link-wallet {
        border: 1px rgb(123, 166, 255) solid;
        font-size: 0.8em;
        padding: 4px 12px;
        border-radius: 16px;
        margin-right: 0.8rem;
        color: rgb(123, 166, 255);
      }
      .signOut:hover{
        background-color: pink;
      }
    }
    .language{
        display: flex;
        padding: 4px 12px;
        width: 3rem;
        justify-content: space-around;
        border-radius: 16px;
        .switch{
          background: rgb(123, 166, 255);
          color: #fff;
          width: 1.4rem;
          text-align: center;
        }
        .not-switch{
          color: grey;
        }
      }
  }
  .section {
    display: flex;
    justify-content: space-around;
    // margin-top: 50px;
    padding: 0 8% 1.5rem 8%;
    background-color: rgb(231, 232, 243);
    .section-left {
      margin-top: 1rem;
      width: 63%;
      margin-bottom: 1.2rem;
      .block-item{
        background-color: #FFF;
        padding:1.2rem;
        border-radius: 10px;
        h2{
          border-bottom: 1px rgb(163, 166, 196) dashed;
          padding-bottom: 1.2rem;
        }
        .share-active {
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
        .active {
          background-color: rgb(255, 126, 29);
          padding: 1px 8px;
          border-radius: 12px;
          color: #fff;
        }
      }
        p {
          margin-top: 1.2rem;
        }
      }
      .vote {
        background-color: #FFF;
        padding:1.2rem;
        border-radius: 10px;
        .voteText {
          padding: 0.8rem 2%;
        }
        margin-top: 1.6rem;
        .voting-button{
          width:100%;
          .use{
            text-align: center;
            width: 80%;
            border:1px rgb(123, 166, 255) solid;
            color: rgb(123, 166, 255);
            padding: 6px;
            border-radius: 16px;
            margin-bottom: 16px;
            margin-left:10%;
          }
          .notuse{
            text-align: center;
            width: 80%;
            border:1px rgb(178, 181, 205) solid;
            color: rgb(178, 181, 205);
            padding: 6px;
            border-radius: 16px;
            margin-bottom: 16px;
            margin-left:10%;
          }
          .disabled-button{
            text-align: center;
            width: 80%;
            border: none;
            color: #fff;
            padding: 6px;
            border-radius: 16px;
            margin-bottom: 12px;
            margin-left:10%;
            background-color:rgb(178, 181, 205);
          }
          .no-disabled{
            text-align: center;
            width: 80%;
            color: #fff;
            padding: 6px;
            border: none;
            border-radius: 16px;
            margin-bottom: 12px;
            margin-left:10%;
            background-color:rgb(123, 166, 255);
          }
        }
      }
      .vote-number {
        margin-top:0.2rem;
        background-color: #FFF;
        border-radius: 10px;
        padding: 1.2rem;
        .numberText {
          padding: 0.8rem 2%;
        }
        ul {
          li {
            list-style: none;
            padding: 1rem 2%;
            border-bottom: 1px rgb(178, 181, 205) solid;
            display: flex;
            justify-content: space-between;
            .vote-head {
              display: flex;
              align-items: center;
            }
            .headImg {
              width: 1rem;
              height: 1rem;
              border-radius: 0.5rem;
            }
          }
        }
        .unfold-hide {
          width: 100%;
          text-align: center;
          padding: 0.8rem 0;
          border: none;
          background-color: #FFF;
          color: rgb(178, 181, 205) ;
        }
        .vote-detail {
          position: absolute;
          width: 18%;
          background-color: white;
          border: 1px rgb(208, 201, 202) solid;
          height: 10rem;
          border-radius: 6px;
          padding: 2%;
          text-align: center;
          .img {
            width: 50px;
            height: 50px;
            border-radius: 25px;
          }
          .browser-view {
            display: flex;
            width: 80%;
            border: 1px rgb(208, 201, 202) solid;
            border-radius: 20px;
            padding: 8px;
            justify-content: center;
            margin-top: 2rem;
            margin-left: 8%;
          }
        }
      }
    }
    /deep/ .el-progress__text{
      width: 40px;
    }
    .section-right {
      margin-top: 1rem;
      // float: right;
      width: 30%;
      .inforText {
        padding: 0.8rem 2%;
      }
      .totalVote{
        background-color: rgb(123, 166, 255);
        color: #FFF;
        padding:0 6px;
        border-radius: 30px;
      }
      .right-fomat {
        margin-bottom: 1.2rem;
        background-color: #FFF;
        padding:1.2rem;
        border-radius: 10px;
        .download {
          text-align: center;
          width: 80%;
          border: 1px rgb(123, 166, 255) solid;
          border-radius: 16px;
          padding: 4px;
          color: rgb(123, 166, 255);
          margin-top: 1.2rem;
          margin-left: 10%;
        }
      }
      .result {
        padding: 0 4%;
        padding-bottom: 1.2rem;
        .result-content {
          margin-top: 1rem;
        }
      }
    }
  }
}
@media screen and (max-width: 900px) {
  .el-message-box{
    width: 320px !important;
  }
  .logoImg{
    width: 5rem !important;
    margin-right: 0.5rem !important;
  }
  .section {
    flex-direction: column !important;
    .section-left {
      width: 100% !important;
      clear: both;
      .vote-confirm{
        .el-progress{
            width: 75% !important;
          }
        .el-button{
          font-size: 12px !important;
          // padding:0.2rem 0.6rem!important;
        }
      }
    }
    .section-right {
      width: 100% !important;
      clear: both;
    }
  }
}
</style>
<style>
  .el-message-box{
      width: 320px;
    }
</style>
