import { css } from '@emotion/css'
import styled from '@emotion/styled'
import { recommendation } from '../../../utilities/constant'
import { formatTaxIncludedPrice } from '../../../utilities'
import { Image } from '../../ui'
import { ProductItem } from '../../../utilities/stripeClient'
import { DashboardList } from '../dashboard'

const DisgnoseResultContainer = styled('div')`
  font-size: 16px;
`
const DisgnoseThumbnail = styled('div')`
  background: white;
  border-radius: 6px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  padding: 40px 0;
  text-align: center;
`
/*
 * 小コンポーネントに送るために作成
 */
const styledImageDisgnose = css`
  object-fit: cover;
  width: 700px;
`
const DisgnoseContent = styled('div')`
  margin: 20px 0;
`
const DisgnoseName = styled('h2')`
  font-size: 1.6rem;
`
const DisgnoseColors = styled('div')`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  width: 55%;
`
const DisgnoseItem = styled('div')`
  display: flex;
`
const DisgnoseItemCercle = styled('span')`
  border: 1px solid #444;
  border-radius: 50%;
  display: inline-block;
  height: 25px;
  margin-left: 10px;
  width: 25px;
  &.-white {
    background: white;
  }
  &.-grey {
    background: grey;
  }
`
const DisgnoseTotal = styled('span')`
  font-weight: bold;
  margin: 0 10px;
`
type DiagnoseResultProps = {
  db: Array<ProductItem>
}

export const DiagnoseResult: React.VFC<DiagnoseResultProps> = ({ db }) => {
  return (
    <>
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
      <DashboardList productItems={db} />
    </>
  )
}
