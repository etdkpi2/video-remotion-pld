// Font dimuat dari Google Fonts lewat paket @remotion/google-fonts.
// FONT_SUB (Poppins SemiBold, normal + miring) dipakai subtitle dan TIDAK diganti.
// FONT_JUDUL mengikuti gaya yang dipilih: ganti import dan bobotnya sesuai gaya.
import {loadFont as loadMontserrat} from '@remotion/google-fonts/Montserrat';
import {loadFont as loadPoppins} from '@remotion/google-fonts/Poppins';

const m = loadMontserrat('normal', {weights: ['800', '900'], subsets: ['latin']});
const p = loadPoppins('normal', {weights: ['600'], subsets: ['latin']});
loadPoppins('italic', {weights: ['600'], subsets: ['latin']});

export const FONT_JUDUL = m.fontFamily;
export const FONT_SUB = p.fontFamily;
