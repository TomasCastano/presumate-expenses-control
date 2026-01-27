import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useBudget } from '../hooks/useBudget'

import ExpenseForm from './ExpenseForm'

export default function ExpenseModal() {

    const { state, dispatch } = useBudget()

    return (
        <>
            {!state.modal && (    
                <div className="fixed right-7 bottom-7 flex items-center justify-center z-100">
                    <button
                        className='rounded-full aspect-square p-2 bg-gradient-to-r from-sky-600 to-sky-700 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out'
                        type="button"
                        onClick={() => dispatch({type: 'show-modal'})}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 text-white">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            )}

            <Transition appear show={state.modal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => {dispatch({type: 'hide-modal'})}}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/70" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-3xl bg-white p-7 text-left align-middle shadow-xl transition-all">

                                    <ExpenseForm />

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}