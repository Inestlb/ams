import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  WAGO_RAIL_CATEGORY_CONTENT,
} from '@/lib/products/wagoRailCategory';

export default function WAGORailCategoryContent() {
  const content = WAGO_RAIL_CATEGORY_CONTENT;

  return (
    <article className="px-6 md:px-12">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:gap-14">
        <div>
          <h2 className="text-3xl font-bold leading-tight text-[#0b2f4f] md:text-4xl">
            {content.title}
          </h2>
          <p className="mt-8 text-[17px] leading-8 text-[#34383c]">
            {content.introduction}
          </p>

          <h3 className="mt-8 text-xl font-bold text-[#0b2f4f]">
            {content.advantagesTitle}
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-[16px] leading-7 text-[#34383c]">
            {content.advantages.map((advantage) => (
              <li key={advantage}>{advantage}</li>
            ))}
          </ul>

          <p className="mt-7 text-[16px] leading-7 text-[#34383c]">
            {content.closing}
          </p>

          <p className="mt-7 border-l-4 border-[#e47925] bg-[#fff7ef] px-5 py-4 text-[16px] font-semibold leading-7 text-[#0b2f4f]">
            {content.contactMessage}{' '}
            <Link
              href="/contact"
              className="inline-flex items-center text-[#e47925] underline decoration-1 underline-offset-4 hover:text-[#0b2f4f]"
            >
              contactez-nous
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </p>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden bg-white lg:mt-16">
          <Image
            src={content.image}
            alt={content.imageAlt}
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover object-top"
          />
        </div>
      </div>
    </article>
  );
}
