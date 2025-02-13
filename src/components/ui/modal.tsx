import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export function Modal({
  modalOpen,
  setModalOpen,
}: {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
}) {
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="sm:max-w-[480px] rounded-2xl p-6 shadow-lg bg-background-header border-none">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-text">
            Оставьте комментарий
          </DialogTitle>
          <DialogDescription className="text-text">
            Расскажите, почему вам не понравилось это сообщение.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            id="comment"
            placeholder="Введите ваш комментарий..."
            className="w-full min-h-[120px] p-3 text-text border border-[#434343] rounded-[8px] bg-textInput"
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            type="submit"
            className="w-full    transition-all rounded-xl py-2"
            onClick={() => setModalOpen(false)}
          >
            Отправить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
