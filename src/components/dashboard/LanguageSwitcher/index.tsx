import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import "./index.scss"; // Import global SCSS file
import Image from "next/image";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [language, setLanguage] = React.useState<string>("uz");

  useEffect(() => {
    // Determine language from pathname
    const currentLanguage = pathname?.startsWith("/ru") ? "ru" : "uz";
    setLanguage(currentLanguage);
  }, [pathname]);

  const handleLanguageChange = () => {
    const newLanguage = language === "uz" ? "ru" : "uz";
    const newPathname = pathname?.replace(/^\/(uz|ru)/, "") || "";
    router.push(`/${newLanguage}${newPathname}`);
    setLanguage(newLanguage);
  };

  return (
    <div className="language-switcher">
      <button className="sideBarLink" onClick={handleLanguageChange}>
        <Image
          src="/images/language.svg"
          alt="website"
          width="25"
          height="25"
        />
        <h3 className="sideBarLinkLabel sideBarLinkLabelLanguage">
          {language === "uz" ? "Uzbek" : "Русский"}
        </h3>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
