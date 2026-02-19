export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-canvas min-h-screen">
            {children}
        </div>
    );
}
