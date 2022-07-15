import { useState } from 'react'
import styled from '@emotion/styled'
import { InputCheckbox, Button } from '../../ui'

const CartAgreementContainer = styled('div')`
  background: white;
  border-radius: 12px;
  box-shadow: 0 13px 21px rgba(0, 0, 0, 0.1);
  margin: 30px auto 0;
  padding: 20px 0;
  text-align: center;
  width: 100%;
`

interface CartAgreementProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  isLoading: boolean
}

export const CartAgreement: React.VFC<CartAgreementProps> = ({
  onClick,
  isLoading
}) => {
  const [isAccepted, setIsAccepted] = useState<boolean>(false)

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAccepted(!isAccepted)
  }

  return (
    <CartAgreementContainer>
      <InputCheckbox
        label="利用規約に同意しますか？"
        checked={isAccepted}
        value=""
        size="medium"
        onChange={(e) => onInputChange(e)}
      />
      <Button isDisabled={!isAccepted} onClick={onClick} isLoading={isLoading}>
        購入する
      </Button>
    </CartAgreementContainer>
  )
}
