# ❤️ Love Animation - Next.js

Aplikasi animasi cinta interaktif yang dibangun dengan Next.js 14, TypeScript, dan Tailwind CSS. Menampilkan efek Matrix rain, animasi partikel, dan bentuk hati dengan kontrol interaktif.

## ✨ Fitur

- 🔒 **Vault Lock** - Password protection dengan tampilan kunci brangkas (password: 191125)
- ▶️ **Play Button** - Tombol play sebelum animasi dimulai
- 🌧️ **Matrix Rain Effect** - Efek hujan matrix dengan karakter cinta
- 🎨 **Particle Animation** - Sistem partikel yang membentuk teks dan hati
- 🎛️ **Control Panel** - Panel kontrol untuk mengubah warna, kecepatan, dan tema
- 🎵 **Music Player** - Autoplay dengan tombol play/pause
- 🛡️ **Anti-DevTools** - Proteksi dari copy, F12, Ctrl+U, dan klik kanan
- 📱 **Responsive Design** - Tampil optimal di berbagai ukuran layar
- 🎯 **Customizable** - Dapat disesuaikan dengan mudah

## 🚀 Cara Menjalankan

### Development Mode

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### Build untuk Production

```bash
npm run build
npm start
```

## 🎨 Customisasi

### Mengubah Password

Edit di file `src/components/VaultLock.tsx`:

```tsx
const correctCode = '191802'; // Ubah dengan password Anda
```

### Mengubah Teks Animasi

Edit sequence di file `src/components/ParticleAnimation.tsx`:

```tsx
const sequence = ['3', '2', '1', 'ANDILIA', 'YOU', 'ARE', 'MY', 'LOVE'];
```

### Menambahkan Musik

1. Tambahkan file musik dengan nama `love-music.mp3` ke folder `public/`
2. Musik akan autoplay saat animasi dimulai
3. Gunakan tombol play/pause di pojok kanan bawah untuk mengontrol musik
4. Jika ingin mengubah nama file, edit di `src/components/MusicPlayer.tsx`:

```tsx
<source src="/your-music-file.mp3" type="audio/mpeg" />
```

**Format yang didukung:** MP3, WAV, OGG

**Catatan:** Beberapa browser memblokir autoplay. Jika musik tidak otomatis play, user perlu klik tombol play.

### Mengubah Warna Default

Edit di `src/app/page.tsx`:

```tsx
const [matrixColor, setMatrixColor] = useState('#ff4d88');
```

## 🎯 Kontrol Panel

- **Tema Warna** - Pilih dari 5 preset warna atau custom sendiri
- **Warna Matrix** - Atur warna efek matrix rain
- **Kecepatan** - Kontrol kecepatan animasi matrix
- **Musik** - Toggle musik on/off
- **Reset** - Reset animasi dari awal

## 📦 Teknologi

- [Next.js 14](https://nextjs.org/) - React Framework
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- Canvas API - Rendering animasi

## 🎨 Struktur Komponen

```
components/
├── MatrixRain.tsx        # Efek matrix rain background
├── ParticleAnimation.tsx # Sistem partikel dan animasi
├── ControlPanel.tsx      # Panel kontrol interaktif
└── MusicPlayer.tsx       # Audio player
```

## 📝 Tips

1. Klik tombol ⚙️ di pojok kanan atas untuk membuka control panel
2. Pilih tema warna untuk mengubah tampilan secara instant
3. Sesuaikan kecepatan matrix sesuai preferensi
4. Reset animasi kapanpun dengan tombol Reset

## 🌟 Fitur Tambahan yang Bisa Dikembangkan

- [ ] Upload musik custom dari UI
- [ ] Save preferences ke localStorage
- [ ] Tambah efek suara untuk transisi
- [ ] Export animasi sebagai video
- [ ] Tambah lebih banyak shape (bintang, bunga, dll)
- [ ] Mode fullscreen
- [ ] Share animasi dengan link custom

## 📄 License

MIT - Bebas digunakan untuk personal maupun komersial

---

**Selamat berkreasi! 🎨✨**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
