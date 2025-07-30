import { useState } from "react";
import { Plus } from "lucide-react";
import { usePromotions } from "../../hooks/usePromotions";
import PromotionBadge from "../../assets/images/promotion-badge.png";
import PromotionDetails from "../../components/admin/PromotionDetails";

export default function Promotions() {
  const [togglePromotion, setTooglePromotion] = useState<boolean>(false);
  const { data: promotions = [], isLoading } = usePromotions();

  return (
    <section className="px-4 py-3 font-outfit">
      <h3 className="text-[32px] font-bold">Promociones</h3>
      <div className="mt-3">
        {!togglePromotion ? (
          <>
            <button
              onClick={() => setTooglePromotion(true)}
              className="flex items-center gap-2 bg-[#8DE68A] text-[#242424] px-4 py-2 rounded"
            >
              <Plus /> Agregar nueva promoción
            </button>

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
                        <img
                          src={pr.image || ""}
                          alt={pr.name}
                          className="w-full h-40 object-contain rounded-md"
                        />
                      </div>
                      <p>{pr.name || "Sin nombre"}</p>
                      <p>${pr.price}</p>
                    </div>
                  ))
                )
              ) : (
                <p>No hay promociones disponibles</p>
              )}
            </div>
          </>
        ) : (
          <PromotionDetails />
        )}
      </div>
    </section>
  );
}
