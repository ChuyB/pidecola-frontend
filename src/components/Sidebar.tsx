"use client";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { usePathname } from "next/navigation";
import { Fragment, useContext } from "react";
import Link from "next/link";
import useNavBar from "@/hooks/useNavBar";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const pathname = usePathname();

  const render =
    pathname !== "/" && pathname !== "/login" && pathname !== "/register";

  const { currentNavBarOpts, mobileMenuOpen, setMobileMenuOpen } = useNavBar();

  return (
    <>
      {render && (
        <div className="hidden w-28 h-screen overflow-y-hidden bg-main text-BlancoIvory lg:block">
          <div className="flex w-full h-full flex-col items-center py-6">
            <div className="mt-6 w-full h-screen flex flex-col justify-around flex-1 space-y-1 px-2 ">
              {currentNavBarOpts?.map((item: any) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    pathname.startsWith(item.href)
                      ? "bg-secondary text-black"
                      : "text-white hover:bg-Gris hover:bg-opacity-20",
                    // item.href === pathname ? 'bg-Gris bg-opacity-20 text-BlancoIvory' : 'text-BlancoIvory hover:bg-Gris hover:bg-opacity-20 ',
                    "group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium"
                  )}
                  aria-current={item.current && "page"}
                >
                  <button
                    onClick={() => {
                      if (item.href !== pathname) {
                        // pendingDispatch(setScreenPending(true));
                      }
                    }}
                    className="flex flex-col justify-center items-center"
                  >
                    <item.icon
                      className={classNames(
                        pathname.startsWith(item.href)
                          ? "text-black"
                          : "text-white group-hover:text-white",
                        "h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    <span className="mt-2">{item.name}</span>
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {render && (
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setMobileMenuOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-negro md:w-60 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-50 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-md flex-1 flex-col bg-negro text-BlancoIvory pb-4 pt-5">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute right-0 top-1 -mr-14 p-1">
                      <button
                        type="button"
                        className="cursor:pointer flex h-12 w-12 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-black"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <XMarkIcon
                          className="h-6 w-6 text-black"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Close sidebar</span>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto px-2">
                    <nav className="flex h-full flex-col">
                      <div className="space-y-1 flex h-full flex-col justify-evenly">
                        {currentNavBarOpts?.map((item: any) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              //   setScreenPending(true);
                            }}
                            className={classNames(
                              item.href === pathname
                                ? "bg-Gris bg-opacity-20 text-BlancoIvory"
                                : "text-BlancoIvory hover:bg-Gris hover:bg-opacity-20 ",
                              "group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-white"
                                  : "text-white group-hover:text-white",
                                "h-6 w-6 md:h-16 md:w-16"
                              )}
                              aria-hidden="true"
                            />
                            <span className="mt-2 md:text-xl">{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
}
