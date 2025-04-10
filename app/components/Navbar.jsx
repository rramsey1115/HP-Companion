"use client"

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// can update tabs and paths using navigation collection
const navigation = [
    { name: 'Characters', href: '/characters', current: false },
    { name: 'Magic', href: '/magic', current: false },
    { name: 'Beasts', href: '/beasts', current: false },
    { name: 'Books', href: '/books', current: false },
    { name: 'Houses', href: '/houses', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
    const pathname = usePathname();

    return (
        <Disclosure as="nav" className="bg-gray-800 position:sticky top-0 w-screen">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-2 items-center">
                            <a
                                href='/'
                            >
                                <Image
                                    alt="logo"
                                    src="/images/logo.png"
                                    width={80}
                                    height={80}
                                    className="h-10 w-auto"
                                    priority
                                    fill={false}
                                />
                            </a>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => {
                                    const isCurrent = pathname == item.href;

                                    return (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            aria-current={item.current ? 'page' : undefined}
                                            className={classNames(
                                                isCurrent ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'rounded-md px-3 py-2 text-md',
                                            )}
                                        >
                                            {item.name}
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}

export default Navbar;
