// app/page.tsx

import { redirect } from 'next/navigation'

export default function Home() {
  // Otomatis arahkan pengguna ke halaman login
  redirect('/login')

  // Kita tidak perlu menampilkan apa-apa di sini
  // karena pengguna akan langsung diarahkan
  return null
}