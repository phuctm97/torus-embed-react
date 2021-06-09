import { useState } from "react";
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";
import wordmark from "./wordmark.svg";
import "./App.css";

function App() {
  const [account, setAccount] = useState();

  const onClickLogin = async () => {
    const torus = new Torus({});
    await torus.init({
      enableLogging: false,
      // Example white-labeling configuration
      whiteLabel: {
        theme: {
          isDark: false,
          colors: {
            torusBrand1: "#000000",
            torusGray2: "#FBF7F3",
          },
        },
        logoDark: "https://startrail.io/images/front/startrail-top__main.svg", // Dark logo for light background
        logoLight: "https://images.toruswallet.io/startrail-logo-light.svg", // Light logo for dark background
        topupHide: false,
        featuredBillboardHide: true,
        tncLink: {
          en: "http://example.com/tnc/en",
          ja: "http://example.com/tnc/ja",
        },
        privacyPolicy: {
          en: "http://example.com/tnc/en",
          ja: "http://example.com/tnc/ja",
        },
        contactLink: {
          en: "http://example.com/tnc/en",
          ja: "http://example.com/tnc/ja",
        },
        disclaimerHide: true,
        defaultLanguage: "en",
        customTranslations: {
          en: {
            login: {
              acceptTerms: "By logging in, you accept Examples",
              your: "Your",
              digitalWallet: "digital wallet instantly",
              buttonText: "Login with Startrail",
            },
            dappTransfer: {
              data: "Data to sign",
            },
            dappPermission: {
              permission: "Permission",
              requestFrom: "Request from",
              accessUserInfo:
                "To access your Google Email Address, Profile Photo and Name",
            },
          },
          ja: {
            login: {
              acceptTerms: "ログインすると、Examples を受け入れます",
              your: "君の",
              digitalWallet: "すぐにデジタルウォレット",
              buttonText: "Startrailでログイン",
            },
            dappTransfer: {
              data: "あなたがサインするデータ",
            },
            dappPermission: {
              permission: "下記の内容を許可しますか",
              requestFrom: "許可を求めているアプリケーション",
              accessUserInfo:
                "受け取る情報: Googleメール、プロフィール写真、名前",
            },
          },
        },
      },
    });
    await torus.login();

    const web3 = new Web3(torus.provider);
    const address = (await web3.eth.getAccounts())[0];
    const balance = await web3.eth.getBalance(address);
    setAccount({ address, balance });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={wordmark} className="App-logo" alt="logo" />
        {account ? (
          <div className="App-info">
            <p>
              <strong>Address</strong>: {account.address}
            </p>
            <p>
              <strong>Balance</strong>: {account.balance}
            </p>
          </div>
        ) : (
          <>
            <p>You didn't login yet. Login to see your account details.</p>
            <button className="App-link" onClick={onClickLogin}>
              Login
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
