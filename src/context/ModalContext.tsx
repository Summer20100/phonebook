import { createContext, useContext, useState } from 'react';

interface IModalContext {
  modal: boolean
  open: () => void
  close: () => void
  ass: () => void
}

export const ModalContext = createContext<IModalContext>({
  modal: false,
  open: () => {},
  close: () => {},
  ass: () => {}
})

export const ModalState = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState(false);
  
  const open = () => setModal(true);
  const close = () => setModal(false);
  const ass = () => console.log("ЖОПА ТУТ");
  
  return (
    <ModalContext.Provider value={{ modal, open, close, ass }}>
      { children }
    </ModalContext.Provider>
  )
}