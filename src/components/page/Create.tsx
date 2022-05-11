import { FC, useState, FormEvent } from "react";
import Select from "react-select";
import { projectStorage } from "../../firebase/config";
// import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import Loading from "../ui/Loading";
import InputText from "../ui/Input/InputText";
import InputNumber from "../ui/Input/InputNumber";
import InputTextarea from "../ui/Input/InputTextarea";
import InputFileMulti from "../ui/Input/InputFileMulti";
import axios from "axios";
import { useCookies } from "react-cookie";
// import { useAuth } from "../../hooks/useAuth";
import loadImage from "blueimp-load-image";

const categories = [
  { value: "bed", label: "Bed" },
  { value: "blanket", label: "Blanket" },
  { value: "chair", label: "Chair" },
  { value: "lamp", label: "Lamp" },
  { value: "plant", label: "Plant" },
  { value: "rug", label: "Rug" },
  { value: "table", label: "Table" },
  { value: "shelf", label: "Shelf" },
  { value: "sofa", label: "Sofa" },
];

type CategoryOp = {
  value: string;
};

const CreateProject: FC = () => {
  // const history = useHistory();
  // const { logout } = useAuth();

  const [name, setName] = useState<string>("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [description, setDescription] = useState<string>(
    "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  );
  const [price, setPrice] = useState<number>(Math.floor(Math.random() * 3000));
  const [width, setWidth] = useState<number>(Math.floor(Math.random() * 100));
  const [length, setLength] = useState<number>(Math.floor(Math.random() * 200));
  const [height, setHeight] = useState<number>(Math.floor(Math.random() * 300));
  const [stock, setStock] = useState<number>(Math.floor(Math.random() * 10));
  const [category, setCategory] = useState<CategoryOp | null>(null);
  const [formError, setFromError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cookies] = useCookies(["random", "jwt"]);

  const { user } = useAuthContext();

  if (!user) {
    throw new Error("Could not complete signup");
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // setFromError(null);
    if (!category) {
      setFromError("Please select a furniture category");
      return;
    }

    /**
     * base64のdataURLを返す関数
     */

    // const promises = photos.map(
    //   async (file): Promise<string | ArrayBuffer | null> => {
    //     return new Promise((resolve, reject) => {
    //       const reader = new FileReader();
    //       reader.onload = () => resolve(reader.result);
    //       reader.onerror = (error) => reject(error);
    //       reader.readAsDataURL(file);
    //     });
    //   }
    // );

    /**
     * データを圧縮する画像を返す
     */
    console.log(photos, "photos");
    const promises = photos.map(
      async (file): Promise<any> => {
        const data = await loadImage(file, {
          maxWidth: 500,
          canvas: true,
        });
        return new Promise((resolve, reject) => {
          (data.image as HTMLCanvasElement).toBlob(
            async (blob) => {
              if (!blob) return reject("error");
              const uploadPath = `photos/${user.uid}/${file.name}`;
              console.log(blob, "blob");
              try {
                const img = await projectStorage.ref(uploadPath).put(blob);
                const imgUrl = await img.ref.getDownloadURL();
                resolve(imgUrl);
              } catch (error) {
                reject();
              }
            },
            file.type,
            0.7
          );
        });
      }
    );

    const newPhotos = await Promise.all(promises);

    const furniture = {
      name,
      photos: newPhotos,
      description,
      price,
      stock,
      width,
      length,
      height,
      random: cookies.random,
      category: category.value,
    };
    console.log(furniture, "furniture");

    // try {
    const headers = {
      Authorization: `Bearer ${cookies.jwt}`,
    };
    const result = await axios.post(
      // `${process.env.REACT_APP_BASE_URL}/api/stripe-post`,
      "https://us-central1-temanashi-phase2.cloudfunctions.net/api/stripe-post",
      // "http://localhost:5001/temanashi-phase2/us-central1/api/stripe-post",
      furniture,
      { headers }
    );
    console.log(result);
    // } catch (error) {
    //   alert("Error on CreateFurniture");
    //   logout();
    //   history.push("/login");
    // } finally {
    setIsLoading(false);
    //   history.push("/");
    // }
  };
  return (
    <div className="common-container">
      {isLoading && <Loading />}
      <div className="create-form">
        <form onSubmit={handleSubmit}>
          <InputFileMulti name="photos" photos={photos} setPhotos={setPhotos} />
          <InputText label="name" state={name} setState={setName} />
          <InputTextarea
            label="description"
            state={description}
            setState={setDescription}
          />
          <InputNumber label="price" state={price} setState={setPrice} />
          <InputNumber label="strock" state={stock} setState={setStock} />
          <InputNumber label="width" state={width} setState={setWidth} />
          <InputNumber label="length" state={length} setState={setLength} />
          <InputNumber label="height" state={height} setState={setHeight} />
          <label>
            <span>Category</span>
            <Select
              onChange={(option) => setCategory(option)}
              options={categories}
            />
          </label>
          <button className="btn">Add Funiture</button>
          {formError && <p className="error">{formError}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
