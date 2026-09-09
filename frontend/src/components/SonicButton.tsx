import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";

// filepath: SonicButton.tsx
type SonicButtonProps = PropsWithChildren<
  ComponentPropsWithoutRef<"button">
>;

export const SonicButton = ({
  children,
  className = "",
  ...props
}: SonicButtonProps) => {
  return (
    <button
      {...props}
      type="submit"
      className={`group relative w-full overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900 py-3 text-sm font-medium text-white transition-all duration-300 cursor-pointer shadow-lg hover:border-blue-500/50 ${className}`}
    >
      {/* Fondo de ecualizador con marea y destellos */}
      <div className="absolute inset-0 overflow-hidden py-1 px-1.5 opacity-30 group-hover:opacity-95 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 flex items-end justify-around gap-[4px] w-[200%] animate-marquee">
          {[...Array(2)].flatMap(() =>
            Array.from({ length: 30 }).map((_, i) => (
              <span
                key={i}
                style={{
                  height: `${Math.max(15, ((i * 11) % 50) + 15)}%`,
                  animation: `equalizer-wave ${0.8 + (i % 5) * 0.2}s ease-in-out infinite`,
                  animationDelay: `${i * 0.08}s`,
                  transformOrigin: "bottom",
                }}
                className="w-[3px] bg-gradient-to-t from-blue-600 via-indigo-400 to-cyan-300 rounded-t-full inline-block"
              ></span>
            ))
          )}
        </div>
      </div>

      {/* Capa de contraste oscuro */}
      <div className="absolute inset-0 bg-zinc-950/60 group-hover:bg-zinc-950/25 transition-colors duration-500"></div>

      {/* Texto o contenido del botón */}
      <span className="relative z-10 flex items-center justify-center font-semibold tracking-wide">
        {children}
      </span>
    </button>
  );
};