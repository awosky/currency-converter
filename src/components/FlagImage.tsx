interface FlagImageProps {
  flag: string;
  alt: string;
  className?: string;
}

function getCountryCode(flag: string) {
  return [...flag].map((character) => String.fromCharCode(character.codePointAt(0)! - 0x1f1e6 + 97)).join("");
}

export function FlagImage({ flag, alt, className = "h-6 w-8" }: FlagImageProps) {
  return (
    <img
      src={`https://flagcdn.com/w40/${getCountryCode(flag)}.png`}
      alt={alt}
      className={`shrink-0 rounded-sm object-cover ${className}`}
      loading="lazy"
      onError={(event) => {
        event.currentTarget.replaceWith(document.createTextNode(flag));
      }}
    />
  );
}
