/** Full InfoJoy logo. Light and dark versions swap with the site theme. */
export function Logo({ className = "" }: { className?: string }) {
  const cls = `h-9 w-auto select-none md:h-10 ${className}`;
  return (
    <>
      <img src="/infojoy-logo.png" alt="InfoJoy" width={1208} height={413} decoding="async" draggable={false} className={`${cls} dark:hidden`} />
      <img src="/infojoy-logo-dark.png" alt="InfoJoy" width={1208} height={413} decoding="async" draggable={false} className={`${cls} hidden dark:block`} />
    </>
  );
}
