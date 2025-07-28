export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <title>My Tasks App</title>
      <body>{children}</body>
    </html>
  )
}