import FindUserForm from "@features/chat/components/SideBar/FindUserForm";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { closeModal } from "@redux/modal/modalSlice";

export default function ModalManager() {
  const { open, type, header } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const modals = {
    FindUserForm
  }

  let renderedModal;
  if(type &&  open){
    const ModalComponent = (modals as any)[type];
    renderedModal = <ModalComponent />
  }

  return (
    <Dialog fullWidth open={open} onClose={() => dispatch(closeModal())}>
      <DialogTitle>{header}</DialogTitle>
      <DialogContent>
        { renderedModal }
      </DialogContent>
    </Dialog>
  )
}
