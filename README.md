# Lilin Asa

Static website storytelling tentang difabel yang membuat lilin aromaterapi. Halaman ini menampilkan cerita, progress pembuatan lilin, slot foto dokumentasi, dan kontrol tampilan ramah low vision.

## Fitur

- Cerita utama tentang difabel pembuat lilin aromaterapi.
- Timeline 6 tahap pembuatan lilin.
- Slot foto dokumentasi yang bisa diganti dengan foto asli kegiatan.
- Ilustrasi hero dan proses pembuatan lilin.
- Ukuran teks besar dengan line-height lega.
- Kontrol perbesar/perkecil teks.
- Toggle kontras tinggi.
- Toggle spasi lega.
- Reset tampilan.
- Navigasi sticky dengan target klik besar.
- Skip link untuk pengguna keyboard.
- Focus ring tebal dan jelas.
- Layout responsif untuk desktop, tablet, dan ponsel.
- Tanpa dependency eksternal.

## Struktur File

```text
Project_KKN/
|-- index.html
|-- styles.css
|-- script.js
|-- README.md
`-- assets/
    |-- hero-candle-workshop.svg
    |-- story-aroma-selection.svg
    |-- story-wax-prep.svg
    `-- story-candle-pour.svg
```

## Cara Mengganti Slot Foto

Di `index.html`, cari bagian `gallery-grid`. Ganti elemen `div.photo-frame` dengan gambar asli, misalnya:

```html
<img src="assets/foto-proses-01.jpg" alt="Peserta difabel mengenal bahan pembuatan lilin aromaterapi." />
```

Simpan file foto di folder `assets/`, lalu sesuaikan caption pada `figcaption`.

## Cara Preview

Buka `index.html` langsung di browser.

## Catatan Aksesibilitas

Tes halaman dengan zoom browser 200%, navigasi keyboard, mode kontras tinggi, dan ukuran layar kecil sebelum dipublikasikan.
