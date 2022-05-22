import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { ja } from "date-fns/locale";
interface PaymentListProp {
  paymentItems: Array<any>;
}

const PaymentList: React.VFC<PaymentListProp> = ({ paymentItems }) => {
  return (
    <div className="payment-list">
      {paymentItems &&
        paymentItems.map((payment: any) => (
          <div key={payment.id}>
            {payment.items.map((item: any) => (
              <div key={item.id} className="box">
                <p className="name">
                  {item.description}
                  <span className="date">
                    (
                    {formatDistanceToNow(new Date(item.price.created), {
                      addSuffix: true,
                      locale: ja,
                    })}
                    )
                  </span>
                </p>

                <Link to={`/products/${item.price.product}`} className="link">
                  詳細を見る
                </Link>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};
export default PaymentList;
