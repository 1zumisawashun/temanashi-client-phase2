import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { RandomContext } from "../context/RandomContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used inside an AuthContextProvider"
    );
  }
  return context;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCartContext must be used inside an CartContextProvider"
    );
  }
  return context;
};

export const useRandomContext = () => {
  const context = useContext(RandomContext);
  if (!context) {
    throw new Error(
      "useRandomContext must be used inside an RandomContextProvider"
    );
  }
  return context;
};