"use client"

import {
  Button,
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'

const navigation = [
  { name: 'Characters', href: '/characters' },
  { name: 'Magic', href: '/magic' },
  { name: 'Beasts', href: '/beasts' },
  { name: 'Books', href: '/books' },
  { name: 'Houses', href: '/houses' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <Disclosure as="nav" className="bg-gray-800 sticky top-0 z-50 w-full">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Left: Logo and mobile toggle */}
              <div className="flex items-center">
                <a href="/">
                  <Image
                    src="/images/logo.png"
                    alt="logo"
                    width={40}
                    height={40}
                    className="h-10 w-auto"
                    priority
                  />
                </a>

                {/* Desktop navigation */}
                <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                  {navigation.map((item) => {
                    const isCurrent = pathname === item.href
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          isCurrent
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                      >
                        {item.name}
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Right: Auth */}
              <div className="hidden sm:flex items-center space-x-4">
                {session ? (
                  <>
                    <span className="text-gray-300 text-sm">
                      {session?.user?.name}
                    </span>
                    <Button
                      onClick={() => signOut()}
                      className="rounded-md bg-gray-700 px-3 py-2 text-sm text-white hover:bg-gray-600"
                    >
                      Sign out
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => signIn()}
                    className="rounded-md bg-gray-700 px-3 py-2 text-sm text-white hover:bg-gray-600"
                  >
                    Sign in
                  </Button>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="flex sm:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <DisclosurePanel className="sm:hidden px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const isCurrent = pathname === item.href
              return (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    isCurrent
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                >
                  {item.name}
                </DisclosureButton>
              )
            })}

            <div className="mt-3 border-t border-gray-700 pt-3">
              {session ? (
                <>
                  <div className="px-3 text-gray-300 text-sm mb-1">
                    {session?.user?.name}
                  </div>
                  <Button
                    onClick={() => signOut()}
                    className="w-full rounded-md bg-gray-700 px-3 py-2 text-sm text-white hover:bg-gray-600"
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => signIn()}
                  className="w-full rounded-md bg-gray-700 px-3 py-2 text-sm text-white hover:bg-gray-600"
                >
                  Sign in
                </Button>
              )}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar
