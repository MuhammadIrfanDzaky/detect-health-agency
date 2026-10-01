"use client";

import { X } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type HospitalItem = {
  id: string;
  name: string;
  city: string;
  logo: string | null;
  // Short summary for the card only. The dialog shows `about` + `points`
  // instead, so the same facts are not repeated.
  specialty: string;
  photo: string;
  photoAlt: string;
  about: string | null;
  points: string[];
};

type Labels = {
  viewDetails: string;
  close: string;
  advantages: string;
  detailsPending: string;
};

// All partner hospitals as one grid of large buttons. Choosing one opens a
// native <dialog> (focus trap, Esc to close, inert background for free) with
// the full profile. Open/close animation lives in globals.css (.hospital-dialog)
// and is switched off for prefers-reduced-motion.
export function HospitalDirectory({ items, labels }: { items: HospitalItem[]; labels: Labels }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  // Page overflow before the dialog locked it, restored on every close path.
  const prevOverflowRef = useRef<string | null>(null);
  const [active, setActive] = useState<HospitalItem | null>(null);
  // Mirrors `active` synchronously: the dialog's close event fires after a
  // task, so state alone cannot tell whether finish() already ran.
  const isOpenRef = useRef(false);

  function cancelCloseTimer() {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function unlockScroll() {
    if (prevOverflowRef.current !== null) {
      document.documentElement.style.overflow = prevOverflowRef.current;
      prevOverflowRef.current = null;
    }
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active && !dialog.open) {
      dialog.showModal();
      if (prevOverflowRef.current === null) {
        prevOverflowRef.current = document.documentElement.style.overflow;
        document.documentElement.style.overflow = "hidden";
      }
    }
  }, [active]);

  // Unmount: never leave a pending timer or a locked page behind.
  useEffect(
    () => () => {
      cancelCloseTimer();
      unlockScroll();
    },
    [],
  );

  function open(item: HospitalItem, trigger: HTMLButtonElement) {
    cancelCloseTimer();
    const dialog = dialogRef.current;
    if (dialog) delete dialog.dataset.closing;
    triggerRef.current = trigger;
    isOpenRef.current = true;
    setActive(item);
  }

  function close() {
    const dialog = dialogRef.current;
    // Ignore repeated X / Esc presses while the closing animation runs.
    if (!dialog || closeTimerRef.current !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    dialog.dataset.closing = "true";
    closeTimerRef.current = window.setTimeout(finish, 180);
  }

  // The single place a close is completed, whichever way it started.
  function finish() {
    closeTimerRef.current = null;
    isOpenRef.current = false;
    const dialog = dialogRef.current;
    if (dialog) {
      delete dialog.dataset.closing;
      if (dialog.open) dialog.close();
    }
    unlockScroll();
    setActive(null);
    const trigger = triggerRef.current;
    if (trigger?.isConnected) trigger.focus();
  }

  return (
    <>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
        {items.map((h) => (
          <li key={h.id}>
            <button
              type="button"
              onClick={(e) => open(h, e.currentTarget)}
              aria-haspopup="dialog"
              className="group flex h-full w-full flex-col items-start rounded-2xl border-2 border-transparent bg-bg p-6 text-left shadow-soft transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-brand active:scale-[0.99] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
            >
              {h.logo ? (
                <Image src={h.logo} alt="" width={240} height={64} className="h-12 w-auto max-w-[13rem] object-contain object-left" />
              ) : null}
              <span className="mt-5 text-xl font-semibold text-ink">{h.name}</span>
              <span className="mt-1 text-base font-medium text-accent-strong">{h.city}</span>
              <span className="mt-2 text-lg text-ink-soft">{h.specialty}</span>
              <span className="mt-auto pt-5 text-lg font-semibold text-accent-strong underline decoration-2 underline-offset-4 group-hover:text-ink">
                {labels.viewDetails}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* Without JavaScript the cards cannot open the dialog, so the full
          profiles are printed under the grid instead. */}
      <noscript>
        <div className="mt-10 space-y-8">
          {items.map((h) => (
            <div key={h.id} className="rounded-2xl bg-bg p-6">
              <h3 className="text-xl font-semibold text-ink">{h.name}</h3>
              <p className="mt-1 text-lg font-medium text-accent-strong">{h.city}</p>
              {h.about ? <p className="mt-3 text-lg text-ink">{h.about}</p> : null}
              {h.points.length ? (
                <ul className="mt-3 list-disc space-y-1 pl-6 text-lg text-ink marker:text-brand">
                  {h.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </noscript>

      <dialog
        ref={dialogRef}
        onClose={() => {
          // Closed by the browser itself (not through close()): finish up once.
          if (isOpenRef.current) {
            cancelCloseTimer();
            finish();
          }
        }}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          // Click on the backdrop (the dialog element itself) closes it.
          if (e.target === e.currentTarget) close();
        }}
        aria-labelledby="hospital-dialog-title"
        className="hospital-dialog m-auto w-[min(44rem,calc(100%-2rem))] overflow-hidden rounded-2xl bg-bg p-0 text-ink shadow-soft backdrop:bg-ink/40"
      >
        {active ? (
          <>
            {/* Close: fixed to the dialog's top-right corner (outside the
                scrolling area) so it stays in reach. First in DOM, so it also
                receives focus when the dialog opens. */}
            <button
              type="button"
              onClick={close}
              aria-label={labels.close}
              title={labels.close}
              className="absolute top-3 right-3 z-10 flex size-14 items-center justify-center rounded-full bg-bg text-ink shadow-soft ring-1 ring-rule transition-colors hover:bg-ink hover:text-bg"
            >
              <X size={28} weight="bold" aria-hidden="true" />
            </button>
            <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto">
              <div className="relative h-48 bg-tint-strong sm:h-60">
                <Image src={active.photo} alt={active.photoAlt} fill loading="eager" sizes="(min-width: 768px) 44rem, 100vw" className="object-cover" />
              </div>

              <div className="p-6 sm:p-8">
                {active.logo ? (
                  <Image src={active.logo} alt="" width={240} height={64} className="h-12 w-auto max-w-[14rem] object-contain object-left" />
                ) : null}
                <h3 id="hospital-dialog-title" className="mt-5 text-2xl font-semibold text-ink md:text-3xl">
                  {active.name}
                </h3>
                <p className="mt-1 text-lg font-medium text-accent-strong">{active.city}</p>

                {active.about ? (
                  <>
                    <p className="mt-5 text-lg leading-relaxed text-ink">{active.about}</p>
                    <h4 className="mt-7 border-b-2 border-brand pb-2 text-xl font-semibold text-ink">{labels.advantages}</h4>
                    <ul className="mt-4 list-disc space-y-2 pl-6 text-lg text-ink marker:text-brand">
                      {active.points.map((point) => (
                        <li key={point} className="pl-1">{point}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  // PLACEHOLDER: details for this hospital not provided yet.
                  <p className="mt-5 rounded-2xl bg-tint p-4 text-lg text-ink">{labels.detailsPending}</p>
                )}
              </div>
            </div>
          </>
        ) : null}
      </dialog>
    </>
  );
}
