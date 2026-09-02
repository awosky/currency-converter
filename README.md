# HitungKurs

HitungKurs adalah aplikasi web sederhana untuk menghitung nilai tukar mata uang dengan cepat.

## Fitur

- Mengonversi nominal dari berbagai mata uang.
- Mengganti mata uang utama sebagai dasar konversi.
- Menyimpan mata uang favorit di browser.
- Mengurutkan daftar mata uang berdasarkan bendera.
- Memformat angka dengan pemisah ribuan, seperti `1,000,000`.
- Menyimpan kurs sementara di browser selama 24 jam.

## Teknologi

- React 19
- TypeScript
- Vite
- Tailwind CSS
- [Frankfurter API](https://www.frankfurter.app/) untuk mengambil kurs terbaru.

## Menjalankan Project

Pastikan Node.js sudah terpasang, lalu jalankan:

```bash
npm install
npm run dev
```

Buka alamat lokal yang ditampilkan Vite di terminal.

## Perintah Lain

```bash
npm run build  # Membuat build production
npm run lint   # Mengecek kode dengan ESLint
npm run preview # Menjalankan preview build production
```

Kurs yang ditampilkan hanya sebagai referensi. Data kurs berasal dari Frankfurter API dan dapat berubah sewaktu-waktu.

## Pembuat

Dibuat oleh [Awosky](https://faisalhakim.com/).
