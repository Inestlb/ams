import Image from 'next/image';
import { IFM_PHOTOELECTRIC_GROUPS } from '@/lib/products/ifmInductiveSubcategories';

export default function IFMPhotoelectricSubcategories() {
  return (
    <section className="w-full" aria-labelledby="ifm-photoelectric-subcategories-heading">
      <div className="flex items-center gap-3 mb-5">
        <h2
          id="ifm-photoelectric-subcategories-heading"
          className="text-xl font-semibold text-[#0b2f4f]"
        >
          Sous-catégories
        </h2>
        <div className="h-px flex-1 bg-[#e47925] opacity-40" />
      </div>

      <div className="space-y-8">
        {IFM_PHOTOELECTRIC_GROUPS.map(({ title, subcategories }, groupIndex) => (
          <section key={title} aria-labelledby={`ifm-photoelectric-group-${groupIndex}`}>
            <div className="flex items-center gap-3 mb-5">
              <h3
                id={`ifm-photoelectric-group-${groupIndex}`}
                className="text-lg font-semibold text-[#0b2f4f]"
              >
                {title}
              </h3>
              <div className="h-px flex-1 bg-[#e47925] opacity-40" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {subcategories.map(({ name, image }) => (
                <div
                  key={image}
                  className="flex min-h-20 items-center gap-4 border border-[#cacdcf] bg-white p-3 text-[14px] font-medium text-[#0b2f4f]"
                >
                  <Image
                    src={image}
                    alt=""
                    width={80}
                    height={80}
                    sizes="64px"
                    className="h-16 w-16 shrink-0 object-contain"
                  />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
