// Karakter dari PNG pose. Karakter TIDAK bergerak sendiri: tidak ada napas, goyang, atau gerak bicara.
// Yang ada: muncul dan hilang halus (memudar + naik sedikit), pergantian pose dengan potong langsung,
// bayangan lantai, garis tepi putih opsional, dan pembatas anti-buram.
// Aset: public/karakter/<file> (nama file asli). Data penyejajaran antar pose: src/data/karakter.json.
import React from 'react';
import {Img, staticFile} from 'remotion';
import {useT} from '../sceneTime';
import {clamp01, ramp} from '../anim';
import data from '../data/karakter.json';

export type TokohId = 'pria_office' | 'wanita_office' | 'pria_toko';
export type PoseId =
  | 'menyapa'
  | 'menjelaskan'
  | 'menunjuk'
  | 'berpikir'
  | 'ide'
  | 'setuju'
  | 'menolak'
  | 'bingung'
  | 'memegang_alat'
  | 'terima_kasih';
export type PoseCue = {at: number; pose: PoseId};

type PoseInfo = {file: string; wr: number; hr: number; axf: number; refH: number};
const DATA = data as unknown as Record<string, Record<string, PoseInfo>>;

/** Batas pembesaran: tinggi tampil maksimal 1,2 x tinggi asli PNG supaya tidak buram atau pecah. */
const MAX_UPSCALE = 1.2;
const CROSS = 0; // potong langsung antar pose (tanpa bayangan ganda)
const FADE = 0.3; // detik muncul dan hilang
const RISE = 24; // px naik saat muncul

export type KarakterProps = {
  tokoh: TokohId;
  /** Urutan pose: [{at: detik sejak kata pertama scene, pose}]. Elemen pertama = pose awal. */
  poses: PoseCue[];
  /** Posisi telapak kaki (px, kanvas 1920x1080): x = tengah kaki, y = ujung bawah sepatu. */
  x: number;
  y: number;
  /** Tinggi tampilan karakter (px). Disarankan 640-820. Otomatis dibatasi 1,2 x resolusi asli tokoh (pria_toko jadi maks ±550 px). */
  tinggi: number;
  /** Detik muncul dan keluar (opsional) sejak kata pertama scene. */
  masuk?: number;
  keluar?: number;
  /** Cermin horizontal (mis. agar menunjuk ke kiri). Tulisan kecil di seragam ikut terbalik. */
  flip?: boolean;
  /** Garis tepi putih (untuk latar ramai). */
  garis?: boolean;
  /** Bayangan lantai. */
  bayangan?: boolean;
};

/** Tinggi efektif: tidak melebihi 1,2 x tinggi asli PNG tokoh (anti buram). */
const tinggiEfektif = (tokoh: TokohId, tinggi: number): number => {
  const ref = DATA[tokoh].menyapa.refH;
  return Math.min(tinggi, ref * MAX_UPSCALE);
};

const imgOf = (tokoh: TokohId, pose: PoseId, tinggi: number) => {
  const p = DATA[tokoh][pose];
  const h = tinggi * p.hr;
  const w = h * p.wr;
  return {src: staticFile(`karakter/${p.file}`), w, h, left: -p.axf * w, top: -h};
};

export const Karakter: React.FC<KarakterProps> = ({
  tokoh,
  poses,
  x,
  y,
  tinggi: tinggiReq,
  masuk = 0,
  keluar,
  flip = false,
  garis = false,
  bayangan = true,
}) => {
  const {t} = useT();
  const tinggi = tinggiEfektif(tokoh, tinggiReq);

  // pose aktif dan pose sebelumnya (untuk crossfade)
  let idx = 0;
  poses.forEach((p, i) => {
    if (t >= p.at) idx = i;
  });
  const cur = poses[idx];
  const prev = idx > 0 ? poses[idx - 1] : null;
  const cross = prev ? (CROSS > 0 ? clamp01((t - cur.at) / CROSS) : 1) : 1;

  // muncul dan hilang halus
  const inK = ramp(t, masuk, masuk + FADE);
  const outK = keluar !== undefined ? ramp(t, keluar, keluar + FADE) : 0;
  const vis = inK * (1 - outK);
  if (vis <= 0.001) return null;
  const dy = (1 - inK) * RISE + outK * (RISE * 0.6);

  const A = imgOf(tokoh, cur.pose, tinggi);
  const B = prev ? imgOf(tokoh, prev.pose, tinggi) : null;
  const o = garis ? 4 : 0;
  const outline = garis
    ? `drop-shadow(${o}px 0 0 #fff) drop-shadow(${-o}px 0 0 #fff) drop-shadow(0 ${o}px 0 #fff) drop-shadow(0 ${-o}px 0 #fff)`
    : undefined;

  return (
    <>
      {bayangan && (
        <div
          style={{
            position: 'absolute',
            left: x - tinggi * 0.17,
            top: y - tinggi * 0.02,
            width: tinggi * 0.34,
            height: tinggi * 0.04,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.28)',
            filter: 'blur(6px)',
            opacity: vis,
          }}
        />
      )}
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 0,
          height: 0,
          opacity: vis,
          transformOrigin: '0 0',
          transform: `translateY(${dy}px) scale(${flip ? -1 : 1}, 1)`,
        }}
      >
        <div style={{position: 'absolute', left: 0, top: 0, width: 0, height: 0, filter: outline}}>
          {B && cross < 1 && (
            <Img
              src={B.src}
              style={{position: 'absolute', left: B.left, top: B.top, width: B.w, height: B.h, opacity: 1 - cross}}
            />
          )}
          <Img
            src={A.src}
            style={{position: 'absolute', left: A.left, top: A.top, width: A.w, height: A.h, opacity: prev ? Math.max(cross, 0.001) : 1}}
          />
        </div>
      </div>
    </>
  );
};
