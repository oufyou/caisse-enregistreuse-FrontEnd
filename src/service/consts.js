export const API_URL = 'http://93.188.163.195:8080/app/api';
export const PRINTING_SERVER = '192.168.1.13';
export const anonymUserId = 2;
// Feed control sequences
export const CTL_LF = '\x0a'; // Print and line feed
export const CTL_FF = '\x0c'; // Form feed
export const CTL_CR = '\x0d'; // Carriage return
export const CTL_HT = '\x09'; // Horizontal tab
export const CTL_SET_HT = '\x1b\x44'; // Set horizontal tab positions
export const CTL_VT = '\x1b\x64\x04'; // Vertical tab

// Printer hardware
export const HW_INIT = '\x1b\x40'; // Clear data in buffer and reset modes
export const CLEAR_BUFFER = '\x1b\x1dBC'; // Clear data in buffer and reset modes
export const HW_SELECT = '\x1b\x3d\x01'; // Printer select
export const HW_RESET = '\x1b\x3f\x0a\x00'; // Reset printer hardware

// Cash Drawer
export const CD_KICK_2 = '\x1b\x70\x00'; // Sends a pulse to pin 2 []
export const CD_KICK_5 = '\x1b\x70\x01'; // Sends a pulse to pin 5 []

// Beep sound alarm
export const BEEP = '\x07'; // Sends a pulse to pin 2 []

// Paper
export const PAPER_FULL_CUT = '\x1d\x56\x00'; // Full cut paper
export const PAPER_PART_CUT = '\x1d\x56\x01'; // Partial cut paper

// Text format
export const TXT_NORMAL = '\x1b\x21\x00'; // Normal text
export const TXT_2HEIGHT = '\x1b\x21\x10'; // Double height text
export const TXT_2WIDTH = '\x1b\x21\x20'; // Double width text
export const TXT_4SQUARE = '\x1b\x21\x30'; // Quad area text
export const TXT_UNDERL_OFF = '\x1b\x2d\x00'; // Underline font OFF
export const TXT_UNDERL_ON = '\x1b\x2d\x01'; // Underline font 1-dot ON
export const TXT_UNDERL2_ON = '\x1b\x2d\x02'; // Underline font 2-dot ON
export const TXT_BOLD_OFF = '\x1b\x45\x00'; // Bold font OFF
export const TXT_BOLD_ON = '\x1b\x45\x01'; // Bold font ON
export const TXT_FONT_A = '\x1b\x4d\x00'; // Font type A
export const TXT_FONT_B = '\x1b\x4d\x01'; // Font type B
export const TXT_ALIGN_LT = '\x1b\x61\x00'; // Left justification
export const TXT_ALIGN_CT = '\x1b\x61\x01'; // Centering
export const TXT_ALIGN_RT = '\x1b\x61\x02'; // Right justification

// Char code table
export const CHARCODE_PC437 = '\x1b\x74\x00'; // USA: Standard Europe
export const CHARCODE_JIS = '\x1b\x74\x01'; // Japanese Katakana
export const CHARCODE_PC850 = '\x1b\x74\x02'; // Multilingual
export const CHARCODE_PC860 = '\x1b\x74\x03'; // Portuguese
export const CHARCODE_PC863 = '\x1b\x74\x04'; // Canadian-French
export const CHARCODE_PC865 = '\x1b\x74\x05'; // Nordic
export const CHARCODE_WEU = '\x1b\x74\x06'; // Simplified Kanji, Hirakana
export const CHARCODE_GREEK = '\x1b\x74\x07'; // Simplified Kanji
export const CHARCODE_HEBREW = '\x1b\x74\x08'; // Simplified Kanji
export const CHARCODE_PC1252 = '\x1b\x74\x11'; // Western European Windows Code Set
export const CHARCODE_PC866 = '\x1b\x74\x12'; // Cirillic //2
export const CHARCODE_PC852 = '\x1b\x74\x13'; // Latin 2
export const CHARCODE_PC858 = '\x1b\x74\x14'; // Euro
export const CHARCODE_THAI42 = '\x1b\x74\x15'; // Thai character code 42
export const CHARCODE_THAI11 = '\x1b\x74\x16'; // Thai character code 11
export const CHARCODE_THAI13 = '\x1b\x74\x17'; // Thai character code 13
export const CHARCODE_THAI14 = '\x1b\x74\x18'; // Thai character code 14
export const CHARCODE_THAI16 = '\x1b\x74\x19'; // Thai character code 16
export const CHARCODE_THAI17 = '\x1b\x74\x1a'; // Thai character code 17
export const CHARCODE_THAI18 = '\x1b\x74\x1b'; // Thai character code 18

// export const BARCODE format
export const BARCODE_TXT_OFF = '\x1d\x48\x00'; // HRI  BARCODE chars OFF
export const BARCODE_TXT_ABV = '\x1d\x48\x01'; // HRI BARCODE chars above
export const BARCODE_TXT_BLW = '\x1d\x48\x02'; // HRI BARCODE chars below
export const BARCODE_TXT_BTH = '\x1d\x48\x03'; // HRI BARCODE chars both above and below
export const BARCODE_FONT_A = '\x1d\x66\x00'; // Font type A for HRI BARCODE chars
export const BARCODE_FONT_B = '\x1d\x66\x01'; // Font type B for HRI BARCODE chars
export const BARCODE_HEIGHT = '\x1d\x68\x64'; // BARCODE Height [1-255]
export const BARCODE_WIDTH = '\x1d\x77\x03'; // BARCODE Width  [2-6]
export const BARCODE_UPC_A = '\x1d\x6b\x00'; // BARCODE type UPC-A
export const BARCODE_UPC_E = '\x1d\x6b\x01'; // BARCODE type UPC-E
export const BARCODE_EAN13 = '\x1d\x6b\x02'; // BARCODE type EAN13
export const BARCODE_EAN8 = '\x1d\x6b\x03'; //  BARCODE type EAN8
export const BARCODE_CODE39 = '\x1d\x6b\x04'; //  BARCODE type CODE39
export const BARCODE_ITF = '\x1d\x6b\x05'; //  BARCODE type ITF
export const BARCODE_NW7 = '\x1d\x6b\x06'; //  BARCODE type NW7

// Image format
export const S_RASTER_N = '\x1d\x76\x30\x00'; // Set raster image normal size
export const S_RASTER_2W = '\x1d\x76\x30\x01'; // Set raster image double width
export const S_RASTER_2H = '\x1d\x76\x30\x02'; // Set raster image double height
export const S_RASTER_Q = '\x1d\x76\x30\x03'; // Set raster image quadruple

// Printing Density
export const PD_N50 = '\x1d\x7c\x00'; // Printing Density -50%
export const PD_N37 = '\x1d\x7c\x01'; // Printing Density -37.5%
export const PD_N25 = '\x1d\x7c\x02'; // Printing Density -25%
export const PD_N12 = '\x1d\x7c\x03'; // Printing Density -12.5%
export const PD_0 = '\x1d\x7c\x04'; // Printing Density  0%
export const PD_P50 = '\x1d\x7c\x08'; // Printing Density +50%
export const PD_P37 = '\x1d\x7c\x07'; // Printing Density +37.5%
export const PD_P25 = '\x1d\x7c\x06'; // Printing Density +25%
export const PD_P12 = '\x1d\x7c\x05'; // Printing Density +12.5%
