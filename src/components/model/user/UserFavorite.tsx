import { FC } from "react";
import { useSubCollection } from "../../../hooks/useSubCollection";
import { convertedPath } from "../../../utilities/utilities";
import { User, likedFurnitures } from "../../../@types/dashboard";
import { useAuthContext } from "../../../hooks/useAuthContext";
import ProductList from "../dashboard/DashboardList";
import { ProductItem } from "../../../utilities/stripeClient";
// pendingを追加したい
// import Loading from "../../components/Loading";
import { NotFound } from "../../ui";

const UserFavorite: FC = () => {
  const { user } = useAuthContext();
  // nullチェック・通常のreturnだとエラーになる
  if (!user) throw new Error("we cant find your account");
  const { documents, error } = useSubCollection<User, likedFurnitures>(
    convertedPath(`/users/${user.uid}/liked_furnitures`)
  );

  // documentsの配列の中からliked_projectsを取り出す;
  const getLikedFurnitures = (
    documents: Array<likedFurnitures>
  ): Array<ProductItem> => {
    const likedFurnitures = documents.map((p) => {
      return p.liked_furniture;
    });
    return likedFurnitures;
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <div className="user-container">
        <div className="inner">
          {documents.length === 0 && <NotFound />}
          {/* {documents.length === 0 && <Loading />} */}
          {documents.length !== 0 && (
            <ProductList productItems={getLikedFurnitures(documents)} />
          )}
        </div>
      </div>
    </>
  );
};
export default UserFavorite;
