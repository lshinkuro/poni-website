import {
  BatteryCharging, BatteryFull, LayoutGrid, CalendarDays, Bot, Clipboard, Code2, Cpu, FolderUp, GitBranch, Gauge, Moon, Music,
  NotebookPen, Sailboat, ShieldCheck, Sparkles, Thermometer, Timer, Trash2, Wrench, Zap,
} from 'lucide-react'

export const REPO = 'https://github.com/lshinkuro/poni'
export const VERSION = '0.6.6' // fallback until GitHub Releases loads
// Fixed asset name, so this always points at the newest release.
// Fallback until GitHub Releases loads; the live link comes from useLatest().
export const DMG = `${REPO}/releases/latest`

export const INSTALL = [
  'brew tap lshinkuro/poni https://github.com/lshinkuro/poni',
  'brew trust lshinkuro/poni',
  'brew install poni',
  'brew services start poni',
]

export const battery = [
  { icon: BatteryCharging, title: 'Charge limit', desc: 'Berhenti mengisi di batas (mis. 80%), Mac tetap jalan pakai daya charger. Di macOS 27 memakai Charge Limit bawaan macOS.' },
  { icon: BatteryFull, title: 'Top up', desc: 'Butuh baterai penuh untuk perjalanan? Isi sementara ke 100%, lalu kembali ke batas.' },
  { icon: Zap, title: 'Auto discharge', desc: 'Pakai baterai walau charger tercolok sampai turun ke batas.' },
  { icon: Gauge, title: 'Kalibrasi', desc: '100% → 10% → 100% otomatis, supaya persentase baterai kembali akurat.' },
  { icon: Moon, title: 'Stop saat sleep', desc: 'Pengisian dibekukan sebelum Mac sleep, jadi batas tidak terlewati semalaman.' },
  { icon: Sailboat, title: 'Sailing', desc: 'Isi ulang hanya setelah turun beberapa persen di bawah batas. (macOS 26 ke bawah)' },
  { icon: Thermometer, title: 'Heat protection', desc: 'Berhenti mengisi saat baterai terlalu panas. (macOS 26 ke bawah; di macOS 27 diatur macOS)' },
  { icon: ShieldCheck, title: 'Info kesehatan', desc: 'Kesehatan baterai, jumlah siklus, suhu, daya charger, dan grafik 24 jam.' },
]

export const notch = [
  { icon: Music, title: 'Musik', desc: 'Spotify / Apple Music dengan album art, kontrol, dan lirik berjalan.' },
  { icon: Timer, title: 'Fokus', desc: 'Pomodoro 25/50/90 menit atau atur sendiri, niat sesi, blokir aplikasi pengganggu, jurnal setelah sesi, otomatis jeda saat rapat. ⌃⌥S dari mana saja.' },
  { icon: CalendarDays, title: 'Rapat', desc: 'Kalender bulanan: tambah dan edit rapat, atur pengingat per acara. Tersimpan ke Kalender macOS, notifikasi tetap muncul walau aplikasi ditutup. ⌃⌥R.' },
  { icon: Bot, title: 'AI', desc: 'Chat dengan CLI AI yang terpasang (Claude Code, Kiro), plus halaman Pemakaian: berapa token AI yang kamu pakai hari ini dan 7 hari terakhir.' },
  { icon: NotebookPen, title: 'Catatan', desc: 'Quick notes multi-halaman yang tersinkron ke Apple Notes, jadi muncul juga di iPhone. Bisa dirapikan dengan AI.' },
  { icon: Code2, title: 'Dev Utils', desc: 'JSON, JWT, Base64, URL, timestamp, SHA-256/MD5, UUID. Semua offline.' },
  { icon: Clipboard, title: 'Clipboard', desc: 'Riwayat copy, pin, OCR teks dari gambar. Isi password manager diabaikan.' },
  { icon: FolderUp, title: 'Shelf', desc: 'Seret file ke notch, seret keluar, atau kirim lewat AirDrop.' },
  { icon: GitBranch, title: 'Git', desc: 'Status repo, pull/push, commit dengan pesan AI, review PR GitHub & Bitbucket.' },
  { icon: Cpu, title: 'Stats', desc: 'Baterai, CPU, memori, dan disk sekilas pandang.' },
  { icon: LayoutGrid, title: 'Lainnya', desc: 'Notif saat baterai penuh, Mic Mute untuk semua aplikasi (⌃⌥M), kamera cermin, color picker, tetap menyala dengan durasi, notif download, eject USB, dan Belajar Bahasa (Inggris, Spanyol & Jepang, soal TOEFL/JLPT, ngobrol pakai suara dengan Apple Intelligence atau Claude).' },
]

export const menubar = [
  { icon: BatteryCharging, title: 'Baterai', desc: 'Semua kontrol pengisian dan grafik riwayat.' },
  { icon: Cpu, title: 'Sistem', desc: 'Memori, CPU, disk, dan proses terberat yang bisa ditutup.' },
  { icon: Trash2, title: 'Cleaner', desc: 'Bersihkan cache, log, DerivedData, simulator, file besar, dan sisa aplikasi.' },
  { icon: Wrench, title: 'Tools', desc: 'Cegah sleep, file tersembunyi, ikon desktop, dark mode, screenshot area.' },
]

export const faq = [
  { q: 'Dulu namanya Baterai Safer?', a: 'Iya! Fiturnya makin banyak, jadi namanya ganti jadi Poni (karena notch itu poni-nya layar Mac). Pengguna lama tetap dapat update otomatis, dan semua pengaturan, catatan, dan progres tetap aman.' },
  { q: 'Gratis?', a: 'Ya. Poni open source dengan lisensi MIT, tanpa iklan dan tanpa langganan.' },
  { q: 'Mac apa yang didukung?', a: 'Mac Apple Silicon (M1 ke atas). Mac Intel tidak didukung.' },
  { q: 'Kenapa macOS memblokir aplikasi dari DMG?', a: 'Aplikasi belum ditandatangani Developer ID Apple. Buka System Settings → Privacy & Security → Open Anyway sekali saja. Lewat Homebrew, aplikasi di-build langsung di Mac kamu jadi tidak diblokir, dan update cukup dengan brew upgrade.' },
  { q: 'Apa itu "helper"?', a: 'Daemon kecil yang jalan sebagai root untuk mengatur pengisian lewat SMC, supaya batas tetap berlaku walau aplikasi ditutup. Dipasang sekali lewat tombol Install helper… di menu bar.' },
  { q: 'Bagaimana cara uninstall dengan benar?', a: 'Jalankan sudo poni uninstall-daemon dulu, lalu brew uninstall poni. Di macOS 27, kembalikan Charge Limit ke 100% di System Settings → Battery. Sejak v0.6.2 helper juga membersihkan dirinya sendiri kalau aplikasinya terhapus.' },
  { q: 'Aman untuk baterai?', a: 'Membatasi pengisian di 80% adalah cara yang sama yang dipakai fitur bawaan Apple. Aplikasi memakai API privat Apple yang bisa berubah di update macOS, jadi gunakan dengan risiko sendiri.' },
]

export const highlights = [
  { icon: Sparkles, label: 'Native Swift, bukan Electron' },
  { icon: ShieldCheck, label: 'Open source · MIT' },
  { icon: Cpu, label: 'Khusus Apple Silicon' },
]
