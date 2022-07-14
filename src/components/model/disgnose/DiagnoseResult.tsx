import { db, recommendation } from "../../../utilities/constant";
import { formatTaxIncludedPrice } from "../../../utilities";
import { Loading, Image } from "../../ui";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import {
  DashboardListContainer,
  DashboardListWrapper,
  Thumbnail,
  styledImage,
  Content,
  Name,
  Price,
  DimentionContainer,
  DimentionInner,
  DimentionItem,
} from "../dashboard/DashboardList";

const DisgnoseResultContainer = styled("div")`
  font-size: 16px;
`;
const DisgnoseThumbnail = styled("div")`
  background: white;
  padding: 40px 0;
  text-align: center;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
`;
/*
 * 小コンポーネントに送るために作成
 */
const styledImageDisgnose = css`
  width: 700px;
  object-fit: cover;
`;
const DisgnoseContent = styled("div")`
  margin: 20px 0;
`;
const DisgnoseName = styled("h2")`
  font-size: 1.6rem;
`;
const DisgnoseColors = styled("div")`
  width: 55%;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;
const DisgnoseItem = styled("div")`
  display: flex;
`;
const DisgnoseItemCercle = styled("span")`
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid #444;
  margin-left: 10px;
  &.-white {
    background: white;
  }
  &.-grey {
    background: grey;
  }
`;
const DisgnoseTotal = styled("span")`
  font-weight: bold;
  margin: 0 10px;
`;

export const DiagnoseResult: React.VFC = () => {
  return (
    <>
      {db.length === 0 && recommendation && <Loading />}
      <DisgnoseResultContainer>
        <DisgnoseThumbnail>
          <Image
            src={recommendation.imageUrl!}
            className={styledImageDisgnose}
          />
        </DisgnoseThumbnail>
        <DisgnoseContent>
          <DisgnoseName>シンプル風</DisgnoseName>
          <p className="text">{recommendation.details}</p>
          <DisgnoseColors>
            <DisgnoseItem>
              <p className="text">ベースカラー：{recommendation.baseColor}</p>
              <DisgnoseItemCercle />
            </DisgnoseItem>
            <DisgnoseItem>
              <p className="text">サブカラー：{recommendation.subColor}</p>
              <DisgnoseItemCercle />
            </DisgnoseItem>
          </DisgnoseColors>
          <div className="price">
            <DisgnoseItem>
              この組み合わせで
              <DisgnoseTotal>{formatTaxIncludedPrice(1200000)}円</DisgnoseTotal>
            </DisgnoseItem>
          </div>
        </DisgnoseContent>
      </DisgnoseResultContainer>
      <DashboardListContainer>
        {db.map((furniture) => (
          <DashboardListWrapper to="/diagnose" key={furniture.name}>
            <Thumbnail>
              {furniture.imageUrl && (
                <Image src={furniture.imageUrl} className={styledImage} />
              )}
            </Thumbnail>
            <Content>
              <Name>{furniture.name}</Name>
              {furniture.price && (
                <Price>{formatTaxIncludedPrice(furniture.price)}</Price>
              )}
              <DimentionContainer>
                <DimentionInner>
                  <DimentionItem>幅 {furniture.width}cm</DimentionItem>
                  <DimentionItem>深さ {furniture.depth}cm</DimentionItem>
                  <DimentionItem>高さ {furniture.height}cm</DimentionItem>
                </DimentionInner>
              </DimentionContainer>
            </Content>
          </DashboardListWrapper>
        ))}
      </DashboardListContainer>
    </>
  );
};
