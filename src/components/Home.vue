<template>
  <div class="home" @click="hidePanel($event)">
    <div class="header">
      <div>proposal</div>
      <div class="header-right">
        <div class="link-wallet" @click="connectWAllet($event)">
          {{ $t("home.wallet") }}
        </div>
        <div class="about" @click="aboutWAllet($event)">?</div>
        <div class="language">
          <div @click="swicthLanguage('zh-CN')" :class="language == 'zh-CN' ? 'switch' : 'not-switch'">中</div>
          <div @click="swicthLanguage('en-US')" :class="language == 'en-US' ? 'switch' : 'not-switch'">EN</div>
        </div>
      </div>
    </div>
    <div class="popContainer" v-show="isShowModal" id="child">
      <div class="walletToast" ref="msk">
        <div class="title">
          <div style="color: white">＜</div>
          <div>连接钱包</div>
          <div @click="close()">×</div>
        </div>
        <div class="wallet-content">连接钱包</div>
        <div class="wallet-content">连接钱包</div>
        <div class="wallet-content">连接钱包</div>
        <div class="wallet-content">连接钱包</div>
      </div>
    </div>
    <div class="popContainer" v-show="aboutShowModal">
      <div class="walletToast" ref="msk">
        <div class="title">
          <div style="color: white">＜</div>
          <div>关于</div>
          <div @click="close()">×</div>
        </div>
        <div class="shareLink">
          <img class="shareImg" src="@/assets/logo.png" alt="" />
          <img class="shareImg" src="@/assets/logo.png" alt="" />
          <img class="shareImg" src="@/assets/logo.png" alt="" />
          <img class="shareImg" src="@/assets/logo.png" alt="" />
          <img class="shareImg" src="@/assets/logo.png" alt="" />
          <img class="shareImg" src="@/assets/logo.png" alt="" />
        </div>
        <div class="aboutDetail">
          <div class="language">
            <div>语言</div>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section-left">
        <h2 class="title">IP-82: Move yUSD funds to yDAI Vault</h2>
        <div class="share-active">
          <div class="active">活跃</div>
          <div class="share-copy">
            <div class="copy">...</div>
            <div class="share">
              <div>※</div>
              <div>分享</div>
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
        <div class="vote">
          <div class="voteText">投票</div>
          <div class="vote-confirm">
            <button @click="select(1)" :class="index == 1 ? 'use' : 'not-use'">
              Yes
            </button>
            <button @click="select(2)" :class="index == 2 ? 'use' : 'not-use'">
              No
            </button>
            <button
              :disabled="disabled"
              :class="disabled ? 'disable-button' : 'vote-button'"
            >
              投票
            </button>
          </div>
        </div>
        <div class="vote-number">
          <div class="numberText">投票数</div>
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
          <div class="inforText">信息</div>
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
                <!-- <img class="headImg" src="@/assets/logo.png" alt="" /> -->
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
          <div class="inforText">当前结果</div>
          <div class="result">
            <div class="result-content">
              <div>Yes</div>
              <el-progress
                :percentage="100"
                :stroke-width="8"
                color="rgb(195,0,58)"
              ></el-progress>
            </div>
            <div class="result-content">
              <div>No</div>
              <el-progress
                :percentage="0"
                :stroke-width="8"
                color="rgb(195,0,58)"
              ></el-progress>
            </div>
            <div class="download">下载报告</div>
          </div>
        </div>
        <div class="right-fomat">
          <div class="inforText">Quorom</div>
          <div class="quorom">
            <el-progress
              :percentage="77"
              :stroke-width="8"
              color="rgb(195,0,58)"
            ></el-progress>
          </div>
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      isShowModal: false,
      brandFold: true,
      aboutShowModal: false,
      isVoteDetail: false,
      current: 0,
      index: 0,
      language:'zh-CN',
      disabled: true,
      visible: false,
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
  },
  methods: {
    //显示更多
    changeFoldState() {
      this.brandFold = !this.brandFold;
    },
    //点击显示连接钱包
    connectWAllet(ev) {
      if (!this.$refs.msk.contains(ev.target)) {
        this.isShowModal = !this.isShowModal;
      }
    },
    //点击显示about
    aboutWAllet(event) {
      if (!this.$refs.msk.contains(event.target)) {
        this.aboutShowModal = !this.aboutShowModal;
      }
    },
    //关闭遮罩层
    close() {
      this.isShowModal = false;
      this.aboutShowModal = false;
    },
    hidePanel(event) {
      let dom = document.getElementById("child");
      if (dom) {
        if (!dom.contains(event.target)) {
          //这句是说如果我们点击到了id为child以外的区域
          this.isShowModal = false;
        }
      }
    },
    voteDetail: function (index) {
      this.isVoteDetail = true; //鼠标移入显示
      this.current = index;
    },
    onMousteOut: function (index) {
      this.isVoteDetail = false; //鼠标移出隐藏
      this.current = null;
    },
    //是否投票
    select(i) {
      this.disabled = false;
      this.index = i;
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
* {
  margin: 0;
  padding: 0;
}
.home {
  .el-button {
    border: none !important;
  }
  .popContainer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.5);
    .walletToast {
      background-color: white;
      width: 28%;
      height: 20rem;
      margin: 12rem 32%;
      border-radius: 6px;
      .title {
        padding: 0.9rem 1.2rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px rgb(208, 201, 202) solid;
      }
      .wallet-content {
        text-align: center;
        width: 72%;
        border: 1px rgb(208, 201, 202) solid;
        border-radius: 18px;
        padding: 8px;
        margin-top: 1.2rem;
        margin-left: 10%;
      }
      .shareLink {
        display: flex;
        margin-top: 1.2rem;
        justify-content: center;
        .shareImg {
          width: 2rem;
          height: 2rem;
          margin-right: 3%;
        }
      }
      .aboutDetail {
        width: 80%;
        height: 10rem;
        border: 1px rgb(208, 201, 202) solid;
        border-radius: 6px;
        margin-left: 10%;
        margin-top: 1.2rem;
      }
    }
  }
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1.5rem 8%;
    background-color: rgb(242, 237, 239);
    z-index: 99;
    .header-right {
      display: flex;
      flex-direction: row;
      .link-wallet {
        border: 1px rgb(208, 201, 202) solid;
        font-size: 0.8em;
        padding: 4px 12px;
        border-radius: 16px;
        margin-right: 0.8rem;
      }
      .link-wallet:hover {
        border-color: rgb(195, 0, 58);
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
    position: fixed;
    right: 0;
    top: 0;
    left: 0;
    border-bottom: 1px rgb(208, 201, 202) solid;
    .language{
        display: flex;
        // border: 1px rgb(208, 201, 202) solid;
        padding: 4px 12px;
        width: 3rem;
        justify-content: space-around;
        border-radius: 16px;
        .switch{
          background: rgb(195, 0, 58);
          color: #fff;
          width: 1.6rem;
          text-align: center;
        }
        .not-switch{
          color: grey;

        }
      }
  }
  .section {
    margin-top: 50px;
    padding: 1.5rem 8%;
    .section-left {
      margin-top: 1rem;
      float: left;
      width: 63%;
      margin-bottom: 1.2rem;
      .share-active {
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
        .active {
          background-color: rgb(35, 170, 92);
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
          }
          .share:hover {
            color: rgb(195, 0, 58);
          }
        }
      }
      p {
        margin-top: 1.2rem;
      }
      .vote {
        .voteText {
          padding: 0.8rem 2%;
        }
        margin-top: 1.2rem;
        border: 1px rgb(208, 201, 202) solid;
        border-radius: 6px;
        .vote-confirm {
          border-top: 1px rgb(208, 201, 202) solid;
          padding: 0.8rem 2%;
          .use {
            text-align: center;
            width: 72%;
            border: 1px rgb(195, 0, 58) solid;
            border-radius: 16px;
            padding: 6px;
            margin-bottom: 12px;
            margin-left: 14%;
            background-color: #fff;
          }
          .not-use {
            text-align: center;
            width: 72%;
            border: 1px rgb(208, 201, 202) solid;
            border-radius: 16px;
            padding: 6px;
            margin-bottom: 12px;
            margin-left: 14%;
            background-color: #fff;
          }
          .not-use:hover {
            border: 1px rgb(195, 0, 58) solid;
          }
          .vote-button {
            text-align: center;
            width: 72%;
            background-color: rgb(195, 0, 58);
            color: #fff;
            border-radius: 16px;
            padding: 6px;
            margin-bottom: 12px;
            margin-left: 14%;
            border: none;
          }
          .disable-button {
            text-align: center;
            width: 72%;
            background-color: rgb(208, 201, 202);
            border-radius: 16px;
            padding: 6px;
            margin-bottom: 12px;
            margin-left: 14%;
            border: none;
          }
        }
      }
      .vote-number {
        margin-top: 1.2rem;
        border: 1px rgb(208, 201, 202) solid;
        border-radius: 6px;
        .numberText {
          padding: 0.8rem 2%;
        }
        ul {
          // border-top: 1px rgb(208, 201, 202) solid;
          li {
            list-style: none;
            padding: 0.8rem 2%;
            border-top: 1px rgb(208, 201, 202) solid;
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
          border-top: 1px rgb(208, 201, 202) solid;
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
      float: right;
      width: 30%;
      .inforText {
        padding: 0.8rem 2%;
        border-bottom: 1px rgb(208, 201, 202) solid;
      }
      .right-fomat {
        border: 1px rgb(208, 201, 202) solid;
        border-radius: 6px;
        margin-bottom: 1.2rem;
        .download {
          text-align: center;
          width: 80%;
          border: 1px rgb(208, 201, 202) solid;
          border-radius: 16px;
          padding: 4px;
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
.footer {
}
@media screen and (max-width: 900px) {
  .popContainer {
    width: 100% !important;
    height: 100% !important;
    z-index: 100;
    background-color: white !important;
    .walletToast {
      // background-color: white;
      width: 100% !important;
      height: 100% !important;
      margin: 0 !important;
      .title {
        padding: 0.9rem 1.2rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px rgb(208, 201, 202) solid;
      }
      .wallet-content {
        text-align: center;
        width: 72%;
        border: 1px rgb(208, 201, 202) solid;
        border-radius: 18px;
        padding: 8px;
        margin-top: 1.2rem;
        margin-left: 10%;
      }
    }
  }
  .section {
    .section-left {
      width: 100% !important;
      clear: both;
    }
    .section-right {
      width: 100% !important;
      clear: both;
    }
  }
}
</style>
