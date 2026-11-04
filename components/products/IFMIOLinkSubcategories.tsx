import Image from 'next/image';
import { IFM_IO_LINK_GROUPS } from '@/lib/products/ifmInductiveSubcategories';

export default function IFMIOLinkSubcategories() {
  return (
    <div className="w-full space-y-8">
      {IFM_IO_LINK_GROUPS.map(({ title, subcategories }, groupIndex) => (
        <section
          key={title}
          className="w-full"
          aria-labelledby={`ifm-io-link-subcategories-heading-${groupIndex}`}
        >
          <div className="mb-5 flex items-center gap-3">
            <h2
              id={`ifm-io-link-subcategories-heading-${groupIndex}`}
              className="text-xl font-semibold text-[#0b2f4f]"
            >
              {title}
            </h2>
            <div className="h-px flex-1 bg-[#e47925] opacity-40" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
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
  );
}
