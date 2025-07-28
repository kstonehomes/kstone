"use client"
import { createContext, useContext, useState } from "react";

interface FormPopupProps {
  isCityOpen: boolean;
  setCityOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export const FormPopupContext = createContext<FormPopupProps>({
  isCityOpen: false,
  setCityOpen: ()=> {}
})


export const FormPopupProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isCityOpen, setCityOpen] = useState<boolean>(false);

  return ( 
    <FormPopupContext.Provider value={{ isCityOpen, setCityOpen }}>
      {children}
    </FormPopupContext.Provider>
  );
};



export const useFormPopup = () => {
  const context = useContext(FormPopupContext);
  if (!context) {
    throw new Error("useFormPopup must be used within a FormPopupProvider");
  }
  return context;
};