<template>
  <div class="home">
    <div class="header">
      <div>proposal</div>
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
            <!-- <el-dropdown-item class="l-dropdown-item">1231退出</el-dropdown-item> -->
            <div class="" @click="logout()">退出</div>
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
            <div class="share-copy">
              <div class="share">
                <div>※</div>
                <div>{{ $t("home.share") }}</div>
              </div>
            </div>
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
          <div class="vote-confirm">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <el-progress :text-inside="true" :stroke-width="26" :percentage="70" :format="yes"></el-progress>
              <el-button class="voteButton" @click="vote(1)">{{ $t("home.vote") }}</el-button>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:1rem;">
              <el-progress :text-inside="true" :stroke-width="26" :percentage="30" :format="no"></el-progress>
              <el-button class="voteButton" @click="vote(2)">{{ $t("home.vote") }}</el-button>
            </div>
          </div>
        </div>
        <div class="vote-number">
          <div class="numberText">{{ $t("home.vote_number") }}</div>
          <ul>
            <li v-for="(item, index) in voteList" :key="index">
              <div class="vote-head">
                <img class="headImg" src="@/assets/logo.png" alt="" />
                <div @mouseenter="voteDetail(index)">
                  {{ item.name }}
                </div>
              </div>
              <div>{{ item.vote }}</div>
              <div
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
              </div>
            </li>
          </ul>
          <button
            class="unfold-hide"
            v-if="detailList.length > 6"
            @click="changeFoldState"
          >
            展开剩余部分&gt;&gt;
          </button>
        </div>
      </div>
      <div class="section-right">
        <div class="right-fomat">
          <div class="inforText">{{ $t("home.information") }}</div>
          <div class="information">
            <div class="item-right">
              <div>策略</div>
              <div class="right-right">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Top Left"
                  placement="top-start"
                >
                  <el-button>
                    <img class="headImg" src="@/assets/logo.png" alt="" />
                  </el-button>
                </el-tooltip>
                <div>28198brbh</div>
              </div>
            </div>
            <div class="item-right">
              <div>作者</div>
              <div class="right-right">
                <img class="headImg" src="@/assets/logo.png" alt="" />
                <div>28198brbh</div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-fomat">
          <div class="inforText">{{ $t("home.result") }}</div>
          <div class="result">
            <div class="result-content">
              <div>Yes</div>
              <el-progress
                :percentage="100"
                :stroke-width="8"
                color="rgb(73,129,255)"
              ></el-progress>
            </div>
            <div class="result-content">
              <div>No</div>
              <el-progress
                :percentage="0"
                :stroke-width="8"
                color="rgb(73,129,255)"
              ></el-progress>
            </div>
            <div class="download">{{ $t("home.report") }}</div>
          </div>
        </div>
        <div class="right-fomat">
          <div class="inforText">Quorom</div>
          <div class="quorom">
            <el-progress
              :percentage="77"
              :stroke-width="8"
              color="rgb(73,129,255)"
            ></el-progress>
          </div>
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import axios from "axios";
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
      accountName:'',
      logs: [],
      brandFold: true,
      isVoteDetail: false,
      current: 0,
      index: 0,
      language:'zh-CN',
      signShow:false,
      detailList: [
        {
          name: "ewfewferf",
          vote: "Yes",
        },
        {
          name: "gfbdfb",
          vote: "No",
        },
        {
          name: "123444",
          vote: "Yes",
        },
        {
          name: "fgbghmj",
          vote: "N0",
        },
        {
          name: "078068loku",
          vote: "Yes",
        },
        {
          name: "4fwfvef",
          vote: "No",
        },
        {
          name: "0poieuh3b",
          vote: "Yes",
        },
        {
          name: "0998hjehjeh",
          vote: "No",
        },
        {
          name: "9283bmnnklm",
          vote: "Yes",
        },
        {
          name: "mlkdpoidpo090809",
          vote: "Yes",
        },
      ],
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
  },
  methods: {
    yes(){
      return 'YES'
    },
    no(){
      return 'NO'
    },
    //显示下拉框
    signOut(){
      this.signShow = !this.signShow
    },
    //显示更多
    changeFoldState() {
      this.brandFold = !this.brandFold;
    },
    voteDetail: function (index) {
      this.isVoteDetail = true; //鼠标移入显示
      this.current = index;
    },
    onMousteOut: function (index) {
      this.isVoteDetail = false; //鼠标移出隐藏
      this.current = null;
    },
    vote(i){
      if(i === 1){
        this.$alert('确定支持吗？', '投票', {
          confirmButtonText: '确定',
          callback: (action) => {
            if (action === 'confirm') {
              gxc.callContract(contractName, 'vote', {approve:true}, '', true).then(trx => {
                this.output(`call contract success`, trx)
              }).catch(error => {
                this.output(error)
              })
            }
          }
        })
      }else{
        this.$alert('确定不支持吗？', '投票', {
          confirmButtonText: '确定',
          callback: (action) => {
            if (action === 'confirm') {
              gxc.callContract(contractName, 'vote', {approve:false}, '', true).then(trx => {
                this.output(`call contract success`, trx)
              }).catch(error => {
                this.output(error)
              })
            }
          }
        })
      }
    },
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
* {
  margin: 0;
  padding: 0;
}
.el-button--primary{
   background-color: red !important;
}
.home {
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1.5rem 4%;
    background-color: rgb(231, 232, 243);
    z-index: 9;
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
      .about {
        border: 1px rgb(208, 201, 202) solid;
        font-size: 0.8em;
        padding: 4px 12px;
        border-radius: 16px;
      }
      .about:hover {
        border-color: rgb(195, 0, 58);
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
        .share-copy {
          display: flex;
          .copy {
            margin-right: 1.2rem;
          }
          .copy:hover {
            color: rgb(195, 0, 58);
          }
          .share {
            display: flex;
            color: rgb(163, 166, 196);
          }
          .share:hover {
            color: rgb(195, 0, 58);
          }
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
        .vote-confirm {
          padding: 0.8rem 2%;
          .el-progress{
            width: 80%;
          }
          .el-button{
            width: 16%;
            padding: 0.3rem;
            text-align: center;
            border:1px rgb(123, 166, 255) solid;
            color: rgb(123, 166, 255) ;
            border-radius:16px;
            font-size: 18px;
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
    .section-right {
      margin-top: 1rem;
      // float: right;
      width: 30%;
      .inforText {
        padding: 0.8rem 2%;
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
      .information {
        padding: 1rem 2%;
        .item-right {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.2rem;
        }
        .right-right {
          display: flex;
          align-items: center;
        }
        .headImg {
          width: 1rem;
          height: 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
        }
      }
      .result {
        padding: 0 4%;
        padding-bottom: 1.2rem;
        .result-content {
          margin-top: 1rem;
        }
      }
      .quorom {
        padding: 0 4%;
        .el-progress {
          margin: 2rem 0;
        }
      }
    }
  }
}
@media screen and (max-width: 900px) {
  .el-message-box{
    width:320px !important;
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
