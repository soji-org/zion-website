'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Check, ChevronDown, Globe2 } from 'lucide-react'

import { Locale, localeCookieName, localeNames, locales, resolveLocale } from '@/lib/i18n'

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('Common')
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const activeLocale = resolveLocale(locale)

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  function handleChange(value: string) {
    const nextLocale = resolveLocale(value)
    setOpen(false)
    document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`
    document.documentElement.lang = nextLocale
    document.documentElement.dir = nextLocale === 'ar' ? 'rtl' : 'ltr'
    startTransition(() => router.refresh())
  }

  return (
    <div ref={menuRef} className={`relative ${className}`}>
      <button
        type="button"
        disabled={isPending}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-[44px] items-center gap-2 border border-stone-200 bg-stone-50 px-3 text-sm text-stone-900 hover:border-stone-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 disabled:opacity-60 motion-safe:transition motion-reduce:transition-none"
        aria-label={t('language')}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe2 className="h-4 w-4 text-[#7D30E0]" aria-hidden="true" />
        <span className="hidden text-stone-900/45 sm:inline">{t('language')}</span>
        <span className="font-medium uppercase tracking-wide">{activeLocale}</span>
        <ChevronDown
          className={`h-4 w-4 text-stone-900/35 motion-safe:transition motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          className="absolute right-0 top-[calc(100%+0.5rem)] z-[70] w-52 border border-stone-200 bg-white p-1 shadow-xl shadow-stone-950/10 rtl:left-0 rtl:right-auto"
          role="listbox"
          aria-label={t('language')}
        >
          {locales.map((item: Locale) => {
            const selected = item === activeLocale
            return (
              <button
                key={item}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => handleChange(item)}
                className={`flex min-h-[40px] w-full items-center justify-between px-3 text-left text-sm motion-safe:transition motion-reduce:transition-none ${
                  selected
                    ? 'bg-stone-900 text-stone-50'
                    : 'text-stone-900 hover:bg-stone-100'
                }`}
              >
                <span>{localeNames[item]}</span>
                <span className="flex items-center gap-2">
                  <span className={selected ? 'text-stone-50/60' : 'text-stone-900/35'}>
                    {item.toUpperCase()}
                  </span>
                  {selected && <Check className="h-4 w-4" aria-hidden="true" />}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
