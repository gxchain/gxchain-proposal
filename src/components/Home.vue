<template>
  <div class="home">
    <div class="header">
      <div style="display:flex;align-items:center">
        <img class="logoImg" src="@/assets/gxchain.svg" alt="" />
        <div>proposal</div>
      </div>
      <div class="header-right">
        <el-button class="link-wallet" @click="login()" v-if="this.accountName===''">
          {{ $t("home.wallet") }}
        </el-button>
        <div class="link-wallet" v-else>
          <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{this.accountName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="padding:8px 35px;cursor:pointer">
            <div class="exit" @click="logout()">{{ $t("home.sign_out") }}</div>
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
            <div :class="this.canVote ? 'active' : 'disActive'">{{ $t("home.active") }}</div>
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
            <el-button @click="select(1)" :class="index==1?'use':'notuse'">{{ $t("home.agree") }}</el-button>
            <el-button @click="select(2)" :class="index ==2?'use':'notuse'" >{{ $t("home.disagree") }}</el-button>
            <el-button :disabled="disabled" :class="disabled?'disabled-button':'no-disabled'" @click="vote()" :loading="loading">{{$t("home.yes")}}</el-button>
          </div>
        </div>
        <div class="vote-number">
          <div class="numberText">{{ $t("home.vote_number") }}</div>
          <ul>
            <li v-for="(item, index) in detailList" :key="index" style="align-items:center">
              <div class="vote-head">
                <account-image :account="item.userName" :size="15" style="margin-right:10px"></account-image>
                <div>
                  {{ item.userName }}
                </div>
              </div>
                <div v-if="item.votingstate">{{$t("home.agree")}}</div>
                <div v-else>{{$t("home.disagree")}}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="section-right" v-show="voteResultShow">
        <div class="right-fomat">
          <div style="display:flex;align-items:center">
            <div class="inforText">{{ $t("home.totalVote") }}</div>
            <div class="totalVote">{{this.number.totalVote}}</div>
          </div>
          <div class="result">
            <div class="result-content">
              <div>{{$t("home.agree")}}</div>
              <el-progress
                :percentage="this.number.voteNumberTrue"
                :stroke-width="8"
                color="rgb(73,129,255)"
              ></el-progress>
            </div>
            <div class="result-content">
              <div>{{$t("home.disagree")}}</div>
              <el-progress
                :percentage="this.number.voteNumberFalse"
                :stroke-width="8"
                color="rgb(73,129,255)"
              ></el-progress>
            </div>
          </div>
        </div>
        <div class="right-fomat">
          <div style="display:flex;align-items:center">
            <div class="inforText">{{ $t("home.totalUserVote") }}</div>
            <div class="totalVote">{{this.user.totalUserVote}}</div>
          </div>
          <div class="result">
            <div class="result-content">
              <div>{{$t("home.agree")}}</div>
              <el-progress
                :percentage="this.user.voteUserTrue"
                :stroke-width="8"
                color="rgb(73,129,255)"
              ></el-progress>
            </div>
            <div class="result-content">
              <div>{{$t("home.disagree")}}</div>
              <el-progress
                :percentage="this.user.voteUserFalse"
                :stroke-width="8"
                color="rgb(73,129,255)"
              ></el-progress>
            </div>
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
      language:navigator.language,
      signShow:false,
      detailList: [],
      resultFalseList:[],
      resultTrueList:[],
      loading:false,
      network:process.env.network,
      contractName:process.env.contractName,
      number: {
          totalVote: 1,
          voteNumberTrue: 16,
          voteNumberFalse: 49
      },
      user: {
          totalUserVote: 1,
          voteUserTrue: 22,
          voteUserFalse: 6
      },
      canVote:true,
      voteResultShow:true,
    };
  },
  computed: {
  },
  mounted:function(){
    var _language = localStorage.language
    if(_language == undefined){
      localStorage.setItem('language',this.language);
    }else{
      this.language = _language
    }
    GScatterJS.gscatter.connect('starProgram').then(async connected => {
      if (!connected) return false
        gscatter = GScatterJS.gscatter
        gxc = gscatter.gxc(this.network)
        if (gscatter.identity) {
          let account = gscatter.identity.accounts.find(x => x.blockchain === 'gxc')
          this.accountName = account.name
        }
    })
    this.getVoter()
    this.getVoteEnds()
    this.timer = setInterval(()=>{
      this.getVoter()
    },3000);
    //判断投票是否结束
    if (this.canVote) {
      this.voteResultShow = false;
    }else{
      this.voteResultShow = true;
      //投票结束后,结果
      axios({
        method:'get',
        url:`${process.env.__SERVICE__}/proposal/api/statistics`
      }).then((resp) => {
        this.number.totalVote = resp.data.statistics.totalVoteGXCNumber; //投票总数
        this.number.voteNumberTrue = (resp.data.statistics.totalVoteGXCNumberTrue/this.number.totalVote*100); //投true总数
        this.number.voteNumberFalse = (resp.data.statistics.totalVoteGXCNumberFalse/this.number.totalVote*100); //投false总数
        this.user.totalUserVote = resp.data.statistics.voteUserNumber; //投票总人数
        this.user.voteUserTrue = (resp.data.statistics.voteUserNumberTrue/this.user.totalUserVote*100); //投true总人数
        this.user.voteUserFalse = (resp.data.statistics.voteUserNumberFalse/this.user.totalUserVote*100); //投false总人数
        console.log(resp.data);
      }).catch(resp => {
        console.log(this.$t("home.request")+resp.status+','+resp.statusText);
        this.$message({
          message:his.$t("home.statistics_request")+ resp.status+','+resp.statusText,
          type: 'error'
        });
      });
    }
  },

  methods: {
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
      if(!GScatterJS.gscatter.isExtension){
        var flag = confirm(this.$t("home.download"));
        if (flag) {
          window.open('https://gxchain.github.io/GScatter/arch/guide/');
        }
      }else{
        const identity = await GScatterJS.gscatter.getIdentity({ accounts: [this.network] })
        if (identity) {
          const account = gscatter.identity.accounts.find(x => x.blockchain === 'gxc')
          this.accountName = account.name
        }
        this.output(identity)
        this.$message({
          message:this.$t("home.link_success"),
            type: 'success'
          });
      }
    },
    async logout() {
      try {
        await GScatterJS.gscatter.forgetIdentity()
        this.accountName = "";
        this.$message({
          message:this.$t("home.signed"),
            type: 'success'
          });
      } catch (err) {
        // no identity found
        this.output(err)
      }
    },
    //显示下拉框
    signOut(){
      this.signShow = !this.signShow
    },
    vote(){
      let flag = false;
      let flagTrue = false;
      let flagFalse= false;
      for(var i = 0; i < this.detailList.length; i++){
        if(this.accountName === this.detailList[i].userName){
          flag = true;
        }
      }
      for(var j = 0; j < this.resultTrueList.length; j++){
        if(this.accountName === this.resultTrueList[j].userName){
          flagTrue = true;
        }
      }
      for(var k = 0; k < this.resultFalseList.length; k++){
        if(this.accountName === this.resultFalseList[k].userName){
          flagFalse = true;
        }
      }
      if(this.accountName==''){
        this.$message({
            message:this.$t("home.not_connect"),
            type: 'error'
          });
      }else{
        this.loading = true
        if(this.index === 1){
          if(!flagTrue){
            this.$alert(!flag?this.$t("home.support"):this.$t("home.change_support"), this.$t("home.vote"), {
              confirmButtonText: this.$t("home.yes"),
              callback: (action) => {
                if (action === 'confirm') {
                  gxc.callContract(this.contractName, 'vote', {approve:true}, '', true).then(trx => {
                    this.output(`call contract success`, trx)
                    this.loading = false;
                    this.$message({
                      message: this.$t("home.vote_success"),
                      type: 'success'
                    });
                    this.getVoter();
                  }).catch(error => {
                    this.output(error)
                    this.loading = false;
                    this.$message({
                      message:this.$t("home.vote_fail"),
                      type: 'error'
                    });
                  })
                }else{
                  this.loading = false;
                }
              }
            })
          }else{
            this.$message({
              message:this.$t("home.cast_agree"),
              type: 'error'
            });
            this.loading = false;
          }
        }else{
          if(!flagFalse){
            this.$alert(!flag?this.$t("home.no_support"):this.$t("home.change_noSupport"), this.$t("home.vote"), {
              confirmButtonText: this.$t("home.yes"),
              callback: (action) => {
                if (action === 'confirm') {
                  gxc.callContract(this.contractName, 'vote', {approve:false}, '', true).then(trx => {
                    this.output(`call contract success`, trx)
                    this.$message({
                      message: this.$t("home.vote_success"),
                      type: 'success'
                    });
                    this.getVoter();
                    this.loading = false;
                  }).catch(error => {
                    this.output(error)
                    this.$message({
                      message:this.$t("home.vote_fail"),
                      type: 'error'
                    });
                    this.loading = false
                  })
                }else{
                  this.loading = false
                }
              }
            })
          }else{
            this.$message({
              message:this.$t("home.cast_disagree"),
              type: 'error'
            });
            this.loading = false;
          }
        }
      }
    },
    //投票列表
    getVoter () {
      //获取投票人及其信息
      axios({
        method:'get',
        url:`${process.env.__SERVICE__}/proposal/api/voter`
      }).then((resp)=>{
        this.detailList = resp.data.result;
        this.resultFalseList = resp.data.resultFalse;
        this.resultTrueList = resp.data.resultTrue;
      }).catch(resp => {
        console.log(this.$t("home.request")+resp.status+','+resp.statusText);
        this.$message({
          message:this.$t("home.voter_request")+resp.status+','+resp.statusText,
          type: 'error'
        });
      });
    },
    getVoteEnds () {
      //投票结束的时间
      axios({
        method:'get',
        url:`${process.env.__SERVICE__}/proposal/api/state`
      }).then((resp)=>{
        this.canVote = resp.data.canVote;
      }).catch(resp => {
        console.log(this.$t("home.request") +resp.status+','+resp.statusText);
        this.$message({
          message:this.$t("home.state_request")+resp.status+','+resp.statusText,
          type: 'error'
        });
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
        padding: 6px 8px;
        border-radius: 20px;
        // margin-right: 0.8rem;
        color: rgb(123, 166, 255);
      }
      .exit{
        width:50px;
        padding:8px;
        padding-left:25px;
        cursor:pointer;
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
          padding: 0 4px;
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
      width: 66%;
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
        .disActive {
          background-color: rgb(188, 189, 193);
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
            background-color: #ecf5ff;
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
            background-color:rgb(188, 189, 193);
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
        overflow-y: scroll;
        overflow-x: hidden;
        max-height: 34rem;
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
  /deep/ .el-message-box{
    width: 320px;
  }
}
@media screen and (max-width: 900px) {
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
  .el-dropdown-menu:hover{
    background-color: rgb(219, 229, 255);
  }
</style>
