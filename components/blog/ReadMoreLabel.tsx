"use client";

import { useTranslation } from "@/lib/context/TranslationContext";

export default function ReadMoreLabel() {
  const { t } = useTranslation();

  return <>{t("button.readMore")}</>;
}
