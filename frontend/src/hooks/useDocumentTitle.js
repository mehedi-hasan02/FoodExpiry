import { useEffect } from "react";

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | FoodExpiry` : "FoodExpiry";
  }, [title]);
};

export default useDocumentTitle;
