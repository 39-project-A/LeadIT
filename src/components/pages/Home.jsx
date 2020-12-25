import React from "react";
import Header from "../templates/Header/Header";
import { Link } from "react-router-dom";
import {
  Img,
  Explain,
  TextTilte,
  AboutLeadIT,
  ButtonArea,
  Button,
  ButtonText,
  Footer,
} from "../../style/Home";

const Home = () => {
  return (
    <>
      <Header />
      <Img src="https://source.unsplash.com/random" alt="画像"></Img>

      <Explain>
        <TextTilte>LeadITについて</TextTilte>
        <AboutLeadIT>
          LeadITは、初学者の方達がITの知識とスキルを身につける事で今後のIT業界を伸ばす事に繋がる＝リードするアプリという考えからこのアプリ名を名付けました。
          このアプリは、プログラミング初学者にプログラミングの勉強を楽しく継続してもらう為のアプリです。
          そして、ユーザーがこのアプリに訪れた際に一目で自分の学習状況や成長具合を可視化し勉強
          に対してのモチベーションを保ってもらえるように様々な機能を駆使し作り上げました。
        </AboutLeadIT>
      </Explain>

      <ButtonArea>
        <Link to="/signin">
          <Button>
            <ButtonText>Let`s Start!!</ButtonText>
          </Button>
        </Link>
      </ButtonArea>
      <Footer></Footer>
    </>
  );
};

export default Home;
