import { useStore } from "@/lib/store";

export default function Toasts() {
  const { toasts } = useStore();
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[100] flex w-[min(92vw,22rem)] -translate-x-1/2 flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="animate-fade-up rounded-full bg-primary px-5 py-3 text-center text-sm text-primary-foreground shadow-lg"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
