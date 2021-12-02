<template>
  <div class="home">
    <div class="header">
      <div style="display:flex;align-items:center">
        <img class="logoImg" src="@/assets/GxchainProposal.svg" alt="" />
        <!-- <div>proposal</div> -->
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
          <h2 class="title">{{ $t("proposal_content.name") }}</h2>
          <div class="share-active">
            <div :class="this.canVote ? 'active' : 'disActive'">{{ $t("home.active") }}</div>
          </div>
          <h4>[{{ $t("proposal_content.background.title") }}]</h4>
          <p>{{ $t("proposal_content.background.stage1") }}</p>
          <p>{{ $t("proposal_content.background.stage2") }}</p>
          <h4>[{{ $t("proposal_content.substance.content1.title") }}]</h4>
          <h5>{{ $t("proposal_content.substance.content1.change_name") }}</h5>
          <p>{{ $t("proposal_content.substance.content1.stage1") }}</p>
          <p>{{ $t("proposal_content.substance.content1.stage2") }}</p>
          <h5>{{ $t("proposal_content.substance.content1.rei_mean") }}</h5>
          <p>{{ $t("proposal_content.substance.content1.stage3") }}</p>
          <p>{{ $t("proposal_content.substance.content1.stage4") }}</p>
          <h4>[{{ $t("proposal_content.substance.content2.title") }}]</h4>
          <p>{{ $t("proposal_content.substance.content2.stage1") }}</p>
          <p>{{ $t("proposal_content.substance.content2.stage2") }}</p>
          <p>{{ $t("proposal_content.substance.content2.stage3") }}</p>
          <h4>{{ $t("proposal_content.substance.content2.steps1") }}</h4>
          <p>{{ $t("proposal_content.substance.content2.split") }}</p>
          <h4>{{ $t("proposal_content.substance.content2.steps2") }}</h4>
          <p>{{ $t("proposal_content.substance.content2.upgrade") }}</p>
          <h4>{{ $t("proposal_content.substance.content2.steps3") }}</h4>
          <p>{{ $t("proposal_content.substance.content2.govern") }}</p>
          <h4>{{ $t("proposal_content.substance.content2.steps4") }}</h4>
          <h5>{{ $t("proposal_content.substance.content2.total") }}</h5>
          <ul class="four-step">
            <li>{{ $t("proposal_content.substance.content2.port1") }}</li>
            <li>
              {{ $t("proposal_content.substance.content2.port2") }}
              <ul>
                <li>{{ $t("proposal_content.substance.content2.spread1") }}</li>
                <li>{{ $t("proposal_content.substance.content2.spread2") }}</li>
                <li>{{ $t("proposal_content.substance.content2.spread3") }}</li>
              </ul>
            </li>
          </ul>
          <img class="image" :src='this.$t("proposal_content.substance.content2.image")' alt="">
          <h4>{{ $t("proposal_content.substance.content2.steps5") }}</h4>
          <p>{{ $t("proposal_content.substance.content2.detailed") }}</p>
          <div class="div-content">{{ $t("proposal_content.substance.content2.plan1") }}
            <div>{{ $t("proposal_content.substance.content2.consult") }}</div>
          </div>
          <div class="div-content">{{ $t("proposal_content.substance.content2.plan2") }}
            <div>{{ $t("proposal_content.substance.content2.deposit") }}</div>
            <div>{{ $t("proposal_content.substance.content2.term_a") }}</div>
            <div>{{ $t("proposal_content.substance.content2.term_b") }}</div>
          </div>
          <div class="div-content">{{ $t("proposal_content.substance.content2.plan3") }}
            <div>{{ $t("proposal_content.substance.content2.campaign") }}</div>
          </div>
          <h4>{{ $t("proposal_content.substance.content2.steps6") }}</h4>
          <p>{{ $t("proposal_content.substance.content2.rei_gxc") }}</p>
          <h4>[{{ $t("proposal_content.substance.content3.title") }}]</h4>
          <h5>{{ $t("proposal_content.substance.content3.construct.head") }}</h5>
          <p>{{ $t("proposal_content.substance.content3.construct.stage1") }}</p>
          <p>{{ $t("proposal_content.substance.content3.construct.stage2") }}</p>
          <p>{{ $t("proposal_content.substance.content3.construct.stage3") }}</p>
          <p>{{ $t("proposal_content.substance.content3.construct.stage4") }}</p>
          <h4>{{ $t("proposal_content.substance.content3.worth.head") }}</h4>
          <p>{{ $t("proposal_content.substance.content3.worth.stage1") }}</p>
          <p>{{ $t("proposal_content.substance.content3.worth.stage2") }}</p>
          <p>{{ $t("proposal_content.substance.content3.worth.stage3") }}</p>
          <p>{{ $t("proposal_content.substance.content3.worth.stage4") }}</p>
          <h4>{{ $t("proposal_content.substance.content3.extra.head") }}</h4>
          <p>{{ $t("proposal_content.substance.content3.extra.stage1") }}</p>
          <p>{{ $t("proposal_content.substance.content3.extra.stage2") }}</p>
          <p>{{ $t("proposal_content.substance.content3.extra.stage3") }}</p>
          <p>{{ $t("proposal_content.substance.content3.extra.stage4") }}</p>
          <h5>{{ $t("proposal_content.substance.content3.reality") }}</h5>
          <p>{{$t("proposal_content.substance.content3.stage_end") }}</p>
          <h5>{{ $t("proposal_content.substance.content3.ending") }}</h5>
        </div>
        <div class="vote" v-if="this.canVote">
          <div class="voteText">
            <div>{{ $t("home.vote") }}</div>
          </div>
          <div class="voting-button">
            <el-button @click="select(1)" :class="index==1?'use':'notuse'">{{ $t("home.agree") }}</el-button>
            <el-button @click="select(2)" :class="index ==2?'use':'notuse'" >{{ $t("home.disagree") }}</el-button>
            <el-button :disabled="disabled" :class="disabled?'disabled-button':'no-disabled'" @click="vote()" :loading="loading">{{$t("home.yes")}}</el-button>
          </div>
          <div class="vote-rules">{{ $t("home.tips") }}</div>
        </div>
        <div class="vote-number">
          <div class="header-number">
            <div class="numberText">{{ $t("home.vote_number") }}</div>
            <div class="totalVote">{{(this.number.totalVote/1e5).toLocaleString(undefined,{maximumFractionDigits: 5})}}</div>
          </div>
          <ul>
            <li v-for="(item, index) in detailList" :key="index" style="align-items:center">
              <div class="detail" v-if="index<moreSteps">
              <div class="vote-head">
                <account-image :account="item.userName" :size="15" style="margin-right:6px"></account-image>
                <div>{{ item.userName }}</div>
              </div>
              <div>
                <div class="createdAt">{{ (item.voteGXCNumberHourly/1e5).toLocaleString(undefined,{maximumFractionDigits: 5}) }} GXC</div>
                <div class="createdAt">{{ new Date(new Date(item.createdAt).getTime()).format('yyyy-MM-dd hh:mm:ss') }}</div>
              </div>
              <div class="agree-votes">
                <div v-if="item.votingstate" style="color:#2CDFC0">{{$t("home.agree")}}</div>
                <div v-else style="color:#FE898A">{{$t("home.disagree")}}</div>
              </div>
              </div>
            </li>
            <el-button class="expendMore" @click="expendMore()" v-if="this.resultSum>this.moreSteps">{{$t("home.expend_more")}}</el-button>
          </ul>
        </div>
      </div>
      <div class="section-right">
        <div class="right-fomat">
          <div class="inforText">{{$t("home.information")}}</div>
          <div class="information">
            <div>{{$t("home.start_date")}}</div>
            <div>{{new Date(new Date(this.startTime).getTime()).format('yyyy-MM-dd hh:mm:ss')}}</div>
          </div>
          <div class="information">
            <div>{{$t("home.end_date")}}</div>
            <div>{{new Date(new Date(this.stopTime).getTime()).format('yyyy-MM-dd hh:mm:ss')}}</div>
          </div>
        </div>
        <div class="right-fomat">
          <div class="result-header">
            <div class="header-left">
              <div class="inforText">{{ $t("home.totalVote") }}</div>
              <div class="totalVote">{{(this.number.totalVote/1e5).toLocaleString(undefined,{maximumFractionDigits: 5})}}</div>
            </div>
            <el-tooltip class="item"
                        effect="dark"
                        placement="top-end"                       >
              <el-button>?</el-button>
              <div slot="content">{{$t("home.dint")}}</div>
            </el-tooltip>
          </div>
          <div class="result">
            <div class="result-content">
              <div style="color:#2CDFC0">{{$t('home.agree')}}</div>
              <div class="progress">
                <div class="clip-background">
                    <div class='clip' :style="{width:this.number.voteNumberTrue+'%'}"></div>
                </div>
                <div style="width:70px">{{this.number.voteNumberTrue}}%</div>
              </div>
            </div>
            <div class="result-content">
              <div style="color:#FE898A">{{$t('home.disagree')}}</div>
              <div class="progress">
                <div class="clip-background">
                    <div class='clip' :style="{width:this.number.voteNumberFalse+'%'}"></div>
                </div>
                <div style="width:70px">{{this.number.voteNumberFalse}}%</div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-fomat">
          <div class="result-header">
            <div class="header-left">
              <div class="inforText">{{$t("home.totalUserVote")}}</div>
              <div class="totalVote">{{this.user.totalUserVote.toLocaleString()}}</div>
            </div>
            <el-tooltip class="item"
                        effect="dark"
                        placement="top-end"
                        >
              <el-button>?</el-button>
              <div slot="content">{{$t("home.dint")}}</div>
            </el-tooltip>
          </div>
          <div class="result">
            <div class="result-content">
              <div style="color:#2CDFC0">{{$t('home.agree')}}</div>
              <div class="progress">
                <div class="clip-background">
                    <div class='clip' :style="{width:this.user.voteUserTrue+'%'}"></div>
                </div>
                <div>{{this.user.voteUserTrue}}%</div>
              </div>
            </div>
            <div class="result-content">
              <div style="color:#FE898A">{{$t('home.disagree')}}</div>
              <div class="progress">
                <div class="clip-background">
                    <div class='clip' :style="{width:this.user.voteUserFalse+'%'}"></div>
                </div>
                <div>{{this.user.voteUserFalse}}%</div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-fomat">
          <div class="result-header">
              <div class="inforText">{{$t("vote_rules.title")}}</div>
          </div>
          <div class="result">
            <h5>{{$t("vote_rules.statistics")}}</h5>
            <p>{{$t("vote_rules.details")}}</p>
            <p>{{$t("vote_rules.balance")}}</p>
            <p>{{$t("vote_rules.locked_position")}}</p>
            <h5>{{$t("vote_rules.rules")}}</h5>
            <p>{{$t("vote_rules.first_rules")}}</p>
            <p>{{$t("vote_rules.second_rules")}}</p>
            <p>{{$t("vote_rules.third_rules")}}</p>
            <h5>{{$t("vote_rules.conditions")}}</h5>
            <p>{{$t("vote_rules.first_conditions")}}</p>
            <p>{{$t("vote_rules.second_conditions")}}</p>
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
      resultSum:0,
      number: {
          totalVote: 0,
          voteNumberTrue: 0,
          voteNumberFalse: 0
      },
      user: {
          totalUserVote: 0,
          voteUserTrue: 0,
          voteUserFalse:0
      },
      canVote:true,
      startTime:'2021-11-15 07:48:33',
      stopTime:'2021-11-24 16:00:00',
      moreSteps:10,
      votingstate:true
    };
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
          this.getvoted();
        }
    })
    this.getVoter()
    this.getEndTime()
    this.getStartTime()
    this.timer = setInterval(()=>{
      this.getVoter()
    },3000);
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
      // console.log(...arguments)
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
          this.index = 0;
          this.disabled = true;
      } catch (err) {
        // no identity found
        this.output(err)
      }
    },
    //点击展开更多
    expendMore(){
      this.moreSteps += 20;
       axios({
        method:'get',
        url:`${process.env.__SERVICE__}/proposal/api/voter`,
        params:{
          limit:this.moreSteps
        }
      }).then((resp)=>{
        this.resultSum = resp.data.resultsSum;
      }).catch(resp => {
        console.log(this.$t("home.request")+resp.status+','+resp.statusText);
        this.$message({
          message:this.$t("home.voter_request")+resp.status+','+resp.statusText,
          type: 'error'
        });
      });
    },
    //显示下拉框
    signOut(){
      this.signShow = !this.signShow
    },
    getvoted(){
      axios({
        method:'get',
        url:`${process.env.__SERVICE__}/proposal/api/findone`,
        params:{
          name:this.accountName
        }
      }).then((resp)=>{
        this.votingstate = resp.data.votingstate
      }).catch(resp => {
        console.log(this.$t("home.request")+resp.status+','+resp.statusText);
      });
    },
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
        this.loading = true
        if(this.index === 1){
          if(this.votingstate!=true){
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
                  }).catch(error => {
                    this.output(error)
                    this.loading = false;
                    this.$message({
                      message:this.$t("home.vote_fail"),
                      type: 'error'
                    });
                  })
                  this.index = 0;
                  this.disabled = true;
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
          if(this.votingstate!=false){
            this.$alert(!flag?this.$t("home.no_support"):this.$t("home.change_noSupport"), this.$t("home.vote"), {
              confirmButtonText: this.$t("home.yes"),
              callback: (action) => {
                if (action === 'confirm') {
                  gxc.callContract(this.contractName, 'vote', {approve:false}, '', true).then(trx => {
                    this.output(`call contract success`, trx)
                    this.loading = false;
                    this.$message({
                      message: this.$t("home.vote_success"),
                      type: 'success'
                    });
                  }).catch(error => {
                    this.output(error)
                    this.$message({
                      message:this.$t("home.vote_fail"),
                      type: 'error'
                    });
                    this.loading = false
                  })
                  this.index = 0;
                  this.disabled = true;
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
        this.resultSum = resp.data.resultsSum;
      }).catch(resp => {
        console.log(this.$t("home.request")+resp.status+','+resp.statusText);
        this.$message({
          message:this.$t("home.voter_request")+resp.status+','+resp.statusText,
          type: 'error'
        });
      });
    },
    //未关闭投票时获取投票信息
    getNoStopVote () {
      axios({
        method:'get',
        url:`${process.env.__SERVICE__}/proposal/api/voter_sum`
      }).then((resp)=>{
        this.number.totalVote = resp.data.voterGXCSum;
        this.number.voteNumberTrue = (resp.data.voterGXCTrueSum/this.number.totalVote*100).toFixed(5);
        this.number.voteNumberFalse = Number.parseFloat(resp.data.voterGXCFalseSum/this.number.totalVote*100).toFixed(5);
        this.user.totalUserVote = resp.data.voterNum;
        this.user.voteUserTrue = Number.parseFloat(resp.data.voterTrueNum/this.user.totalUserVote*100).toFixed(2); //投true总人数
        this.user.voteUserFalse = Number.parseFloat(resp.data.voterFalseNum/this.user.totalUserVote*100).toFixed(2); //投false总人数
      }).catch(resp => {
        console.log(this.$t("home.statistics_request")+resp.status+','+resp.statusText);
        this.$message({
          message:this.$t("home.statistics_request")+resp.status+','+resp.statusText,
          type: 'error'
        });
      });
    },
    getEndTime () {
      //投票是否结束
      axios({
        method:'get',
        url:`${process.env.__SERVICE__}/proposal/api/state`
      }).then((resp)=>{
        this.canVote = resp.data.canVote;
        this.getVoteResult();
      }).catch(resp => {
        console.log(this.$t("home.request") +resp.status+','+resp.statusText);
        this.$message({
          message:this.$t("home.state_request")+resp.status+','+resp.statusText,
          type: 'error'
        });
      });
    },
    getStartTime () {
      //投票开始和结束的时间
      axios({
        method:'get',
        url:`${process.env.__SERVICE__}/proposal/api/date`
      }).then((resp)=>{
        this.startTime = resp.data.startTime;
        this.stopTime = resp.data.stopTime;
        console.log(resp.data)
      }).catch(resp => {
        console.log(this.$t("home.request") +resp.status+','+resp.statusText);
      });
    },
    //请求投票结果
    getVoteResult(){
      // 判断投票是否结束
      if (!this.canVote) {
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
        }).catch(resp => {
          console.log(this.$t("home.request")+resp.status+','+resp.statusText);
          this.$message({
            message:this.$t("home.statistics_request")+ resp.status+','+resp.statusText,
            type: 'error'
          });
        });
      }else{
        this.getNoStopVote()
        this.timer = setInterval(()=>{
            this.getNoStopVote()
        },3000);
      }
    },
    //选择yes or no
    select(i) {
      this.disabled=false
      this.index = i;
      this.getvoted()
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
        cursor: pointer;
        .switch{
          background: rgb(123, 166, 255);
          color: #fff;
          width: 1.4rem;
          padding: 0 4px;
          text-align: center;
          margin-right: 4px;
        }
        .not-switch{
          color: grey;
          margin-right: 4px;
        }
      }
  }
  .section {
    display: flex;
    justify-content: space-around;
    // margin-top: 50px;
    padding: 0 4% 1.5rem 4%;
    background-color: rgb(231, 232, 243);
    .section-left {
      margin-top: 1rem;
      width: 66%;
      margin-bottom: 1.2rem;
      .block-item{
        background-color: #FFF;
        padding:1.2rem;
        border-radius: 10px;
        p{
          margin-top: 20px;
          font-size: 14px;
          line-height: 28px;
        }
        h4{
          margin-top: 20px;
        }
        .div-content{
          margin-top: 20px;
          font-size: 14px;
          line-height: 28px;
          div{
            padding:0 20px;
          }
        }
        h5{
          margin-top: 16px;
        }
        h2{
          border-bottom: 1px rgb(163, 166, 196) dashed;
          padding-bottom:1.6rem;
          padding-top:1.2rem;
        }
        .image{
          width: 100%;
        }
        .four-step{
          padding:10px 20px;
          font-size: 14px;
          line-height: 28px;
          ul{
            padding:0 20px;
            li{
              list-style-type: circle;
            }
          }
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
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .vote-rules{
            font-size: 12px;
            color:rgb(188, 189, 193);
            text-align: center;
            margin-top: 12px;
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
        padding:0.6rem;
        .header-number{
          display: flex;
          align-items: center;
          .totalVote{
            background-color: rgb(123, 166, 255);
            color: #FFF;
            padding:0 9px;
            border-radius: 30px;
          }
        }
        .numberText {
          padding: 0.8rem 2%;
        }
        ul {
          li{
           .detail{
              padding:1rem 2% 0.6rem 2%;
              border-bottom: 1px rgb(178, 181, 205) solid;
              display: flex;
              justify-content: space-between;
            }
            list-style: none;
            .vote-head {
              display: flex;
              align-items: center;
              width:120px;
            }
            .createdAt{
              font-size: 12px;
              color: grey;
            }
            .headImg {
              width: 1rem;
              height: 1rem;
              border-radius: 0.5rem;
            }
            .agree-votes{
              width: 50px;
              text-align: right;
            }
          }
          .expendMore{
            width: 100%;
            text-align: center;
            border: none;
            padding: 20px 0;
            color: rgb(123, 166, 255);
            background-color: #fff;
          }
          .endmore{
            width: 100%;
            text-align: center;
            border: none;
            padding: 20px 0;
            color: grey;
            background-color: #fff;
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
        padding: 0 2%;
        padding-left: 0px !important;
        font-weight: 500;
      }
      .totalVote{
        background-color: rgb(123, 166, 255);
        color: #FFF;
        padding:0 9px;
        border-radius: 30px;
      }
      .right-fomat {
        margin-bottom: 1.2rem;
        background-color: #FFF;
        padding:1.2rem;
        border-radius: 10px;
        p{
          margin-top: 6px;
          font-size: 13px;
          line-height: 28px;
        }
        h5{
          margin-top: 20px;
        }
        .result-header{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .header-left{
            display:flex;
            align-items:center;
            width:82%
          }
        }
        .information{
          display: flex;
          justify-content: space-between;
          margin-top: 12px;
          margin-bottom:12px;
          font-size: 15px;
        }
        .el-button{
          width: 30px;
          height:30px;
          border-radius: 15px;
        }
      }
      .result {
        padding: 0 4%;
        padding-bottom: 1.2rem;
        .result-content {
          margin-top: 0.8rem;
          .progress{
            // padding: 0 4%;
            display: flex;
            align-items: center;
          }
          .clip-background{
          width:76%;
          background-color:rgb(231, 232, 243);
          height:8px;
          border-radius:4px;
          margin-right: 12px;
          .clip{
            background-color: rgb(84, 131, 255);;
            height:8px;
            border-radius: 4px;
          }}
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
