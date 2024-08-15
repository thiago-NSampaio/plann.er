import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { Button } from "../../components/button";
import { CreateLinkModal } from "./create-link-modal";

export function TripDetailsPage() {
  const [isOpenCreateActivityModal, SetIsOpenCreateActivityModal] =
    useState(false);

  const [isOpenCreateLinkModal, SetIsOpenCreateLinkModal] = useState(false);

  function openCreateActivityModal() {
    SetIsOpenCreateActivityModal(true);
  }

  function closeCreateActivityModal() {
    SetIsOpenCreateActivityModal(false);
  }

  function openCreateLinkModal() {
    SetIsOpenCreateLinkModal(true);
  }

  function closeCreateLinkModal() {
    SetIsOpenCreateLinkModal(false);
  }

  return (
    <div className="max-w-2xl ml-2 mr-2 space-y-4 md:px-6 py-10 md:mx-auto md:space-y-8 md:max-w-6xl">
      <DestinationAndDateHeader />
      <main className="flex flex-col md:flex-row md:gap-16 md:px-6">
        <div className="flex-1 md:space-y-6 mb-3 md:mb-0">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold md:text-3xl">Atividades</h2>
            <Button onClick={openCreateActivityModal}>
              <p className="text-sm md:text-lg">Cadastrar atividade</p>
              <Plus className="size-5" />
            </Button>
          </div>
          <Activities />
        </div>
        <div className="md:w-80 space-y-6">
          <ImportantLinks openCreateLinkModal={openCreateLinkModal} />
          <div className="w-full h-px bg-zinc-800" />
          <Guests />
        </div>
      </main>

      {isOpenCreateActivityModal && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}

      {isOpenCreateLinkModal && (
        <CreateLinkModal closeCreateLinkModal={closeCreateLinkModal} />
      )}
    </div>
  );
}
