import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { usePromotions } from "../../hooks/usePromotions";
import PromotionBadge from "../../assets/images/promotion-badge.png";
import PromotionDetails from "../../components/admin/PromotionDetails";
import { useDeletePromotion } from "../../hooks/useDeletePromotion";
import { toast } from "sonner";

export default function Promotions() {
  const [isId, setIsId] = useState<string>("")
  const [togglePromotion, setTooglePromotion] = useState<boolean>(false);
  const [isMode, setIsMode] = useState<"create" | "edit">("create");
  const { data: promotions = [], isLoading, isError, refetch } = usePromotions();
  const { mutate } = useDeletePromotion();

  const handleDeleteProduct = (id: string) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta promocion?");
    if (!confirmDelete) return;

    mutate(id,
      {
        onSuccess: () => {
          toast.success("promocion eliminada")
          refetch()
        },
        onError: (error) => {
          toast.error(`error: ${error}`)
          console.error(error)
        }
      })
  }

  const openPromotionDetails = (mode: "create" | "edit", id: string = "") => {
    setTooglePromotion(true);
    setIsMode(mode);
    setIsId(id)
  };

  useEffect(() => {
    if (!togglePromotion) {
      setTimeout(() => {
        refetch();
      }, 0);
    }
  }, [togglePromotion, refetch]);

  return (
    <section className="px-4 py-3 font-outfit">
      <h3 className="text-[32px] font-bold">Promociones</h3>
      <div className="mt-3">
        {!togglePromotion ? (
          <>
            <button
              onClick={() => openPromotionDetails("create")}
              className="flex items-center gap-2 bg-[#8DE68A] text-[#242424] px-4 py-2 rounded"
            >
              <Plus /> Agregar nueva promoción
            </button>

            {isError ? (
              <div className="mt-10 text-red-500 text-center">
                Error al cargar promociones.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                {isLoading ? (
                  <p>Cargando promociones...</p>
                ) : promotions.length > 0 ? (
                  promotions.map((promotion) =>
                    promotion.products.map((pr) => (
                      <div
                        key={pr.id}
                        className="flex flex-col gap-2 outline outline-1 outline-[#E8E8E8] rounded-lg p-2"
                      >
                        <div className="relative rounded-2xl cursor-pointer">
                          {/* DESCUENTO */}
                          {promotion?.data.percent && (
                            <figure className="absolute top-1 left-1 w-12 drop-shadow-md">
                              <label className="absolute bottom-3.5 text-sm left-1/2 -translate-x-1/2 text-white">
                                {promotion.data.percent}%
                              </label>
                              <img
                                className="object-cover w-full"
                                src={PromotionBadge}
                                alt={`Insignia de descuento del ${promotion.data.percent}%`}
                                width={500}
                                height={500}
                                loading="lazy"
                              />
                            </figure>
                          )}
                          {/* COMBO */}
                          {promotion?.data.buy && promotion?.data.pay && (
                            <figure className="absolute top-1 left-1 w-12 drop-shadow-md">
                              <label className="absolute bottom-3.5 text-sm left-1/2 -translate-x-1/2 text-white text-nowrap">
                                {promotion.data.buy}x{promotion.data.pay}
                              </label>
                              <img
                                className="object-cover w-full"
                                src={PromotionBadge}
                                alt={`Insignia de promoción ${promotion.data.buy}x${promotion.data.pay}`}
                                width={500}
                                height={500}
                                loading="lazy"
                              />
                            </figure>
                          )}
                          {/* REGALO */}
                          {promotion?.data.giftProductId && (
                            <label className="p-1 rounded-md bg-yellow-300/50 absolute top-1 left-0 text-sm text-black text-nowrap">
                              {promotion.data.minQuantity} producto/s de regalo
                            </label>
                          )}
                          <img
                            src={pr.image || ""}
                            alt={pr.name}
                            className="w-full h-40 object-contain rounded-md"
                          />
                        </div>
                        <p>{pr.name || "Sin nombre"}</p>
                        <p>${pr.price}</p>
                        <div className="flex justify-between gap-2">
                          <button
                            onClick={() => openPromotionDetails("edit", promotion.id)}
                            className="flex-1 p-2 bg-[#8DE68A] rounded-md"
                          >
                            Editar promocion
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(promotion.id)}
                            className="flex-1 p-2 bg-[#ea737d] rounded-md text-nowrap"
                          >
                            Eliminar promocion
                          </button>
                        </div>
                      </div>
                    ))
                  )
                ) : (
                  <p>No hay promociones disponibles</p>
                )}
              </div>
            )}
          </>
        ) : (
          <PromotionDetails
            mode={isMode}
            setTooglePromotion={setTooglePromotion}
            id={isId ?? ""}
          />
        )}
      </div>
    </section>
  );
}
