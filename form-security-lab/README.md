# FormBreak

Lab HTML/CSS/JavaScript lokal untuk mempelajari kelemahan validasi dan otorisasi di sisi klien.

## Menjalankan

Buka `index.html` langsung di browser, atau dari folder proyek jalankan:

```bash
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000/form-security-lab/`.

## Tujuan latihan

Dapatkan respons `ADMIN_GRANTED` tanpa mengubah berkas sumber. Gunakan DevTools browser untuk memeriksa field tersembunyi pada form.

## Pelajaran

Field tersembunyi, validasi HTML, dan JavaScript browser dapat diubah oleh pengguna. Sistem nyata wajib memeriksa autentikasi dan otorisasi di server.

> Gunakan hanya di lingkungan milik sendiri atau yang secara eksplisit mengizinkan pengujian.
