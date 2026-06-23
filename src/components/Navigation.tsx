"use client"

import { Montserrat } from "next/font/google"
import { useState } from "react"
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { useTranslations } from "next-intl"
import LocaleSwitcher from "./LocaleSwitcher"
import { Link } from "@/i18n/routing"

const montserrat = Montserrat({ subsets: ["latin"] })

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = useTranslations("navigation")

  return (
    <div className={montserrat.className + " bg-white"}>
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              alt="our logo"
              width="64"
              height="64"
              className=""
              src="/images/icon.png"
              priority={true}
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link href="/" className="text-lg/6 font-semibold text-gray-900">
            {t("home")}
          </Link>
          <Link
            href="/our-team"
            className="text-lg/6 font-semibold text-gray-900"
          >
            {t("team")}
          </Link>
          <Link
            href="/problems"
            className="text-lg/6 font-semibold text-gray-900"
          >
            {t("problems")}
          </Link>
          <Link
            href="/gallery"
            className="text-lg/6 font-semibold text-gray-900"
          >
            {t("gallery")}
          </Link>
          <Link
            href="/registration"
            className="text-lg/6 font-semibold text-gray-900"
          >
            {t("registration")}
          </Link>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <LocaleSwitcher />
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                alt="our logo"
                width="64"
                height="64"
                className=""
                src="/images/icon.png"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  {t("home")}
                </Link>
                <Link
                  href="/our-team"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  {t("team")}
                </Link>
                <Link
                  href="/problems"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  {t("problems")}
                </Link>
                <Link
                  href="/gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  {t("gallery")}
                </Link>
                <Link
                  href="/registration"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  {t("registration")}
                </Link>
                <LocaleSwitcher />
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  )
}
