import styled from '@emotion/styled'
import { DashboardList } from '../dashboard'
import { ProductItem } from '../../../functionals/types/Product'
import { ErrorNotFound } from '../../uis'

const UserContaienr = styled('div')`
  background: #f4f4f4;
  min-height: 300px;
  width: 100%;
`
interface UserFavoriteProps {
  productItems: Array<ProductItem>
}

export const UserFavorite: React.VFC<UserFavoriteProps> = ({
  productItems
}) => {
  return (
    <UserContaienr>
      {productItems.length !== 0 ? (
        <DashboardList productItems={productItems} />
      ) : (
        <ErrorNotFound />
      )}
    </UserContaienr>
  )
}
