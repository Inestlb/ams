import Image from 'next/image';
import { IFM_ULTRASONIC_SUBCATEGORIES } from '@/lib/products/ifmInductiveSubcategories';

export default function IFMUltrasonicSubcategories() {
  return (
    <section className="w-full" aria-labelledby="ifm-ultrasonic-subcategories-heading">
      <div className="flex items-center gap-3 mb-5">
        <h2
          id="ifm-ultrasonic-subcategories-heading"
          className="text-xl font-semibold text-[#0b2f4f]"
        >
          Sous-catégories
        </h2>
        <div className="h-px flex-1 bg-[#e47925] opacity-40" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {IFM_ULTRASONIC_SUBCATEGORIES.map(({ name, image }) => (
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
  );
}
