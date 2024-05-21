import UnProtectedNav from "../(protected)/_components/UnProtectedNav";

export default function GeneralLayout({children}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex-1 w-full p-4 space-y-3 max-w-6xl mx-auto border-2 border-green-600 flex flex-col space-x-2 items-center">
            <UnProtectedNav />
            {children}
        </div>
    )
}