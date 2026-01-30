import Container from "./container"
import Link from "next/link"
export default function footer(){
    return(
        <footer className="border-t mt-10">
        <Container>
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                        <span className="self-center font-semibold whitespace-nowrap">© 2024 CUDSeeReg Team</span>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <Link href="/privacy">Privacy Policy</Link>
                    </ul>
                </div>
            </div>
            </Container>
        </footer>
    )
}