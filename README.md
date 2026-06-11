# Task Management App (To-Do List)

Aplikasi To-Do List sederhana yang dibangun menggunakan React (Vite) dan TypeScript. Proyek ini dikembangkan untuk memenuhi kualifikasi Technical Test posisi Front End Developer.

## Fitur (Features)
- [x] Menampilkan daftar task
- [x] Menambahkan task baru
- [x] Mengubah status task (Done / Undone)
- [x] Menghapus task
- [x] Filter task (All / Pending / Completed)
- [x] Form validation (mencegah form submission kosong)
- [x] Responsiveness (Mobile First & Tablet/Desktop optimal)
- [x] Search (Pencarian nama task)
- [x] Summary Dashboard (Statistik task)
- [x] LocalStorage Sync (Menyimpan task persisten tanpa database asli)

## Tech Stack Target
* **Framework:** React 18 + Vite
* **Language:** TypeScript
* **Styling:** Tailwind CSS + shadcn/ui
* **Data Fetching / State Management:** TanStack React Query
* **Animation:** Motion (Framer Motion)
* **Icons:** Lucide React
* **Charts:** Recharts

## Cara Menjalankan Project
Karena project ini dibangun dengan ekosistem Node.js + Vite, pastikan Anda telah menginstal [Node.js](https://nodejs.org/) di perangkat Anda.

1. Clone repository ini ke perangkat lokal Anda.
2. Buka terminal pada folder proyek.
3. Jalankan `npm install` untuk mengunduh semua dependencies.
4. Jalankan `npm run dev` untuk memulai development server.
5. Buka web browser dan akses URL / localhost port yang muncul pada terminal (biasanya `http://localhost:3000` atau `http://localhost:5173`).

## Daftar Endpoint (API URLs)
Aplikasi ini menggunakan mock API dari [JSONPlaceholder](https://jsonplaceholder.typicode.com/) untuk mengambil seed data. Mengingat JSONPlaceholder tidak benar-benar menyimpan operasi modifikasi state, status state tersebut dijembatani dengan `localStorage` browser agar simulasi Create, Update, dan Delete dapat berjalan seolah-olah data berubah secara remote.

* **GET** `https://jsonplaceholder.typicode.com/todos?_limit=6` (Mengambil 6 task awalan)
* **POST** `https://jsonplaceholder.typicode.com/todos` (Hit simulasi API tambah data)
* **PATCH** `https://jsonplaceholder.typicode.com/todos/:id` (Hit simulasi update task selesai/batal)
* **DELETE** `https://jsonplaceholder.typicode.com/todos/:id` (Hit simulasi API hapus data)

## Penjelasan Arsitektur Singkat
Aplikasi ini dirancang menggunakan arsitektur berbasis komponen yang modular:
1. **`/src/components`**: Menyimpan file UI Component mandiri seperti `TodoList.tsx` dan `SummaryDashboard.tsx`. Tersedia pula folder `ui` untuk menyimpan base component design system (shadcn/ui).
2. **`/src/hooks`**: Berisi Custom Hooks, utamanya `useTodos.ts`. Hook ini bertindak sebagai jembatan *Business Logic* yang merangkum *Data Fetching* (Tanstack React Query) di dalamnya. Pendekatan ini memastikan decoupling antara UI Components UI dan proses API Requests.
3. **`/src/types.ts`**: Repositori deklarasi tipe statis (Interface Type) TypeScript agar integritas data konsisten (*Type-safe*) dari API sampai Component Rendering.
4. **State Management System**: Aplikasi mengimplementasikan dua lapis state. 
   - *Client State (Local)*: `useState` & `useMemo` bawaan React untuk state ringan dan kalkulasi yang tidak perlu dikirim ke server seperti Filter active/completed, Search Input, dan animasi UI.
   - *Server State*: Dihandle eksklusif oleh *React Query* untuk operasi asinkronous. React query secara proaktif memantau status `isPending`, `isError`, mendelegasi *caching*, dan menjaga sinkronisasi UI-dengan optimistik ketika melakukan mutasi API.
