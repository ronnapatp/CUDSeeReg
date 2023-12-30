interface LayoutProps{
    children: React.ReactNode
}

export default function Container({ children }: LayoutProps) {
    return <div className="max-w-xl px-4 mx-auto sm:px-6 xl:max-w-2xl xl:px-0">{children}</div>
}